// 封装定位函数

import { apiAreaInfo } from "../api/city"
const KEY = 'zkzj_city'
const LOGIN_TOKEN = 'LOGIN_TOKEN'
// 封装本地存储方法
// 存储本地数据
export const setLocal = (key, val) => window.localStorage.setItem(key, val)
// 获取本地数据
export const getLocal = key => localStorage.getItem(key)
// 删除本地数据
export const delLocal = key => localStorage.removeItem(key)
// 这是根据百度地图API获取定位城市名字
const getCityName = () => {
  return new Promise((resolve, reject) => {
    const { BMap } = window
    var myCity = new BMap.LocalCity();
    myCity.get(async (result) => {
      resolve(result.name) // 邯郸市
    });
  })
}
// 导出一个获取到的城市的方法
export const getCurrCity = async () => {
  const currCity = JSON.parse(getLocal(KEY))
  // 获取到城市名字=》做比对 
  // 同步方式
  let res = await getCityName(); // 邯郸市
  let realName = res.substr(0, 2)// 邯郸
  if (!currCity) {
    // 如果本地没有数据
    return new Promise(async (resolve, reject) => {
      const { body } = await apiAreaInfo({ name: realName })
      // console.log(body);
      // 本地存储
      setLocal(KEY, JSON.stringify(body))
      resolve(body)
    })
  } else {
    return Promise.resolve(currCity)
  }
}
// 储存用户信息
const setUser = (user) => {
  window.localStorage.setItem(LOGIN_TOKEN, JSON.stringify(user))
}
// 获取用户信息
const getUser = () => {
  return JSON.parse(window.localStorage.getItem(LOGIN_TOKEN) || '{}')
}
// 删除用户信息
const delUser = () => {
  window.localStorage.removeItem(LOGIN_TOKEN)
}
const isAuth = () => !!getUser()
// 导出
export default {
  setUser,
  getUser,
  delUser,
  isAuth
}
export { KEY, LOGIN_TOKEN }