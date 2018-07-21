import {
    ADD_MODULE,
    REFRESH_MODULE,
    REFRESH_MODULE_LIST,
    REMOVE_MODULE,
    UPDATE_MODULE,
    FOCUS_MODULE,
    POSITION_MODULE,
} from "../actions";



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
            if (moduleData) {
                const { moduleId } = moduleData;
                const result = Object.assign({}, state, {
                    moduleList: state.moduleList.map((v) => {
                        if (v.moduleId === moduleId) {
                            moduleData.tempData = v.tempData; //带上临时数据
                            return moduleData;
                        } else {
                            return v;
                        }
                    })
                });
                return result;
            }
        case FOCUS_MODULE: //聚焦模块
            {
                const { moduleId } = action;
                const result = Object.assign({}, state, {
                    moduleList: state.moduleList.map(v => {
                        v.moduleId === moduleId ?
                            v.tempData = Object.assign({}, v.tempData, { isActive: true }) :
                            v.tempData = Object.assign({}, v.tempData, { isActive: false })
                        return v;
                    })
                })
                return result;
            }
        case POSITION_MODULE: //移动模块
            {
                const { moduleId, preModuleId } = action;
                let { newModuleList, module } = state.moduleList.reduce((acc, v) => {
                    if (v.moduleId === moduleId) {
                        acc.module = v;
                    } else {
                        acc.newModuleList.push(v);
                    }
                    return acc;
                }, {
                    newModuleList: [],
                    module: undefined,
                });
                // 如果移到第一个位置
                if (preModuleId === undefined) {
                    newModuleList = [module].concat(newModuleList);
                } else {
                    const preModuleIndex = newModuleList.findIndex(v => v.moduleId === preModuleId);
                    newModuleList.splice(preModuleIndex, 0, module);
                }
                const result = Object.assign({}, state, {
                    moduleList: newModuleList,
                })
                return result;
            }
        default:
            return state;
    }
}