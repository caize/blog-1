import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux';
import {
	Link,
	browserHistory
} from 'react-router';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';

import {
	register
} from '../../actions/login';

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
		marginTop: 30,
		color: '#757575'
	}
};

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			emailError: '',
			nameError: '',
			usernameError: '',
			passwordError: ''
		};
	}

	submitFrom() {
		let email = this.refs.email.getValue();
		let name = this.refs.name.getValue();
		let username = this.refs.username.getValue();
		let password = this.refs.password.getValue();

		let error = false;
		let reUsername = /^\w+$/;
		let reEmail = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;

		if (!email || !reEmail.test(email)) {
			error = true;
			this.setState({
				emailError: "格式不正确"
			});
		}

		if (!name || name.length < 3) {
			error = true;
			this.setState({
				nameError: "不能少于3个字符"
			})
		}

		if (!username || !reUsername.test(username) || username.length < 3 || username.length > 20) {
			error = true;
			this.setState({
				usernameError: "不在3-20个字符之间"
			})
		}

		if (!password || password.length < 6) {
			error = true;
			this.setState({
				passwordError: "不能少于6位"
			})
		}

		if (error === false) {

			let {
				register
			} = this.props;
			this.setState({
				usernameError: '',
				emailError: '',
				nameError: '',
				passwordError: ''
			})
			register(username, email, name, password);
		}


	}


	_handleInputChange(name) {
		switch (name) {
			case 'username':
				this.setState({
					usernameError: ""
				});
				break;
			case 'email':
				this.setState({
					emailError: ""
				});
				break;
			case 'name':
				this.setState({
					nameError: ""
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

	componentWillReceiveProps(nextProps) {
		let {
			reg_error,
			login_user
		} = nextProps;
		if (login_user !== undefined && login_user.token !== undefined) {
			browserHistory.push('/')
		}
		this.setState({
			emailError: !reg_error.email ? '' : reg_error.email.join(' '),
			nameError: !reg_error.name ? '' : reg_error.name.join(' '),
			usernameError: !reg_error.username ? '' : reg_error.username.join(' '),
			passwordError: !reg_error.password ? '' : reg_error.password.join(' ')
		})
	}

	render() {
		return (
			<div>
			<Paper zDepth={2} style={styles.login}>
			  <TextField
			      hintText="只允许数字、大小写字母和下划线"
			      floatingLabelText="登录名"
			      fullWidth={true}
			      ref="username"
			      key="username"
			      errorText={this.state.usernameError}
			      style={styles.textField}
			      onChange={this._handleInputChange.bind(this, 'username')}
			    />
			    <br />
			  <TextField
			      hintText="example@126.com"
			      floatingLabelText="邮箱"
			      fullWidth={true}
			      ref="email"
			      key="email"
			      errorText={this.state.emailError}
			      style={styles.textField}
			      onChange={this._handleInputChange.bind(this, 'email')}
			    />
			    <br />
			  <TextField
			      hintText="用户名"
			      floatingLabelText="用户名"
			      fullWidth={true}
			      ref="name"
			      key="name"
			      errorText={this.state.nameError}
			      style={styles.textField}
			      onChange={this._handleInputChange.bind(this, 'name')}
			    />
			    <br />
			  <TextField
			      hintText="密码"
			      floatingLabelText="密码"
			      fullWidth={true}
			      type='password'
			      ref='password'
			      key="password"
			      errorText={this.state.passwordError}
			      style={styles.textField}
			      onChange={this._handleInputChange.bind(this, 'password')}
			    />
			    <br />
			    <RaisedButton label="注册" onMouseDown={this.submitFrom.bind(this)} primary={true} style={styles.button} />
			    <Link style={styles.enterlink} to="/login">已有帐号！</Link>
		   </Paper>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		reg_error: state.login.reg_error,
		login_user: state.login.login_user
	}
}

function mapDispatchToProps(dispatch) {
	return {
		register: (username, email, name, password) => {
			dispatch(register(username, email, name, password))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);