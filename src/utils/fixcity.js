// 封装定位函数

import { apiAreaInfo } from "../api/city"
const KEY = 'zkzj_city'
// 封装本地存储方法
// 存储本地数据
export const setLocal = (key, val) => localStorage.setItem(key, val)
// 获取本地数据
export const getLocal = key => localStorage.getItem(key)
// 删除本地数据
export const delLocal = key => localStorage.removeItem(key)

export const getCurrCity = () => {
  const currCity = JSON.parse(getLocal(KEY))
  if (!currCity) {
    // 如果本地没有数据
    return new Promise((resolve, reject) => {
      // 这是根据百度地图API获取定位城市名字
      const { BMap } = window
      var myCity = new BMap.LocalCity();
      myCity.get(async (result) => {
        var cityName = result.name.slice(0, 2);
        // console.log("当前定位城市:" + cityName);
        const res = await apiAreaInfo({ name: cityName })
        // console.log(res);
        // 本地存储
        setLocal(KEY, JSON.stringify(res.body))
        resolve(res.body)
      });
    })
  } else {
    return Promise.resolve(currCity)
  }
}