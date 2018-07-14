import React from "react";
import ReactDOM from 'react-dom';
import localforage from 'localforage';
import { Provider } from 'react-redux'

import App from '@component/App';
import * as Actions from '../../actions';
import '@component/Messager';
import Action from '@common/script/action';
import '../../db/createStore';
import ConfigDialog from '@component/ConfigDialog';
import Canvas from '@component/Canvas';
import DBInit from '@db/dataInitial';
import CanvasWarp from "@component/CanvasWrap";
import store from '@store';

window.Messager = window._eldInstanceMessager;
const Messager = window.Messager;
const DP = window._eldInstanceDataPersistence;


const pageId = Number.parseInt(BASE_DATA.pageId);

DP.addAction({
    removeModule: async (moduleId) => {
        return await Action.removeModule(moduleId);
    },
    addModule: async (moduleId) => {
        return await Action.addModule(moduleId);
    },
    refreshModules: async () => {
        return await Action.getModuleList();
    }
})





window.addEventListener('load', () => {

    ReactDOM.render(
        (<Provider store={store} >
            <Canvas />
        </Provider>),
        document.querySelector('.J_canvas').contentDocument.querySelector('#Container'));


    ReactDOM.render(
        (
            <Provider store={store}>
                <ConfigDialog store={store} />
            </Provider >
        ),
        document.querySelector('.J_configDialog')
    )





    document.addEventListener('DOMContentLoaded', () => {
        store.dispatch(Actions.fetchModuleList(pageId));
    })





    document.querySelector('.J_removeModule').addEventListener('click', (e) => {
        let moduleId = document.querySelector('.J_removeModuleInput').value;
        moduleId = Number.parseInt(moduleId.trim());
        store.dispatch(Actions.removeModuleRequest({
            moduleId,
            pageId,
        }))
    })


    document.querySelector('.J_addModule').addEventListener('click', (e) => {
        let moduleTypeId = document.querySelector('.J_addModuleInput').value;
        moduleTypeId = Number.parseInt(moduleTypeId.trim());

        store.dispatch(Actions.addModuleRequest({
            moduleTypeId,
            pageId,
        }));
    })

    document.querySelector('.J_dbInitial').addEventListener('click', (e) => {
        DBInit();
    })


    document.querySelector('.J_refresh').onclick = () => {
        // Messager.trigger('refreshModules')
        store.dispatch(Actions.fetchModuleList(window.BASE_DATA.pageId));
    }



})