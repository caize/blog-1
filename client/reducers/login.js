import {
	LOGOUT,
	LOGIN_ERROR,
	LOGIN_USER,
	REG_ERROR
} from "../constants/types";

const initialState = {
	login_user: {},
	login_error: {},
	reg_error: {}
}

export default function loginReducer(state = initialState, action) {
	switch (action.type) {
		case LOGIN_USER:
			return Object.assign({}, state, {
				login_user: action.payload.user
			});
		case LOGIN_ERROR:
			return Object.assign({}, state, {
				login_error: action.payload.error
			});
		case LOGOUT:
			return Object.assign({}, state, {
				login_user: action.payload.login_user
			});
		case REG_ERROR:
			return Object.assign({}, state, {
				reg_error: action.payload.errors
			});
		default:
			return state;

	}
}