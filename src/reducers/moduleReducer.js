import { ADD_MODULE, REFRESH_MODULE } from "../actions";


export default (state = { moduleList: [] }, action) => {
    switch (action.type) {
        case ADD_MODULE:
            {
                // 这里需要数组深拷贝，暂时不知道用啥办法
                const result = JSON.parse(JSON.stringify(state));

                const { preModuleId, moduleData } = action;
                // TODO 暂时先统统丢到最后面
                // if (preModuleId === undefined) {
                result.moduleList.push(moduleData)
                // } 
                return result;
                break;
            }

        case REFRESH_MODULE:
            const { moduleData } = action;
            return moduleData;
        default:
            return state;
    }
}