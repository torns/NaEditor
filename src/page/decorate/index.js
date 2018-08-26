import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
require('antd/dist/antd.css');

import Decorate from './Decorate';
import store from '../../store';
import ContextProvider from '../../component/ContextProvider';
import Action from '../../common/script/action';
import './index.scss';

Action.getInitData(0).then((BASE_DATA) => {
    ReactDom.render(
        <Provider store={store} >
            <ContextProvider BASE_DATA={BASE_DATA}>
                <Decorate />
            </ContextProvider>
        </Provider>,
        document.querySelector('#app')
    );
})

