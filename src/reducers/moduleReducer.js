import { ADD_MODULE, REFRESH_MODULE } from "../actions";


export default (state = { moduleList: [] }, action) => {
    switch (action.type) {
        case ADD_MODULE:
            return state;
            break;
        case REFRESH_MODULE:
            const { moduleData } = action;
            return moduleData;
        default:
            return state;
    }
}