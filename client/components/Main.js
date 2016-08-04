import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {
	browserHistory
} from 'react-router';

import {
	getAuth,
	logout
} from '../actions/login';

import SideBar from '../common/SideBar';

const styles = {
	title: {
		cursor: 'pointer',
	}
}

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false
		};
	}

	pg() {
		let pathname = window.location.pathname;
		if (pathname !== '/') {
			browserHistory.push('/')
		}
		return;
	}

	handleToggle(e) {
		this.setState({
			open: !this.state.open
		});
	}

	handleClose() {
		this.setState({
			open: false
		});
	}

	HandleLogout() {
		this.handleClose();
		let {
			logout
		} = this.props;
		logout();
		this.pg();
	}

	dealRequest(open) {
		this.setState({
			open: open
		})
	}
	componentWillMount() {
		let {
			getAuth
		} = this.props;
		getAuth();
	}

	render() {
		let {
			loggedIn,
			login_user
		} = this.props;
		return (
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div>
				<AppBar
				    title="Xcasx"
				    titleStyle={styles.title}
				    onTitleTouchTap = {(obj) => this.pg()}
				    onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
				  />
				  <SideBar {...this.props} key="sidebar" HandleLogout={this.HandleLogout.bind(this)} handleClose={this.handleClose.bind(this)} dealRequest={this.dealRequest.bind(this)} open={this.state.open} />
				  {
					React.cloneElement(this.props.children, ...this.props)
				  }
				</div>
			</MuiThemeProvider>
		)
	}
}

function mapStateToProps(state) {
	let loggedIn = false;
	let admin = false;
	let login_user = state.login.login_user;
	if (login_user !== undefined && login_user.token && login_user.username) {
		loggedIn = true
		if (login_user.admin) {
			admin = true
		}
	}
	return {
		loggedIn: loggedIn,
		admin: admin,
		login_user: login_user,
		topics: state.topics
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getAuth: () => {
			dispatch(getAuth())
		},
		logout: () => {
			dispatch(logout())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);