import localforage from "localforage";
import idb from 'idb';

const DB_NAME = `NaEditor`;

const Action = {
    /**
     * 更新模块
     * @param {Array} moduleData 模块数据列表
     */
    async updateModule(moduleData) {
        const { moduleId } = moduleData;
        let dbModuleData = await localforage.getItem('moduleData');
        dbModuleData.forEach((v, i) => {
            let _moduleData = dbModuleData[i];
            if (_moduleData.moduleId === moduleId) {
                dbModuleData[i] = moduleData;
            }
        })

        return localforage.setItem('moduleData', dbModuleData);
    },
    /**
     * 根据模块Id删除模块  
     * @param {Number} moduleId 模块Id
     */
    async removeModule(moduleId) {
        return new Promise(async(resolve, reject) => {
            const db = await idb.open(DB_NAME);
            const tx = db.transaction('module', 'readwrite').objectStore('module');
            const result = tx.delete(moduleId).request;
            result.onsuccess = () => {
                resolve({ result: true });
            }
            result.onerror = () => {
                reject({ result: false });
            }
        })
    },
    /**
     * 添加模块
     * @param {Object} args 入参，模块类型，位置等
     */
    async addModule(args = { preModuleId: 1, moduleTypeId: 1, data: {}, pageId: 1 }) {

        let { preModuleId, moduleTypeId, data, pageId } = args;
        pageId === undefined ? pageId = 1 : '';
        let dbModuleData = await localforage.getItem('moduleData');

        //没有前一个模块的Id则默认添加到页面最后
        preModuleId === undefined && (preModuleId = dbModuleData[length - 1].moduleId);

        // 没有模块数据默认为空对象
        data === undefined && (data = {});

        // TODO:如果是真实数据库，应该是自增1的值
        // const moduleId = Math.max(...dbModuleData.map(v => v.moduleId)) + 1;

        // 根据moduleTypeId查模块名称
        const moduleName = await Action.getModuleName(moduleTypeId);

        const moduleData = {
            pageId,
            moduleTypeId,
            moduleName,
            data,
        }

        // return new Promise(async(resolve, reject) => {
        //     const db = await idb.open(DB_NAME);
        //     const tx = db.transaction(['module', 'page'], 'readwrite');

        //     const pageStore = tx.objectStore('page');
        //     const moduleStore = tx.objectStore('module');


        //     tx.onsuccess = resolve;
        //     tx.onerror = reject;
        // })

        // const tx = db.transaction('module', 'readwrite').objectStore('module');
        // const moduleId = await tx.put(moduleData);

        // // 到page表中，在该page下的moduleList里加入这个模块
        // const pageStore = await db.transaction('page', 'readwrite').objectStore('page');
        // const page = pageStore.get(pageId);
        // page.moduleList === undefined && (page.moduleList = [])
        // page.moduleList.push(moduleId);
        // pageStore.put(page);
        // console.log(result);





        const db = await idb.open(DB_NAME);
        const tx = db.transaction('module', 'readwrite').objectStore('module');
        const moduleId = await tx.put(moduleData);

        // 到page表中，在该page下的moduleList里加入这个模块
        const pageStore = await db.transaction('page', 'readwrite').objectStore('page');
        const page = pageStore.get(pageId);
        page.moduleList === undefined && (page.moduleList = [])
        page.moduleList.push(moduleId);
        pageStore.put(page);
        console.log(result);


        return await db.transaction('module', 'readonly').objectStore('module').get(moduleId);

    },
    /**
     * 获得模块列表
     */
    async getModulesList() {
        const db = await idb.open('NaEditor');
        const result = await db.transaction('module').objectStore('module').getAll();
        return result;
    },
    /**
     * 根据moduleTypeId获取模块名称
     * @param {Number} moduleTypeId 模块类型Id
     */
    async getModuleName(moduleTypeId) {
        const db = await idb.open('NaEditor');
        const result = await db.transaction('moduleName').objectStore('moduleName').get(moduleTypeId);
        return result.moduleName;
    },
    /**
     * 删除所有模块
     */
    async deleteAllModules() {

        const db = await idb.open('NaEditor');
        const moduleResult = await db.transaction('module').objectStore('module').getAll();
        const moduleIds = moduleResult.map(v => v.moduleId);

        return new Promise(async(resolve, reject) => {
            Promise.all(moduleIds.map((moduleId) => new Promise((resolve, reject) => {
                const tx = db.transaction('module', 'readwrite').objectStore('module');
                const result = tx.delete(moduleId).request;

                result.onsuccess = () => {
                    resolve({ result: true });
                }
                result.onerror = () => {
                    reject({ result: false });
                }
            }))).then(() => {
                resolve(true);
            });

        })

    },
    /**
     * 新增页面
     */
    async addPage(pageData = { name: '页面名称' }) {
        const NAME = `page`
        const db = await idb.open(DB_NAME);
        const tx = db.transaction(NAME, 'readwrite').objectStore(NAME);
        const pageId = await tx.put(pageData)
        return await db.transaction(NAME, 'readonly').objectStore(NAME).get(pageId);
    }

}

window.Action = Action;

export default Action;