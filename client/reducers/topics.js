import {
	TOPIC_INDEX,
	TOPIC_CREATE,
	TOPIC_DELETE,
	TOPIC_UPDATE,
	TOPIC_SHOW,
	TOPIC_FETCHING
} from "../constants/types";

const initialState = {
	isFetching: false,
	articles: [],
	meta: {},
	article: {},
	isSuccess: ""
}

export default function topicsReducer(state = initialState, action) {
	switch (action.type) {
		case TOPIC_FETCHING:
			return Object.assign({}, state, {
				isFetching: true,
			});
		case TOPIC_INDEX:
			return Object.assign({}, state, {
				isFetching: false,
				articles: action.payload.articles,
				meta: action.payload.meta
			});
		case TOPIC_SHOW:
			return Object.assign({}, state, {
				isFetching: false,
				article: action.payload.article
			})
		case TOPIC_CREATE:
			return Object.assign({}, state, {
				isFetching: false,
				isSuccess: action.payload.status,
				articles: Array.from(new Set([action.payload.article, ...state.articles]))
			});
		default:
			return state;
	}
}
