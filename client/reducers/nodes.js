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
	REQUEST_NODE,
	NODE_SUCCESS,
	FETCH_NODE_ERROR
} from "../constants/types";

const initializeState = {
	nodes: [],
	isFetching: false,
	node_success: "fail", // 是否创建或者更新成功
	node_error: {}, // 错误是什么
	fetch_node_error: "" // 查看node出错
}

export default function nodesReducer(state = initializeState, action) {
	switch (action.type) {
		case REQUEST_NODES:
			return Object.assign({}, state, {
				isFetching: true
			});
		case NODE_INDEX:
			return Object.assign({}, state, {
				isFetching: false,
				nodes: action.payload.nodes
			});
		case UPDATE_NODE:
				return updateNodeReducer(state, action);
		case PUSH_NODE: //
			return Object.assign({}, state, {
				isRequesting: false,
				nodes: Array.from(new Set([...state.nodes, action.payload.node.node]))
			});
		case NODE_SHOW: // 得到一个分类
			return Object.assign({}, state, {
				isFetching: false,
				node: action.payload.node
			})
		case REMOVE_NODE:
			return removeNodeReducer(state, action);
		case NODE_ERROR: // 存储时是否有错误
			return Object.assign({}, state, {
				node_error: action.payload.errors
			});
		case NODE_SUCCESS: //是否关闭modal
			return Object.assign({}, state, {
				node_success: action.payload.node_success
			});
		case FETCH_NODE_ERROR: // 没有找到对应的分类
			return Object.assign({}, state, {
				isFetching: false,
				fetch_node_error: action.payload.fetch_node_error
			});
		case "add_topic_to_node":
			return fetchNodeToAdd(state, action);
		default:
			return state;
	}
}

function fetchNodeToAdd(state, action) {
	console.log("state  action", state);
	var id = action.payload.id;
	var article = action.payload.article;
	return Object.assign({}, state, {
		isRequesting: false,
		nodes: state.nodes.map(node => {
			if(id === node.id){
				console.log("fetchNodeToAdd", node);
				return Object.assign({}, node, {articles: Array.from(new Set([article, ...node.articles])), articles_count: node.articles_count + 1});
			}
			return node;
		})
	})
}

function updateNodeReducer(state, action) {
	var id = action.payload.node.node.id;
	return Object.assign({}, state, {
		isRequesting: false,
		nodes: state.nodes.map(node => {
			if(id === node.id){
				return Object.assign({}, node, action.payload.node.node);
			}
			return node;
		})
	})
}

function removeNodeReducer(state, action) {
	var id = action.payload.node.node.id;
	var index = state.nodes.findIndex((node) => {
		if(id === node.id) {
			return true;
		}
		return false;
	})
	if(index >= 0) {
		state.nodes.splice(index, 1);
		return Object.assign({}, state, { nodes: Array.from(new Set([...state.nodes])) });
	} else {
		return state;
	}
}
