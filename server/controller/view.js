import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import fs from 'fs';
import Redis from 'ioredis';

import reducer from '../../src/reducers';
import ContextProvider from '../../src/component/ContextProvider';
import Canvas from '../../src/component/Canvas'
import Action from '../../src/common/script/action';
import renderPage from '../service/renderPage';

const redis = new Redis({
    port: 6379,          // Redis port
    host: '127.0.0.1',   // Redis host
    db: 1
})

export default async (ctx, next) => {
    let SsrSrcipt, str;
    let { pageId } = ctx.request.query;
    pageId = Number.parseInt(pageId);

    const pageCache = await getPage(pageId);
    let result;
    if (pageCache) {
        result = pageCache;
        console.log(`页面id：${pageId}:命中redis缓存`);
    } else {
        console.log(`页面id：${pageId}:未命中redis缓存，开始渲染`);
        try {
            const BASE_DATA = await Action.getInitData(2, pageId);
            const moduleList = await Action.getAllModule(pageId);
            const initialState = { module: { moduleList } };
            const store = createStore(reducer, initialState);

            const View = (
                <Provider store={store} >
                    <ContextProvider BASE_DATA={BASE_DATA}>
                        <Canvas />
                    </ContextProvider>
                </Provider>
            );

            const page = await renderPage(View, store);
            str = page.str;
            const { state } = page;

            SsrSrcipt = `
                <script>window.BASE_DATA=${JSON.stringify(BASE_DATA)}</script>
                <script>window.__INITIAL_STATE__=${state}</script>
            `;
        } catch (e) {
            console.error(e);
            // 服务端报错，丢到客户端兜底处理
            SsrSrcipt = '';
            str = '';
        }
        // 读取模板
        let tpl = await new Promise((resolve, reject) => {
            fs.readFile('./dist/page/view.html', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.toString());
                }
            })
        });
        result = tpl.replace('__SSR__STATE__', SsrSrcipt).replace('__SSR__ROOT__', str);
        // 更新redis
        updatePage(pageId, result);
    }
    ctx.body = result;
    await next();

}

function getPage(pageId) {
    return new Promise((resolve, reject) => {
        redis.get(`page${pageId}`, function (err, result) {
            resolve(result);
        });
    })
}

function updatePage(pageId, result) {
    redis.set(`page${pageId}`, result);
}