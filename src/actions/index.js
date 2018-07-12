import Action from '@common/script/action';






export const REFRESH_MODULE = 'REFRESH_MODULE';
export const refreshModule = (moduleData) => {
    return {
        type: REFRESH_MODULE,
        moduleData,
    }
}




export const ADD_MODULE = 'ADD_MODULE';
export const addModule = ({ moduleData, preModuleId }) => ({
    type: ADD_MODULE,
    moduleData,
    preModuleId,
})


export const ADD_MODULE_REQUEST = 'ADD_MODULE_REQUEST';
export const addModuleRequest = (args) => {
    return async(dispatch) => {
        dispatch(addModule(await Action.addModule(args)))
    }
}

export const FETCH_MODULE_LIST = 'FETCH_MODULE_LIST';
export const fetchModuleList = (pageId) => {
    return (dispatch) => {
        // Action.

    }

}