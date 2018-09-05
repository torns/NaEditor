import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from '../../store';
import Canvas from '../../component/Canvas';
import Action from '../../common/script/action';
import ContextProvider from '../../component/ContextProvider';
import { IBASE_DATA } from '../../component/interface';
import isServer from '../../common/script/isServer';


if (isServer()) {
    Action.getInitData(2).then((BASE_DATA: IBASE_DATA) => {
        ReactDOM.render(
            <Provider store={store} >
                <ContextProvider BASE_DATA={BASE_DATA}>
                    <Canvas />
                </ContextProvider>
            </Provider>,
            document.querySelector('#Container')
        );
    })
} else {
    let BASE_DATA = (window as any).BASE_DATA;
    // 服务端报错，无BASE_DATA,兜底处理
    if (BASE_DATA === undefined) {
        Action.getInitData(2).then((BASE_DATA: IBASE_DATA) => {
            init(BASE_DATA);
        })
    } else {
        init(BASE_DATA);
    }

    function init(BASE_DATA: IBASE_DATA) {
        ReactDOM.hydrate(
            <Provider store={store} >
                <ContextProvider BASE_DATA={BASE_DATA}>
                    <Canvas />
                </ContextProvider>
            </Provider>,
            document.querySelector('#Container')
        );
    }

}



