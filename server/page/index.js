import React from 'react';
import { renderToString } from 'react-dom/server';

import { Provider } from 'react-redux';
import store from '../../src/store';
import ContextProvider from '../../src/component/ContextProvider';
import Canvas from '../../src/component/Canvas'





function renderPage() {

    const BASE_DATA = {
        username: 'zhusiyi111',
        pageType: 2,
        pageId: "91",
        pageInfo: {
            pageName: '31231',
            id: 91,
            moduleList: [1003, 1020, 1004],
        }
    }



    const View = (
        <Provider store={store} >
            <ContextProvider BASE_DATA={BASE_DATA}>
                <Canvas />
            </ContextProvider>
        </Provider>
    )
    const state = JSON.stringify(store.getState())
    const str = renderToString(View);
    return {
        str: str,
        state: state,
    }
}


export default renderPage;