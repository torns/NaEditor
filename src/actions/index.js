export const ADD_MODULE = 'ADD_MODULE';

export const FETCH_MODULE_LIST = 'FETCH_MODULE_LIST';

export const addModule = (moduleId) => ({
    type: ADD_MODULE,
    moduleId,
})

export const REFRESH_MODULE = 'REFRESH_MODULE';
export const refreshModule = (moduleData) => {
    return {
        type: REFRESH_MODULE,
        moduleData,
    }
}
export const fetchModuleList = (pageId) => {
    return function(dispatch) {

        setTimeout(() => {
            dispatch(refreshModule({
                moduleData: [{
                    moduleId: 1,
                    moduleName: '312'
                }, {
                    moduleId: 2,
                    moduleName: '3fassd12'
                }]
            }))
        }, 1000);
    }

}