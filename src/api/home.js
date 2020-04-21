import { createAPI } from '../utils/request';

// 轮播图
export const apiSwiper = data => createAPI('/home/swiper', 'get', data)