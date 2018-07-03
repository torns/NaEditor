import DB from '@db/dbConfig';
import idb from 'idb';

/**
 * 初始化模块名称
 */
async function initModuleName() {

    const data = [{
        moduleTypeId: 1,
        moduleName: '自定义代码',
    }, {
        moduleTypeId: 2,
        moduleName: '图片热区',
    }];

    const StoreName = `moduleName`;
    const db = await idb.open(DB.Name);

    const Store = db.transaction(StoreName, 'readwrite').objectStore(StoreName);

    data.forEach(v => {
        Store.add(v);
    })
}


/**
 * 初始化页面
 */
async function initPage() {

    const data = [{
        pageId: 1,
        pageName: '测试页面'
    }];

    const StoreName = `page`;
    const db = await idb.open(DB.Name);
    const Store = db.transaction(StoreName, 'readwrite').objectStore(StoreName);

    data.forEach(v => {
        Store.add(v);
    })
}


function init() {
    const initFuns = [initModuleName, initPage];
    initFuns.forEach(v => {
        try {
            v();
        } catch (e) {
            console.log(e)
        }
    })
}

export default init;