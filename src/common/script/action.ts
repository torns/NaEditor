import { message } from 'antd';
import { IModuleData, IModule } from './../../component/interface';
import INTERFACE from './INTERFACE';
import axios from 'axios';
import isServer from './isServer';

const DBAction = {
    async getAllModule(pageId: number) {

        const { data } = (await axios(INTERFACE.getAllModule, {
            params: {
                pageId,
            },
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
                pageId,
            },
        })).data;
        if (result.success === true) {
            return {
                result: true,
                moduleId,
            };
        } else {
            return {
                result: false,
            };
        }
    },
    /**
     * 移动模块
     */
    async positionModule({ moduleId, preModuleId, pageId }: { moduleId: number, preModuleId?: number, pageId: number }) {

        const result = (await axios(INTERFACE.positionModule, {
            params: { moduleId, preModuleId, pageId },
        })).data;

        if (result.success === true) {
            return {
                success: true,
                moduleId,
                preModuleId,
            };
        } else {
            return {
                success: false,
            };
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
        }
    },
    /**
     * 复制模块
     */
    async copyModule(moduleId: number, pageId: number) {
        const result = (await axios(INTERFACE.copyModule, {
            params: {
                moduleId,
                pageId,
            },
        })).data;
        if (result.success === true) {
            message.success('复制成功');
            return result.data;
        } else {
            return {};
        }
    },
    /**
     * 获取页面初始化数据
     * @param pageType 页面类型 0：装修 1：预览 2：浏览
     */
    async getInitData(pageType: number, pageId?: number) {
        if (!pageId && !isServer()) {
            pageId = (window as any).location.href.match(/pageId=([0-9]+)/)[1];
        }
        const result = (await axios(INTERFACE.getInitData, {
            params: {
                pageId,
            },
        })).data;
        if (result.success) {
            result.data.pageType = pageType;
            return result.data;
        }
    },
    /**
     * 退出登录
     */
    async logout() {
        return (await axios(INTERFACE.logout)).data;
    },
    /**
     * 发布页面
     */
    async publishPage(pageId: number) {
        return (await axios(INTERFACE.publishPage, {
            params: {
                pageId,
            },
        })).data;
    },
};

const Action = DBAction;

if (!isServer) {
    (window as any).Action = Action;
}

export default Action;