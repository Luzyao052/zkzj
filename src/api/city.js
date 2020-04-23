import { createAPI } from '../utils/request';

// 根据城市名称查询该城市信息
export const apiAreaInfo = data => createAPI('/area/info', 'get', data)

// 获取城市列表数据
export const apiAreaList = data => createAPI('/area/city', 'get', data)

// 获取热门城市
export const apiHotCity = data => createAPI('/area/hot', 'get', data)