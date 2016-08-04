import fetch from "isomorphic-fetch";
import {
	TOPIC_INDEX,
	TOPIC_CREATE,
	TOPIC_DELETE,
	TOPIC_UPDATE,
	TOPIC_SHOW,
	TOPIC_FETCHING
} from "../constants/types";
import {
	TOPICS,
	TOPIC
} from '../constants/address';

import {
	addTopicToNode,
	updateTopicToNode
} from './node';


// 得到文章列表
export function fetchTopics() {
	let token = localStorage.getItem('token');
	return function(dispatch) {
		dispatch(isFetching());
		return fetch(TOPICS, {
				method: 'get',
				headers: new Headers({
					'Content-Type': 'application/json; charset=utf-8',
					Accept: 'application/json',
					Authorization: `Token token=${token}`
				})
			}).then(response => response.json())
			.then((json) => {
				dispatch(receiveTopics(json));
			})
	}
}

// 查看单个文章
export function fetchTopic(id) {
	let token = localStorage.getItem('token');
	return function(dispatch, getState) {
		let state = getState();
		let topic = {};
		if (state.topics.articles.length > 0) {
			topic["article"] = state.topics.articles.find((val) => {
				return val.id.toString() === id.toString()
			})
		}
		if (topic.article !== undefined) {
			return dispatch(receiveTopic(topic));
		} else {
			dispatch(isFetching());
			return fetch(`${TOPIC}/${id}`, {
					method: 'get',
					headers: new Headers({
						'Content-Type': 'application/json; charset=utf-8',
						Accept: 'application/json',
						Authorization: `Token token=${token}`
					})
				}).then(response => response.json())
				.then((json) => {
					if (json.error === undefined) {
						dispatch(receiveTopic(json))
					} else {

						////////  处理错误 代写
					}
				})
		}
	}
}

// 新建文章
export function postTopic(topic) {
	let token = localStorage.getItem('token');
	return dispatch => {
		dispatch(isFetching());
		return fetch(TOPICS, {
			method: 'post',
			headers: new Headers({
				'Content-Type': 'application/json; charset=utf-8',
				Accept: 'application/json',
				Authorization: `Token token=${token}`
			}),
			body: JSON.stringify({
				article: topic
			})
		})
		.then(response => response.json())
		.then((json) => {
			if(!json.errors) {
				dispatch(addTopic(json));
				dispatch(addTopicToNode(json["article"]["node_id"], json["article"]));
			}else{
				console.log("dddddddd-------------")
			}
		})
	}
}

// 更新文章
export function putTopic(id, topic) {
	let node_id = topic["old_node_id"];
	delete topic["old_node_id"]
	console.log("putTopic", topic);
	// node_id 原来的分类，topic.node_id 是要更新的分类
	let token = localStorage.getItem('token');
	return dispatch => {
		dispatch(isFetching());
		return fetch(`${TOPIC}/${id}`, {
			method: 'put',
			headers: new Headers({
				'Content-Type': 'application/json; charset=utf-8',
				Accept: 'application/json',
				Authorization: `Token token=${token}`
			}),
			body: JSON.stringify({
				article: topic
			})
		})
		.then(response => response.json())
		.then((json) => {
			if(!json.errors) {
				//更新单个文章
				dispatch(updateTopic(node_id, json));
				dispatch(updateTopicToNode(node_id, json["article"]));
			}else{
				console.log("dddddddd-------------")
			}
		})
	}
}


// 传送文章列表
export function receiveTopics(topics) {
	return {
		type: TOPIC_INDEX,
		payload: {
			articles: topics["articles"],
			meta: topics["meta"]
		}
	}
}

// 传送单个文章
export function receiveTopic(topic) {
	return {
		type: TOPIC_SHOW,
		payload: {
			article: topic["article"]
		}
	}
}

// 添加一个文章
export function addTopic(topic) {
	return {
		type: TOPIC_CREATE,
		payload: {
			article: topic['article']
		}
	}
}

// 更改单个文章
export function updateTopic(old_node, topic) {
	return {
		type: "update_topic",
		payload: {
			old_node: old_node,
			article: topic["article"]
		}
	}
}

export function isFetching() {
		return {
			type: TOPIC_FETCHING
		}
}

export function isSucc(status) {
	return {
		type: "is_success",
		payload: {
			status: status
		}
	}
}
