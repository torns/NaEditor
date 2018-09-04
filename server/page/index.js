import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from '../../src/reducers';
import ContextProvider from '../../src/component/ContextProvider';
import Canvas from '../../src/component/Canvas'
import Action from '../../src/common/script/action';




async function renderPage(BASE_DATA) {
    let { pageId } = BASE_DATA;
    pageId = Number.parseInt(pageId);
    const moduleList = await Action.getAllModule(pageId);

    const initialState = { module: { moduleList } };
    const store = createStore(reducer, initialState);

    const View = (
        <Provider store={store} >
            <ContextProvider BASE_DATA={BASE_DATA}>
                <Canvas />
            </ContextProvider>
        </Provider>
    )
    const str = renderToString(View);
    const state = JSON.stringify(store.getState())
    const result = {
        str: str,
        state: state,
    }
    return result;
}


export default renderPage;