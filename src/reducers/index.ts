import { combineReducers } from 'redux';

import moduleConfig from './configReducer';
import module from "./moduleReducer";


export default combineReducers({
    module,
    moduleConfig
})