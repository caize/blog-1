import {
	LOGOUT,
	LOGIN_USER
} from "./constants/types";

export function authenticationMiddleware() {
	return next => action => {
		next(action);
		if (action.type === LOGIN_USER || action.type === LOGOUT) {
			localStorage.setItem('token', action.payload.user.token);
		}

	};
}