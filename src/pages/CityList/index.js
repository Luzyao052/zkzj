import React, { Component } from 'react';
import { apiAreaList, apiHotCity } from '../../api/city';
import { getCurrCity } from '../../utils/fixcity';

class index extends Component {

  componentDidMount() {
    this.getCityList()
  }
  // 获取城市列表
  getCityList = async () => {
    const res = await apiAreaList({ level: 1 })
    let { cityList, cityIndex } = this.formatCities(res.body)
    // 获取热门城市
    const info = await apiHotCity()
    cityList['hot'] = info.body
    cityIndex.unshift('hot')
    // 加入当前定位的城市
    const results = await getCurrCity()
    cityList['#'] = [results]
    cityIndex.unshift('#')
    // console.log(cityList, cityIndex);
  }
  // 格式化数据-数据处理
  formatCities = (data) => {
    let cityList = {}, cityIndex
    data.forEach(item => {
      // 截取首字母
      let foo = item.short.slice(0, 1);
      // 判断存不存在当前首字母开头的键
      if (!cityList[foo]) {
        // 如果没有
        cityList[foo] = [item]
      } else {
        cityList[foo].push(item)
      }
    })
    cityIndex = Object.keys(cityList).sort()
    // console.log(cityIndex);
    return {
      cityList,
      cityIndex
    }
  }
  render() {
    return (
      <div>
        CityList
      </div>
    );
  }
}

export default index;