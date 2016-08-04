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
import Index from './components/Index';
import Login from './components/sessions/Login';
import Signup from './components/sessions/Signup';
import TopicNew from './components/topics/New';
import TopicShow from './components/topics/Show';
import TopicEdit from './components/topics/Edit';
import NodeIndex from './components/nodes/Index';
import NodeShow from './components/nodes/Show';
import About from './components/about';


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
	      		{/*<Route path="signup" component={Signup}/>*/}
	      		<Route path="articles/new" component={TopicNew}/>
	      		<Route path="articles/:id" component={TopicShow}/>
	      		<Route path="articles/:id/edit" component={TopicEdit}/>
						<Route path="nodes" component={NodeIndex}/>
	      		<Route path="nodes/:id" component={NodeShow}/>
	      		<Route path="about" component={About}/>
						<Route path="*" component={About} />
	    	</Route>
	    </Router>
    </Provider>,
	document.getElementById('root')
);
