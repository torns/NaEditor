import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from '../../store';
import Canvas from '../../component/Canvas';
import Action from '../../common/script/action';
import ContextProvider from '../../component/ContextProvider';
import { IBASE_DATA } from '../../component/interface';

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

