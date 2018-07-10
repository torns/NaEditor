import { ADD_MODULE } from "../actions";


export default (state = 0, action) => {

    switch (action.type) {
        case ADD_MODULE:
            return ++state;
            break;
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}