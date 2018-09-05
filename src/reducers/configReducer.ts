import { SHOW_CONFIG, HIDE_CONFIG, SAVE_CONFIG_REQUEST, ADD_MODULE, UPDATE_MODULE } from '../actions';

export default (state = { isVisiable: false, configData: {} }, action: any) => {

    switch (action.type) {
        case SHOW_CONFIG:
            {
                const { moduleData } = action;
                const moduleConfig = {
                    isVisiable: true,
                    moduleData,
                };
                const result = moduleConfig;
                return result;
            }
        case HIDE_CONFIG:
            return Object.assign({ isVisiable: false });
        case SAVE_CONFIG_REQUEST:
            const { configData } = action;
            return Object.assign({}, state, {
                configData,
            });
        case ADD_MODULE: {
            const { moduleData } = action;
            const result = {
                ...state, ...{
                    moduleData,
                }
            };
            return result;
        }
        case UPDATE_MODULE: {
            const { moduleData } = action;
            const result = {
                ...state, ...{
                    moduleData,
                }
            };
            return result;
        }
        default:
            return state;
    }
};
