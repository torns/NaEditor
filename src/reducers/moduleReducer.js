import { ADD_MODULE, REFRESH_MODULE, REFRESH_MODULE_LIST, REMOVE_MODULE, UPDATE_MODULE } from "../actions";


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

            // case REFRESH_MODULE:
            //     const { moduleData } = action;
            //     return moduleData;

        case REFRESH_MODULE_LIST: //刷新整页
            const { moduleList } = action;
            return {
                moduleList,
            };


        case REMOVE_MODULE: // 删除模块
            const { moduleId } = action;
            if (state.moduleList) {
                return Object.assign({}, state, {
                    moduleList: state.moduleList.filter(v => v.moduleId !== moduleId)
                });
            } else {
                return state;
            }
        case UPDATE_MODULE: //更新模块
            const { moduleData } = action;
            console.log(action)
            if (moduleData) {
                const { moduleId } = moduleData;
                const result = Object.assign({}, state, {
                    moduleList: state.moduleList.map((v) => {
                        if (v.moduleId === moduleId) {
                            return moduleData;
                        } else {
                            return v;
                        }
                    })
                });
                return result;
            }


        default:
            return state;
    }
}