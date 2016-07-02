import fetch from "isomorphic-fetch";
import {
	LOGOUT,
	LOGIN_ERROR,
	LOGIN_USER,
	REG_ERROR
} from "../constants/types";
import {
	LOGIN_URL,
	AUTHEN_URL,
	REGISTER_URL
} from '../constants/address';

// 如果cookies中有登录信息从cookies中直接登录
export function getAuth() {
	let token = localStorage.getItem('token');
	return function(dispatch, getState) {
		let state = getState();
		if (state.login.login_user.token) {
			return function() {};
		}
		if (token === null || token === undefined || token === "") {
			dispatch(logout())
		}

		return fetch(AUTHEN_URL, {
				method: 'post',
				headers: new Headers({
					'Content-Type': 'application/json; charset=utf-8',
					Accept: 'application/json',
					Authorization: `Token token=${token}`
				})
			})
			.then(response => response.json())
			.then((json) => {
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
		return fetch(LOGIN_URL, {
				method: 'POST',
				headers: new Headers({
					'Content-Type': 'application/json; charset=utf-8',
					Accept: 'application/json',
				}),
				body: JSON.stringify({
					session: {
						login: login,
						password: password
					}
				})
			})
			.then(response => response.json())
			.then((json) => {
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
		return fetch(REGISTER_URL, {
				method: 'POST',
				headers: new Headers({
					'Content-Type': 'application/json; charset=utf-8',
					Accept: 'application/json',
				}),
				body: JSON.stringify({
					user: {
						username: username,
						email: email,
						name: name,
						password: password
					}
				})
			})
			.then(response => response.json())
			.then((json) => {
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