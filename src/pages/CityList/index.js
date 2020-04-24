import React, { Component } from 'react';
import { apiAreaList, apiHotCity } from '../../api/city';
import { getCurrCity } from '../../utils/fixcity';
import { List, AutoSizer } from 'react-virtualized';
import { NavBar, Icon } from 'antd-mobile';
import './index.scss'
class index extends Component {
  // 设置状态数据
  state = {
    // 归类的城市数据
    cityList: {},
    // 归类的城市数据的索引
    cityIndex: []
  }
  componentDidMount() {
    this.getCityList()
  }
  // 列表布局
  rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) => {
    // 获取处理完的状态数据
    const { cityList, cityIndex } = this.state;
    // console.log(cityList, cityIndex);
    // 对象的键
    let letter = cityIndex[index];
    // console.log(index,letter)
    let item = cityList[letter]
    return (
      <div key={key} style={style} className="city-item">
        <div className="title">{this.formatLetter(letter)}</div>
        {/* <div className="name">{item.label}</div> */}
        {item.map(item => (<div key={item.value} className="title">{item.label}</div>))}
      </div>
    );
  }

  // 格式化列表的title
  formatLetter = (letter) => {
    // console.log(letter);
    switch (letter) {
      case '#':
        return '当前城市';
      case 'hot':
        return '热门城市';
      default:
        // 处理成大写
        return letter.toUpperCase()
    }
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
    // 响应式
    this.setState({
      cityList: cityList,
      cityIndex: cityIndex
    })
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
      <div className="navbar">
        {/* 导航返回 */}
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
        >
          城市选择
        </NavBar>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              rowCount={this.state.cityIndex.length}
              rowHeight={120}
              rowRenderer={this.rowRenderer}
              width={width}
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}

export default index;