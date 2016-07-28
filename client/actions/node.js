import fetch from "isomorphic-fetch";
import {
	NODE_INDEX,
	NODE_CREATE,
	NODE_DELETE,
	NODE_UPDATE,
	NODE_SHOW,
	PUSH_NODE,
	REQUEST_NODES,
	UPDATE_NODE,
	REMOVE_NODE,
	NODE_ERROR,
	NODE_SUCCESS,
	FETCH_NODE_ERROR
} from "../constants/types";
import {
	NODES,
	NODE
} from '../constants/address';

// 得到分类列表
export function fetchNodes(page = 0) {
	let token = localStorage.getItem('token');
	return (dispatch, getState) => {
		let state = getState();
		if (state.nodes.nodes.length > 0) {
			return {};
		} else {
			dispatch(requestNodes());
			return fetch(NODES + `?page=${page}`, {
					method: 'get',
					headers: new Headers({
						'Content-Type': 'application/json; charset=utf-8',
						Accept: 'application/json',
						Authorization: `Token token=${token}`
					})
				})
				.then(response => response.json())
				.then((json) => {
					dispatch(receiveNodes(json))
				});
		}
	}
}

// 创建分类
export function postNode(title, summary, imageId) {
	let token = localStorage.getItem('token');
	return function(dispatch) {
		return fetch(NODES, {
				method: 'post',
				headers: new Headers({
					'Content-Type': 'application/json; charset=utf-8',
					Accept: 'application/json',
					Authorization: `Token token=${token}`
				}),
				body: JSON.stringify({
					node: {
						title: title,
						summary: summary,
						image_id: imageId
					}
				})
			})
			.then(response => response.json())
			.then((json) => {
				console.log('postNode json init', json)
				if (typeof(json["errors"]) !== 'undefined') {
					dispatch(nodeError(json["errors"]))
				} else {
					dispatch(pushNode(json));
					dispatch(nodeError({}));
					dispatch(nodeSuccess('success'));
				}
			})
	}
}

// 更新分类
export function putNode(id, title, summary, imageId) {
	let token = localStorage.getItem('token');
	return function(dispatch) {
		return fetch((NODES + `/${id}`), {
				method: 'put',
				headers: new Headers({
					'Content-Type': 'application/json; charset=utf-8',
					Accept: 'application/json',
					Authorization: `Token token=${token}`
				}),
				body: JSON.stringify({
					node: {
						title: title,
						summary: summary,
						image_id: imageId
					}
				})
			})
			.then(response => response.json())
			.then((json) => {
				console.log('updateNode json init', json)
				if (typeof(json["errors"]) !== 'undefined') {
					dispatch(nodeError(json["errors"]));
				} else {
					dispatch(updateNode(json));
					dispatch(nodeError({}));
					dispatch(nodeSuccess('success'));
				}
			})
	}
}

// 删除分类
export function deleteNode(id) {
	let token = localStorage.getItem('token');
	return function(dispatch) {
		return fetch((NODES + `/${id}`), {
				method: 'delete',
				headers: new Headers({
					'Content-Type': 'application/json; charset=utf-8',
					Accept: 'application/json',
					Authorization: `Token token=${token}`
				})
			})
			.then(response => response.json())
			.then((json) => {
				console.log('deleteNode json init', json)
				if (typeof(json["error"]) !== 'undefined') {
					console.log("deleteNode json", json);
				} else {
					dispatch(removeNode(json))
				}
			})
	}
}

// 得到一个分类
export function fetchNode(id) {
	let token = localStorage.getItem('token');
	return function(dispatch, getState) {
		dispatch(requestNodes())
		let state = getState();
		let node = {};
		if (state.nodes.nodes.length > 0) {
			node["node"] = state.nodes.nodes.find((val) => {
				return val.id.toString() === id.toString()
			})
		}
		if (node.node !== undefined) {
			return dispatch(receiveNode(node));
		} else {
			return fetch(`${NODES}/${id}`, {
					method: 'get',
					headers: new Headers({
						'Content-Type': 'application/json; charset=utf-8',
						Accept: 'application/json',
						Authorization: `Token token=${token}`
					})
				}).then(response => response.json())
				.then((json) => {
					console.log("json", json)
					if (json.error !== "Not Found") {
						dispatch(receiveNode(json));
					} else {
						dispatch(fetchNodeError("没有找到"));
						////////  处理错误 代写
					}
				})
		}
	}
}

// 请求一个分类返回错误处理
export function fetchNodeError(error) {
	return {
		type: FETCH_NODE_ERROR,
		payload: {
			fetch_node_error: error
		}
	}
}

// 传送分类列表
export function receiveNodes(json) {
	return {
		type: NODE_INDEX,
		payload: {
			nodes: json["nodes"]
		}
	}
}

// 传送单个分类
export function receiveNode(json) {
	return {
		type: NODE_SHOW,
		payload: {
			node: json['node']
		}
	}
}

// 添加到分类列表中
export function pushNode(node) {
	return {
		type: PUSH_NODE,
		payload: {
			node: node
		}
	}
}

// 更新分类列表中的分类
export function updateNode(node) {
	return {
		type: UPDATE_NODE,
		payload: {
			node: node
		}
	}
}

// 去除分类列表中的分类
export function removeNode(node) {
	return {
		type: REMOVE_NODE,
		payload: {
			node: node
		}
	}
}

export function requestNodes() {
	return {
		type: REQUEST_NODES
	}
}

// 更新或创建成功
export function nodeSuccess(status) {
	return {
		type: NODE_SUCCESS,
		payload: {
			node_success: status
		}
	}
}

// 分类存储错误提示
export function nodeError(errors) {
	return {
		type: NODE_ERROR,
		payload: {
			errors
		}
	}
}

// 添加一篇文章
export function addTopicToNode(id, article) {
	console.log("id, article", id);
	return {
		type: "add_topic_to_node",
		payload: {
			id: id,
			article: article
		}
	}
}
