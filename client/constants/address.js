const DOMAIN = "http://localhost:3000"
const URL = "/v1/"
const MAIN = DOMAIN + URL

// 登录
export const LOGIN_URL = MAIN + "sessions"

// token 登录 
export const AUTHEN_URL = MAIN + "sessions/token"

// 用户注册
export const REGISTER_URL = MAIN + "users"