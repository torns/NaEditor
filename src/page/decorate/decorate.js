import React from "react";
import ReactDOM from 'react-dom';
import localforage from 'localforage';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'react-thunk';

import reducer from '../../reducers';
import * as Actions from '../../actions';
import '@component/Messager';
import Action from '@common/script/action';
import '../../db/createStore';
import ConfigDialog from '@component/ConfigDialog';
import Canvas from '@component/Canvas';
import DBInit from '@db/dataInitial';
import CanvasWarp from "@component/CanvasWrap";

window.Messager = window._eldInstanceMessager;
const Messager = window.Messager;
const DP = window._eldInstanceDataPersistence;
const sWin = document.querySelector('.J_canvas').contentWindow;
const sDom = sWin.document;

const store = createStore(reducer);

DP.addAction({
    removeModule: async (moduleId) => {
        return await Action.removeModule(moduleId);
    },
    addModule: async (moduleId) => {
        return await Action.addModule(moduleId);
    },
    refreshModules: async () => {
        return await Action.getModulesList();
    }
})




Messager.on('refreshModules', (req, res) => {
    console.log(res);

})


const App = () => {

}

ReactDOM.render(< ConfigDialog />, document.querySelector('.J_configDialog'));


document.querySelector('.J_removeModule').addEventListener('click', (e) => {
    let moduleId = document.querySelector('.J_removeModuleInput').value;
    moduleId = Number.parseInt(moduleId.trim());
    Messager.trigger('removeModule', moduleId);
})


document.querySelector('.J_addModule').addEventListener('click', (e) => {
    let moduleTypeId = document.querySelector('.J_addModuleInput').value;
    moduleTypeId = Number.parseInt(moduleTypeId.trim());
    Messager.trigger('addModule', {
        moduleTypeId,
        pageId: Number.parseInt(BASE_DATA.pageId),
    });
})

document.querySelector('.J_dbInitial').addEventListener('click', (e) => {
    DBInit();
})


document.querySelector('.J_refresh').onclick = () => {
    Messager.trigger('refreshModules')
    store.dispatch(Actions.addModule)
}



window.addEventListener('load', () => {
    const el = (
        <Provider store={store}>
            < Canvas store={store} />
        </Provider>
    )
    ReactDOM.render(
        el,
        sDom.querySelector('#Container')
    )
    ReactDOM.render(<CanvasWarp />,
        document.querySelector('.J_canvasWrap'),
    )

    class Counter extends React.Component {
        render() {
            return (
                <div>
                    <span>{this.props.value}</span>
                    <button onClick={this.props.onIncrement}>+</button>
                    <button onClick={this.props.onDecrement}>-</button>
                </div>
            )
        }
    }

    const render = () => ReactDOM.render(
        <Counter
            value={store.getState()}
            onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
            onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
        />,
        document.querySelector('#count')
    )

    render();
    store.subscribe(render);
    window.store = store;
})

