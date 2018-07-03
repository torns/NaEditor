import idb from 'idb';
import DB from '@db/dbConfig';

const DB_VERSION = DB.Version;


var DBOpenRequest = window.indexedDB.open(DB.Name, DB_VERSION);

DBOpenRequest.onupgradeneeded = (e) => {
    const db = e.target.result;
    const func = [updateModuleName, updateModule, updatePage];
    func.forEach(func => {
        try {
            func(db);
        } catch (e) {
            console.log(e);
        }
    })
}


function updateModuleName(db) {
    // const data = [{
    //     moduleName: '自定义代码',
    // }, {
    //     moduleName: '图片热区',
    // }];

    const StoreName = 'moduleName';
    if (!Array.from(db.objectStoreNames).includes(StoreName)) {
        const objectStore = db.createObjectStore(StoreName, { keyPath: "moduleTypeId", autoIncrement: true });
        objectStore.createIndex('moduleTypeId', 'moduleTypeId', { unique: true });
        objectStore.createIndex('moduleName', 'moduleName', { unique: false });
    }

    // data.forEach(v => {
    //     objectStore.add(v);
    // })
}

async function updateModule(db) {

    // const data = [{
    //     moduleTypeId: 1,
    //     moduleName: '自定321义代码模块',
    //     data: {
    //         code: `<style>div{color:red;}</style>
    //         <div class="a">dsf</div>`
    //     }
    // }, {
    //     moduleTypeId: 2,
    //     moduleName: '图片热区模块',
    //     data: {
    //         imgSrc: `https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2141015511,3653211916&fm=58&bpow=400&bpoh=400`
    //     }
    // }]

    const StoreName = 'module';
    if (!Array.from(db.objectStoreNames).includes(StoreName)) {
        const objectStore = db.createObjectStore(StoreName, { keyPath: "moduleId", autoIncrement: true });
        objectStore.createIndex('moduleName', 'moduleName', { unique: false });
        objectStore.createIndex('moduleTypeId', 'moduleTypeId', { unique: false });
    }


}

async function updatePage(db) {
    const StoreName = 'page';
    if (!Array.from(db.objectStoreNames).includes(StoreName)) {
        const objectStore = db.createObjectStore(StoreName, { keyPath: "pageId", autoIncrement: true });
        objectStore.createIndex('pageName', 'pageName', { unique: false });
    }
}