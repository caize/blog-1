import React from 'react';
import {
	render
} from 'react-dom';
import {
	Router,
	Route,
	IndexRoute,
	browserHistory
} from 'react-router';

import {
	Provider
} from 'react-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import css from './styles/main.scss';

import Main from './components/Main';
import Login from './components/Login';
import Index from './components/Index';
import Signup from './components/Signup';


import store from './store';
import {
	history
} from './store'

render(
	<Provider store={store}>
		<Router history={history}>
	    	<Route path="/" component={Main}>
	    		<IndexRoute component={Index}></IndexRoute>
	      		<Route path="login" component={Login}/>
	      		<Route path="signup" component={Signup}/>
	    	</Route>
	    </Router>
    </Provider>,
	document.getElementById('root')
);