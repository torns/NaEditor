import { SHOW_CONFIG, HIDE_CONFIG } from "../actions";


export default (state = { isVisiable: false }, action) => {
    switch (action.type) {
        case SHOW_CONFIG:
            {
                const { moduleData } = action;
                const moduleConfig = {
                    isVisiable: true,
                    moduleData,
                }

                return Object.assign({}, state, moduleConfig);
            }
            break;
        case HIDE_CONFIG:

            return Object.assign({ isVisiable: false, })
        default:
            return state;
    }
}