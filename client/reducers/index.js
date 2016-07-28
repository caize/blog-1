import {
	combineReducers
} from 'redux';

import {
	routerReducer
} from 'react-router-redux';

import login from './login';
import topics from './topics';
import nodes from './nodes';

export default combineReducers({
	login,
	topics,
	nodes,
	routing: routerReducer
});