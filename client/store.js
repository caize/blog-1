import {
	createStore,
	applyMiddleware
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/index';
import {
	browserHistory
} from 'react-router';
import {
	syncHistoryWithStore
} from 'react-router-redux';
import {
	authenticationMiddleware
} from './middleware';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, authenticationMiddleware));
export default store;
export const history = syncHistoryWithStore(browserHistory, store);