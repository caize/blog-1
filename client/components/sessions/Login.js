import React, {
	Component
} from 'react';

import {
	connect
} from 'react-redux';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';

import {
	Link,
	browserHistory
} from 'react-router';

import {
	login,
	loginError
} from '../../actions/login';

import Error from '../../common/Error';


const styles = {
	login: {
		margin: '0 auto',
		paddingTop: 0,
		paddingRight: 20,
		paddingLeft: 20,
		paddingBottom: 80,
		marginTop: 15,
		maxWidth: 480,
		minWidth: 320
	},
	button: {
		marginTop: 20,
		float: 'right'
	},
	textField: {
		display: 'block',
		width: '100%',
		marginTop: -10
	},
	enterlink: {
		fontSize: 14,
		float: 'left',
		marginTop: 45,
		color: '#757575',
		marginLeft: -70
	},
	forget: {
		fontSize: 14,
		float: 'left',
		color: '#757575',
		marginTop: 20,
	}
};



class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loginError: "",
			passwordError: ""
		}
	}
	submitFrom() {
		let username = this.refs.username.getValue();
		let password = this.refs.password.getValue();
		let {
			login
		} = this.props;
		let error = false;

		if (!username) {
			error = true;
			this.setState({
				loginError: "邮箱/登录名不能为空"
			})
		}
		if (!password || password.length < 6) {
			error = true;
			this.setState({
				passwordError: "密码长度不对,至少六位"
			})
		}
		if (error === false) {
			this.setState({
				loginError: '',
				passwordError: ''
			})
			login(username, password);
		}
	}

	_handleInputChange(name) {
		switch (name) {
			case 'username':
				this.setState({
					loginError: ""
				});
				break;
			case 'password':
				this.setState({
					passwordError: ""
				});
				break;
			default:
				break;
		}
	}

	componentDidMount() {
		let {
			loginError
		} = this.props;
		loginError({});
	}

	componentWillReceiveProps(nextProps) {
		this.checkAuth();
	}

	checkAuth() {
		let {
			login_user
		} = this.props;
		if (login_user !== undefined && login_user.token !== undefined) {
			browserHistory.push('/')
		}
	}

	render() {
		return (
			<div>
			<Paper zDepth={2} style={styles.login}>
			  <TextField
			      hintText="邮箱/登录名"
			      floatingLabelText="邮箱/登录名"
			      fullWidth={true}
			      errorText={this.state.loginError}
			      ref='username'
			      key='username'
			      style={styles.textField}
			      onChange={this._handleInputChange.bind(this, 'username')}
			    />
			    <br />
			  <TextField
			      hintText="密码"
			      floatingLabelText="密码"
			      fullWidth={true}
			      type='password'
			      errorText={this.state.passwordError}
			      style={styles.textField}
			      ref='password'
			      key='password'
			      onChange={this._handleInputChange.bind(this, 'password')}
			    />
			    <br />
			    <RaisedButton label="登录" onMouseDown={this.submitFrom.bind(this)} primary={true} style={styles.button} />
			    <Link style={styles.forget} to="/signup">忘记密码？</Link>
			    <Link style={styles.enterlink} to="/signup">没有帐号？</Link>
			    <Error error={this.props.login_error.error} time={this.props.login_error.time} />
		   </Paper>
		   </div>
		)
	}
}



function mapDispatchToProps(dispatch) {
	return {
		login: (username, password) => {
			dispatch(login(username, password))
		},
		loginError: (json) => {
			dispatch(loginError(json))
		}
	}
}

function mapStateToProps(state) {
	return {
		login_error: state.login.login_error,
		login_user: state.login.login_user
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);