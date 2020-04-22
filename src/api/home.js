import { createAPI } from '../utils/request';

// 轮播图
export const apiSwiper = data => createAPI('/home/swiper', 'get', data)

// 租房小组
export const apiGroups = data => createAPI('/home/groups', 'get', data || { area: 'AREA|88cff55c-aaa4-e2e0' })

// 咨询
export const apiNews = data => createAPI('/home/news', 'get', data || { area: 'AREA|88cff55c-aaa4-e2e0' })
