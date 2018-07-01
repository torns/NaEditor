import React from "react";
import ReactDOM from 'react-dom';
import localforage from 'localforage';

import '@component/Messager';
import Action from '@common/script/action';
import ConfigDialog from '@component/ConfigDialog';

window.Messager = window._eldInstanceMessager;
const Messager = window.Messager;
const DP = window._eldInstanceDataPersistence;

// 初始化模块名称表
localforage.setItem('moduleName', {
    1: '自定义代码',
    2: '图片热区',
})


DP.addAction({
    removeModule: async(moduleId) => {
        return await Action.removeModule(moduleId);
    },
    addModule: async(moduleId) => {
        return await Action.addModule(moduleId);
    },
    refreshModules: async() => {
        return await Action.getModulesList();
    }
})


Messager.on('refreshModules', (req, res) => {
    console.log(res);
})


ReactDOM.render(<ConfigDialog/>, document.querySelector('.J_configDialog'));


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
    });
})


document.querySelector('.J_restore').onclick = () => {
    const moduleData = [{
        moduleTypeId: 1,
        moduleName: '自定义代码模块',
        moduleId: 1,
        data: {
            code: `<style>div{color:red;}</style>
                <div class="a">dsf</div>`
        }
    }, {
        moduleTypeId: 2,
        moduleName: '图片热区模块',
        moduleId: 2,
        data: {
            imgSrc: `https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2141015511,3653211916&fm=58&bpow=400&bpoh=400`
        }
    }]
    localforage.setItem('moduleData', moduleData);
}

document.querySelector('.J_refresh').onclick = () => {
    Messager.trigger('refreshModules')
}