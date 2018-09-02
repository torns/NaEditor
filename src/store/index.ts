import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'

import reducer from '../reducers';

const middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
    // middleware.push(createLogger())
}
const composeEnhancers = composeWithDevTools({
    // Specify here name, actionsBlacklist, actionsCreators and other options
});

const store = createStore(reducer, composeEnhancers(
    applyMiddleware(...middleware),
    // other store enhancers if any
));


export default store;
