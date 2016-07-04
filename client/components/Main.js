import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {
	Link,
	browserHistory
} from 'react-router';

import {
	getAuth,
	logout
} from '../actions/login';

const styles = {
	innerDiv: {
		textDecoration: 'none',
	},
	title: {
		cursor: 'pointer',
	},
	link: {
		display: 'block',
		color: '#212121'
	}
}

class Main extends Component {
	pg() {
		let pathname = window.location.pathname;
		if (pathname !== '/') {
			browserHistory.push('/')
		}
		return;
	}
	constructor(props) {
		super(props);
		this.state = {
			open: false
		};
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
		let {
			logout
		} = this.props;
		logout()
		this.handleClose()
	}

	componentDidMount() {
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

		const siderBar = (obj) => {
			return loggedIn ? (
				<Drawer
			          docked={false}
			          width={200}
			          open={obj}
			          onRequestChange={(open) => this.setState({open})}
			        >
			          <MenuItem innerDivStyle={styles.innerDiv} onTouchTap={this.handleClose.bind(this)}><Link style={styles.link} to={`/user/${login_user.username}`}>{login_user.username}</Link></MenuItem>
			          <MenuItem innerDivStyle={styles.innerDiv} onTouchTap={this.handleClose.bind(this)}><Link style={styles.link} to={`/user/${login_user.username}`}>{login_user.email}</Link></MenuItem>
			          <MenuItem innerDivStyle={styles.innerDiv} onTouchTap={this.HandleLogout.bind(this)}>登出</MenuItem>
			        </Drawer>
			) : (
				<Drawer
			          docked={false}
			          width={200}
			          open={obj}
			          onRequestChange={(open) => this.setState({open})}
			        >
					<MenuItem innerDivStyle={styles.innerDiv} onTouchTap={this.handleClose.bind(this)}><Link style={styles.link} to="/login">登录</Link></MenuItem>
			        <MenuItem innerDivStyle={styles.innerDiv} onTouchTap={this.handleClose.bind(this)}><Link style={styles.link} to="/signup">注册</Link></MenuItem>
			     </Drawer>
			)
		}
		return (
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div>
				<AppBar
				    title="Xcasx'S 博客"
				    titleStyle={styles.title}
				    onTitleTouchTap = {(obj) => this.pg()}
				    onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
				  />
				  { siderBar(this.state.open) }
				  {
					React.cloneElement(this.props.children, {...this.props})
				  }
				</div>
			</MuiThemeProvider>
		)
	}
}

function mapStateToProps(state) {
	let loggedIn = false;
	let login_user = state.login.login_user;
	if (login_user !== undefined && login_user.token && login_user.username) {
		loggedIn = true
	}
	return {
		loggedIn: loggedIn,
		login_user: state.login.login_user
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