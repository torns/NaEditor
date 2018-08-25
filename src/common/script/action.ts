import { message } from 'antd';
import { IModuleData, IModule } from './../../component/interface';
import localforage from "localforage";
import idb from 'idb';
import DB from '../../db/dbConfig';
import INTERFACE from './INTERFACE';
import axios from 'axios';

let Action: any = {
    /**
     * 根据模块Id删除模块  
     * @param {Object}  入参 带moduleId和pageId
     */
    async removeModule({ moduleId, pageId }: { moduleId: number, pageId: number }) {
        return new Promise(async (resolve, reject) => {
            const db = await idb.open(DB.Name);
            const tx = db.transaction(['page', 'module'], 'readwrite');
            const pageStore = tx.objectStore('page');
            const moduleStore = tx.objectStore('module');

            // 删除页面引用
            let page = await pageStore.get(pageId);
            page.moduleList = page.moduleList.filter((v: number) => v !== moduleId);
            // 回填到页面
            await pageStore.put(page);

            // 删除模块实例
            await moduleStore.delete(moduleId);

            resolve({
                result: true,
                moduleId,
            })

        })
    },
    /**
     * 添加模块
     * @param {Object} args 入参，模块类型，位置等
     */
    async addModule(args = { preModuleId: undefined, moduleTypeId: 1, data: {}, pageId: 1 }) {

        let { preModuleId, moduleTypeId, data, pageId } = args;

        let dbModuleData = await localforage.getItem('moduleData');


        // 没有模块数据默认为空对象
        data === undefined && (data = {});


        // 根据moduleTypeId查模块名称
        const moduleName = await Action.getModuleName(moduleTypeId);

        const moduleData = {
            moduleTypeId,
            moduleName,
            data,
            pageId,
        }

        return new Promise(async (resolve, reject) => {
            const db = await idb.open(DB.Name);
            const tx = db.transaction(['module', 'page'], 'readwrite');

            const pageStore = tx.objectStore('page');
            const moduleStore = tx.objectStore('module');

            const moduleId = await moduleStore.add(moduleData);

            // 在该page中插入模块id
            let page = await pageStore.get(pageId);
            page.moduleList === undefined && (page.moduleList = []);

            //没有前一个模块的Id则默认添加到页面最后
            if (preModuleId === undefined) {
                preModuleId = page.moduleList[page.moduleList.length - 1] || undefined;
            }
            const index = page.moduleList.indexOf(preModuleId);
            page.moduleList.splice(index + 1, 0, moduleId);

            // 更新page
            pageStore.put(page);

            resolve({
                moduleData: await moduleStore.get(moduleId),
                preModuleId,
            });
        })
    },
    /**
     * 更新模块
     */
    async updateModule(moduleData: IModuleData) {
        const db = await idb.open(DB.Name);
        delete moduleData.tempData; //  临时属性不存到库里
        const tx = db.transaction(['module'], 'readwrite');
        const moduleId = await tx.objectStore('module').put(moduleData);
        const result = await tx.objectStore('module').get(moduleId);
        return result;
    },
    /**
     * 移动模块
     */
    async positionModule({ moduleId, preModuleId, pageId }: { moduleId: number, preModuleId?: number, pageId: number }) {
        const db = await idb.open(DB.Name);
        const tx = db.transaction(['page'], 'readwrite');
        let page = await tx.objectStore('page').get(pageId);
        page.moduleList = page.moduleList.filter((v: number) => v !== moduleId); //先移除模块
        // 如果没有设置preModuleId，则说明移到第一个模块
        if (preModuleId === undefined) {
            page.moduleList = [moduleId].concat(page.moduleList)
        } else {
            const preIndex = page.moduleList.indexOf(preModuleId);
            page.moduleList.splice(preIndex + 1, 0, moduleId); //在preModule后添加模块
        }
        const result = await tx.objectStore('page').put(page);
        if (result) {
            return {
                success: true,
                moduleId,
                preModuleId,
            }
        } else {
            return {
                success: false,
            }
        }
    },
    /**
     * 获得页面所有模块数据
     * @param {String} pageId 页面Id
     */
    async getAllModule(pageId: number) {

        const db = await idb.open(DB.Name);
        const tx = db.transaction(['module', 'page'], 'readonly');
        const moduleInfos = await tx.objectStore('module').getAll();

        const pageInfo = await tx.objectStore('page').get(pageId);
        let promiseArr = [];
        for (let moduleId of pageInfo.moduleList) {
            if (moduleId !== undefined) {
                promiseArr.push(tx.objectStore('module').get(moduleId))
            }
        }
        const result = await Promise.all(promiseArr);
        return result;
    },
    /**
     * 根据moduleTypeId获取模块名称
     * @param {Number} moduleTypeId 模块类型Id
     */
    async getModuleName(moduleTypeId: number) {
        const db = await idb.open(DB.Name);
        const result = await db.transaction('moduleName').objectStore('moduleName').get(moduleTypeId);
        return result.moduleName;
    },
    /**
     * 删除所有模块
     */
    async deleteAllModules() {

        const db = await idb.open(DB.Name);
        const moduleResult = await db.transaction('module').objectStore('module').getAll();
        const moduleIds = moduleResult.map(v => v.moduleId);

        return new Promise(async (resolve, reject) => {
            Promise.all(moduleIds.map((moduleId) => new Promise((resolve, reject) => {
                const tx = db.transaction('module', 'readwrite').objectStore('module');
                const result = (tx.delete(moduleId) as any).request;

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
        const db = await idb.open(DB.Name);
        const tx = db.transaction(NAME, 'readwrite').objectStore(NAME);
        const pageId = await tx.put(pageData)
        return await db.transaction(NAME, 'readonly').objectStore(NAME).get(pageId);
    }

}

const DBAction = {
    async getAllModule(pageId: number) {
        const { data } = (await axios(INTERFACE.getAllModule, {
            params: {
                pageId,
            }
        }));
        if (data.success === true) {
            return data.data;
        } else {
            return [];
        }
    },
    /**
    * 添加模块
    * @param {Object} args 入参，模块类型，位置等
    */
    async addModule(args: { preModuleId?: number, moduleTypeId: number, data?: any, pageId: number }) {
        const { data } = (await axios(INTERFACE.addModule, {
            params: args,
        }));
        if (data.success === true) {
            message.success('添加成功', 1);
            return data.data;
        } else {
            message.error(data.message);
            return {};
        }
    },
    /**
     * 根据模块Id删除模块  
     * @param {Object}  入参 带moduleId和pageId
     */
    async removeModule({ moduleId, pageId }: { moduleId: number, pageId: number }) {
        const result = (await axios(INTERFACE.removeModule, {
            params: {
                moduleId,
                pageId
            }
        })).data;
        if (result.success === true) {
            return {
                result: true,
                moduleId,
            }
        } else {
            return {
                result: false,
            }
        }
    },
    /**
     * 移动模块
     */
    async positionModule({ moduleId, preModuleId, pageId }: { moduleId: number, preModuleId?: number, pageId: number }) {

        const result = (await axios(INTERFACE.positionModule, {
            params: { moduleId, preModuleId, pageId }
        })).data;

        if (result.success === true) {
            return {
                success: true,
                moduleId,
                preModuleId,
            }
        } else {
            return {
                success: false,
            }
        }
    },
    /**
     * 更新模块
     */
    async updateModule(moduleData: IModuleData) {
        delete moduleData.tempData; // 删除临时数据
        const result = (await axios(INTERFACE.updateModule, {
            params: {
                moduleData,
            },
        })).data;
        if (result.success === true) {
            message.success('保存成功', 1);
            return result.data;
        } else {
            return {};
        };
    },
    /**
     * 获取页面初始化数据
     * @param pageType 页面类型 0：装修 1：预览 2：浏览
     */
    async getInitData(pageType: number) {
        const pageId = (window as any).location.href.match(/pageId=([0-9]+)/)[1];
        const result = (await axios(INTERFACE.getInitData, {
            params: {
                pageId,
            }
        })).data;
        if (result.success) {
            result.data.pageType = pageType;
            return result.data;
        }
    },
}

// if ((window as any).BASE_DATA.dbSource === '1') {
Action = DBAction;
// }

(window as any).Action = Action;

export default Action;