import localforage from "localforage";
import idb from 'idb';


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
        let dbModuleData = await localforage.getItem('moduleData');
        dbModuleData.forEach((v, i) => {
            let _moduleData = dbModuleData[i];
            if (_moduleData.moduleId === moduleId) {
                dbModuleData.splice(i, 1);
            }
        })
        return localforage.setItem('moduleData', dbModuleData);
    },
    /**
     * 添加模块
     * @param {Object} args 入参，模块类型，位置等
     */
    async addModule(args) {

        let { preModuleId, moduleTypeId, data } = args;
        let dbModuleData = await localforage.getItem('moduleData');

        //没有前一个模块的Id则默认添加到页面最后
        preModuleId === undefined && (preModuleId = dbModuleData[length - 1].moduleId);

        // 没有模块数据默认为空对象
        data === undefined && (data = {});

        // TODO:如果是真实数据库，应该是自增1的值
        const moduleId = Math.max(...dbModuleData.map(v => v.moduleId)) + 1;

        // 根据moduleTypeId查模块名称
        const moduleName = await Action.getModuleName(moduleTypeId);

        const moduleData = {
            moduleId,
            moduleTypeId,
            moduleName,
            data,
        }


        return localforage.setItem('moduleData', dbModuleData.concat(moduleData));

    },
    /**
     * 获得模块列表
     */
    async getModulesList() {
        return localforage.getItem('moduleData');
    },
    /**
     * 根据moduleTypeId获取模块名称
     * @param {Number} moduleTypeId 模块类型Id
     */
    async getModuleName(moduleTypeId) {
        const db = await idb.open('NaEditor');
        return await db.transaction('moduleName').objectStore('moduleName').get(moduleTypeId);
    }

}

export default Action;