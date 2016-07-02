import React, {
	Component
} from 'react';

import {
	connect
} from 'react-redux';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import {
	browserHistory
} from 'react-router';

import {
	login,
	loginError
} from '../actions/login';

import Error from '../common/Error';


const styles = {
	login: {
		margin: '0 auto',
		padding: 20,
		marginTop: 5,
		maxWidth: 480,
		minWidth: 320
	},
	button: {
		marginTop: 20,
		flexDirection: 'end'
	},
	textField: {
		display: 'block',
		width: '100%',
		marginTop: -10
	},
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
				loginError: "登录名不能为空"
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
			<Paper zDepth={2} style={styles.login}>
			  <TextField
			      hintText="邮箱或用户名"
			      floatingLabelText="登录名"
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
			    <Error error={this.props.login_error.error} time={this.props.login_error.time} />
		   </Paper>
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