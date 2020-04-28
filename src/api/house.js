import { createAPI } from '../utils/request';

// 获取房屋查询条件
export const apiHouseCondition = data => createAPI('/houses/condition', 'get', data)

// 根据条件查询房屋
export const apiHouseList = data => createAPI('/houses', 'get', data)

// 获取房屋详情
export const apiDetail = data => createAPI(`/houses/${data}`, 'get')