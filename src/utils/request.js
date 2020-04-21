import axios from 'axios'
import { Toast } from 'antd-mobile';
const BASE_URL = 'https://api-haoke-web.itheima.net'
var instance = axios.create({
  baseURL: BASE_URL
});
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  Toast.loading('加载中...', 0);
  // 在发送请求之前做些什么
  // console.log(config);
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  Toast.hide()
  // console.log(response);
  try {
    // data.data如果报错，没有获得到，错误信息会被catch步骤，就走data了
    return response.data
  } catch (err) {
    return response
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

// ES6模块化 导出一个函数，名称为 createAPI
export const createAPI = (url, method, data) => {
  const config = {}
  if (method === 'get') {
    config.params = data
  } else {
    config.data = data
  }
  return instance({
    url,
    method,
    ...config
  })
}

// 对外导出axios对象
export default instance