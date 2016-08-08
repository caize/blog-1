import {
	token
} from './auth';

import fetch from "isomorphic-fetch";

// restful url
export const DOMAIN_EX = process.env.NODE_ENV === "production" ? "http://api.zero-to-one.cn" : "http://localhost:3000";
const DOMAIN = process.env.NODE_ENV === "production" ? "http://api.zero-to-one.cn" : "http://localhost:3000";

const URL = "/v1/";
const MAIN = DOMAIN + URL;

// *** 用户登录或注册 start *** //
// 登录
export const LOGIN_URL = MAIN + "sessions";

// token 登录
export const AUTHEN_URL = MAIN + "sessions/token";

// 用户注册
export const REGISTER_URL = MAIN + "users";

// *** 用户登录或注册 end *** //

// ***  话题操作 start *** //

// 话题列表 get  创建话题 post
export const TOPICS = MAIN + "articles";

// 单个话题
export const TOPIC = MAIN + "articles";

//get 话题列表 /articles
//post 创建话题 /articles
//put/patch 更新话题 /articles/:id
//delete 删除话题 /articles/:id
//get 单个话题 /articles/:id


// ***  话题操作 end *** //


// ***  分类操作 start restful url *** //

// 分类列表 get 创建分类 post
export const NODES = MAIN + "nodes";

// ***  分类操作 end *** //


// *** 上传图片 start *** //
export const IMAGES = MAIN + "images";
// *** 上传图片 end *** //


function headers() {
	return new Headers({
		'Content-Type': 'application/json; charset=utf-8',
		Accept: 'application/json',
		Authorization: `Token token=${token}`
	});
}

export function http_get_request(url) {
	return fetch(url, {
		method: 'GET',
		headers: headers()
	}).then(response => response.json())
}

export function http_post_request(url, params) {
	return fetch(url, {
			method: 'POST',
			headers: headers(),
			body: params
		})
		.then(response => response.json())
}

export function http_put_request(url, params) {
	return fetch(url, {
		method: 'PUT',
		headers: headers(),
		body: params
	}).then(response => response.json())
}

export function http_delete_request(url) {
	return fetch(url, {
		method: 'DELETE',
		headers: headers()
	}).then(response => response.json())
}