import fetch from "isomorphic-fetch";
import {
	token
} from "../constants/auth";
import {
	LOGOUT,
	LOGIN_ERROR,
	LOGIN_USER,
	REG_ERROR
} from "../constants/types";
import {
	LOGIN_URL,
	AUTHEN_URL,
	REGISTER_URL,
	http_get_request,
	http_post_request,
	http_put_request,
	http_delete_request
} from '../constants/address';

// 如果cookies中有登录信息从cookies中直接登录
export function getAuth() {
	return function(dispatch, getState) {
		let state = getState();
		if (state.login.login_user.token) {
			return function() {};
		}
		if (!token) {
			dispatch(logout())
		}
		return http_post_request(AUTHEN_URL, {}).then((json) => {
			if (typeof(json["error"]) !== 'undefined') {
				dispatch(logout())
			} else {
				dispatch(receiveUser(json["user"]))
				dispatch(loginError({}))
			}
		})
	}

}


// 登录并且得到用户信息
export function login(login, password) {
	return function(dispatch) {
		let body = JSON.stringify({
			session: {
				login: login,
				password: password
			}
		});
		return http_post_request(LOGIN_URL, body).then((json) => {
			if (typeof(json["error"]) !== 'undefined') {
				dispatch(loginError(json))
				dispatch(logout())
			} else {
				dispatch(receiveUser(json["user"]))
				dispatch(loginError({}))
			}
		})
	}
}


// 注册用户
export function register(username, email, name, password) {
	return function(dispatch) {
		let body = JSON.stringify({
			user: {
				username: username,
				email: email,
				name: name,
				password: password
			}
		});
		return http_post_request(REGISTER_URL, body).then((json) => {
			if (typeof(json["errors"]) !== 'undefined') {
				dispatch(regError(json["errors"]))
				dispatch(logout())
			} else {
				dispatch(receiveUser(json["user"]))
				dispatch(regError({}))
			}
		})
	}
}

// 登录用户信息
export function receiveUser(user) {
	return {
		type: LOGIN_USER,
		payload: {
			user
		}
	}
}


// 登录错误
export function loginError(error) {
	return {
		type: LOGIN_ERROR,
		payload: {
			error
		}
	}
}

// 注册错误
export function regError(errors) {
	return {
		type: REG_ERROR,
		payload: {
			errors
		}
	}
}


// 登出事件
export function logout() {
	return {
		type: LOGOUT,
		payload: {
			user: {}
		}
	}
}

// 判断是否登录