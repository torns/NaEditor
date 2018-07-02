import React from "react";
import ReactDOM from 'react-dom';
import localforage from 'localforage';
import idb from 'idb';

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


// // 我们的客户数据看起来像这样。
// const moduleName = [
//     { moduleTypeId: 1, name: '自定义代码' },
//     { moduleTypeId: 2, name: '图片热区' },
// ];
// const dbName = "NaEditor";

// var request = indexedDB.open(dbName, 1);

// request.onerror = function (event) {
//     // 错误处理程序在这里。
// };

// request.onsuccess = (e) => {
//     var db = e.target.result;
//     var transaction = db.transaction(["moduleName"], "readwrite");
//     console.log(transaction);
//     var objectStore = transaction.objectStore("moduleName");
//     let result = objectStore.get(2);
//     result.onsuccess = (e) => {
//         console.log(e)
//     }
// }

// request.onupgradeneeded = function (event) {

//     var db = event.target.result;

//     // 创建一个对象存储空间来持有有关我们客户的信息。
//     // 我们将使用 "ssn" 作为我们的 key path 因为它保证是唯一的。
//     var objectStore = db.createObjectStore("moduleName", { keyPath: "moduleTypeId" });

//     // 创建一个索引来通过 name 搜索客户。
//     // 可能会有重复的，因此我们不能使用 unique 索引。
//     objectStore.createIndex("name", "name", { unique: false });

//     // 创建一个索引来通过 email 搜索客户。
//     // 我们希望确保不会有两个客户使用相同的 email 地址，因此我们使用一个 unique 索引。
//     objectStore.createIndex("moduleTypeId", "moduleTypeId", { unique: true });

//     // 在新创建的对象存储空间中保存值
//     moduleName.forEach((v) => {
//         objectStore.add(v);
//     })
// }





// dbPromise.then(db => {
//     return db.transaction('moduleName')
//         .objectStore('moduleName').get(1);
// }).then(obj => console.log(obj));
