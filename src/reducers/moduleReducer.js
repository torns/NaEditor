import {
    ADD_MODULE,
    REFRESH_MODULE,
    REFRESH_MODULE_LIST,
    REMOVE_MODULE,
    UPDATE_MODULE,
    FOCUS_MODULE,
    POSITION_MODULE,
    MODULE_TOP_CHANGE,
    MODULE_HEIGHT_CHANGE,
} from "../actions";



export default (state = { moduleList: [] }, action) => {
    switch (action.type) {
        case ADD_MODULE:
            {
                const { preModuleId, moduleData } = action;
                let newModuleList;
                if (preModuleId === undefined) {
                    newModuleList = [moduleData].concat(state.moduleList);
                } else {
                    newModuleList = state.moduleList.reduce((acc, v, i, array) => {
                        acc.push(v);
                        if (v.moduleId === preModuleId) {
                            acc.push(moduleData);
                        }
                        return acc;
                    }, []);
                }
                const result = Object.assign({}, state, { moduleList: newModuleList })
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
            {
                const { moduleId } = action;
                let result;
                if (state.moduleList) {
                    return Object.assign({}, state, {
                        moduleList: state.moduleList.filter(v => v.moduleId !== moduleId)
                    });
                } else {
                    return state;
                }
            }
            break;
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
                    newModuleList.splice(preModuleIndex + 1, 0, module);
                }
                const result = Object.assign({}, state, {
                    moduleList: newModuleList,
                })
                return result;
            }
        case MODULE_TOP_CHANGE: // 模块top值变化
            {
                const { moduleId, top } = action;
                const newModuleList = state.moduleList.map(v => {
                    if (v.moduleId === moduleId) {
                        v.tempData = Object.assign({}, v.tempData, { top });
                    }
                    return v;
                })
                const result = Object.assign({}, state, {
                    moduleList: newModuleList,
                })
                return result;
            }
            break;
        case MODULE_HEIGHT_CHANGE: // 模块height值变化
            {
                const { moduleId, height } = action;
                const newModuleList = state.moduleList.map(v => {
                    if (v.moduleId === moduleId) {
                        v.tempData = Object.assign({}, v.tempData, { height });
                    }
                    return v;
                })
                const result = Object.assign({}, state, {
                    moduleList: newModuleList,
                })
                return result;
            }
            break;
        default:
            return state;
    }
}