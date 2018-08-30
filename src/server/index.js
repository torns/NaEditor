// require('antd/dist/antd.css');
// import './view.scss';

// 模块样式
// import '../../common/script/moduleStyle';
import Koa from 'koa';
import React from 'react';
import View from '../page/view/view.tsx';
import { renderToString } from 'react-dom/server';

const app = new Koa();


app.use(async (ctx, next) => {
    const html = renderToString(<View />);

    ctx.body = html;
})

app.listen(3001);

// console.log(html);