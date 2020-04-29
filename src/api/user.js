import { createAPI } from '../utils/request';

// 登录
export const apiLogin = data => createAPI('/user/login', 'post', data)