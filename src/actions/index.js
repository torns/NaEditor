import Action from '@common/script/action';



export const REFRESH_MODULE = 'REFRESH_MODULE';
export const refreshModule = (moduleData) => {
    return {
        type: REFRESH_MODULE,
        moduleData,
    }
}

export const REFRESH_MODULE_LIST = 'REFRESH_MODULE_LIST';
export const refreshModuleList = (moduleList) => {
    return {
        type: REFRESH_MODULE_LIST,
        moduleList,
    }
}


// 添加模块
export const ADD_MODULE = 'ADD_MODULE';
export const addModule = ({ moduleData, preModuleId }) => ({
    type: ADD_MODULE,
    moduleData,
    preModuleId,
})


// 添加模块请求
export const ADD_MODULE_REQUEST = 'ADD_MODULE_REQUEST';
export const addModuleRequest = (args) => {
    return async(dispatch) => {
        dispatch(addModule(await Action.addModule(args)))
    }
}


// 删除模块
export const REMOVE_MODULE = 'REMOVE_MODULE';
export const removeModule = (moduleId) => ({
    type: REMOVE_MODULE,
    moduleId,
})

/**
 * 删除模块请求
 * @param {Object} args 入参 包含moduleId与pageId
 */
export const removeModuleRequest = (args) => async(dispatch) => {
    const data = await Action.removeModule(args);
    if (data.result === true) {
        dispatch(removeModule(data.moduleId));
    }
}

// 打开配置框
export const SHOW_CONFIG = 'SHOW_CONFIG';
export const showConfig = (moduleData) => {

    return {
        type: SHOW_CONFIG,
        moduleData
    }
}

// 关闭配置框
export const HIDE_CONFIG = 'HIDE_CONFIG';
export const hideConfig = (hideConfig) => {
    return {
        type: HIDE_CONFIG,
    }
}


// 聚焦模块
export const FOCUS_MODULE = 'FOCUS_MODULE';
export const focusModule = (moduleId) => {
    return {
        type: FOCUS_MODULE,
        moduleId,
    }
}




// 更新模块
export const UPDATE_MODULE = 'UPDATE_MODULE';
export const updateModule = (moduleData) => {
    return {
        type: UPDATE_MODULE,
        moduleData,
    }
}

// 保存模块配置
export const SAVE_CONFIG_REQUEST = 'SAVE_CONFIG_REQUEST';
export const saveConfigRequest = (moduleData) => {
    return async(dispatch) => {
        dispatch(updateModule(await Action.updateModule(moduleData)));
    }
}

// 移动模块
export const POSITION_MODULE = 'POSITION_MODULE';
export const positionModule = ({ success, moduleId, preModuleId }) => {
    if (success) {
        return {
            type: POSITION_MODULE,
            moduleId,
            preModuleId,
        }
    }
}

// 移动模块请求
export const POSITION_MODULE_REQUEST = 'POSITION_MODULE_QUEST';
export const positionModuleRequest = (args) => {
    return async(dispatch) => {
        dispatch(positionModule(await Action.positionModule(args)));
    }
}





export const FETCH_MODULE_LIST = 'FETCH_MODULE_LIST';
export const fetchModuleList = (pageId) => {
    return async(dispatch) => {
        dispatch(refreshModuleList(await Action.getModuleList(pageId)))
    }

}