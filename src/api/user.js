import { createAPI } from '../utils/request';

// 登录
export const apiLogin = data => createAPI('/user/login', 'post', data)

// 获取用户信息
export const apiGetUserInfo = data => createAPI('/user', 'get', data)

// 退出登录
export const apiLogout = data => createAPI('/user/logout', 'post', data)