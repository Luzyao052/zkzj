import { createAPI } from '../utils/request';

// 获取房屋查询条件
export const apiHouseCondition = data => createAPI('/houses/condition', 'get', data)