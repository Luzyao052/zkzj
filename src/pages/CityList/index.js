import React, { Component } from 'react';
import { apiAreaList, apiHotCity } from '../../api/city';
import { getCurrCity, KEY, setLocal } from '../../utils/fixcity';
import { List, AutoSizer } from 'react-virtualized';
import { NavBar, Icon, Toast } from 'antd-mobile';
import './index.scss'
class index extends Component {
  // 设置状态数据
  state = {
    // 归类的城市数据
    cityList: {},
    // 归类的城市数据的索引
    cityIndex: [],
    activeIndex: 0 // 列表右侧选中的下标
  }
  componentDidMount() {
    this.getCityList()
    // 创建ref
    // this.listRef = React.createRef();
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
        {item.map(item => (<div onClick={() => this.changeCity(item)} key={item.value} className="name">{item.label}</div>))}
      </div>
    );
  }

  // 格式化列表的title
  formatLetter = (letter, isRight) => {
    // console.log(letter);
    switch (letter) {
      case '#':
        return isRight ? '当' : '当前城市';
      case 'hot':
        return isRight ? '热' : '热门城市';
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
  // 动态计算高度
  excueHeight = ({ index }) => {
    const { cityList, cityIndex } = this.state
    let letter = cityIndex[index]
    return 36 + 50 * cityList[letter].length
  }
  // 切换城市
  changeCity = (info) => {
    // console.log(info);
    const hasData = ['北京', '上海', '广州', '深圳'];
    if (hasData.includes(info.label)) {
      // 更新当前城市数据
      setLocal(KEY, JSON.stringify(info))
      // 跳转到首页
      this.props.history.push('/')
    } else {
      Toast.info('该城市暂无房源数据！')
    }
  }
  // 点击渲染右侧索引
  renderCityIndex = () => {
    const { cityIndex, activeIndex } = this.state;
    return cityIndex.map((item, index) => {
      return (
        <li
          key={item}
          className="city-index-item"
          onClick={() => {
            // console.log(this.listRef.scrollToRow);
            this.listRef.scrollToRow(index)
            this.setState({
              activeIndex: index
            })
          }}
        >
          <span className={activeIndex === index ? 'index-active' : ''}>
            {this.formatLetter(item, true)}
          </span>
        </li>
      )
    })
  }
  // 滑动渲染右侧索引
  onRowsRendered = ({ startIndex }) => {
    if (this.state.activeIndex !== startIndex) {
      // console.log(startIndex);
      // startIndex 当前滚动行的索引
      this.setState({
        activeIndex: startIndex
      })
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
              ref={(e) => this.listRef = e}
              scrollToAlignment='start'
              onRowsRendered={this.onRowsRendered}
              height={height}
              rowCount={this.state.cityIndex.length}
              rowHeight={this.excueHeight}
              rowRenderer={this.rowRenderer}
              width={width}
            />
          )}
        </AutoSizer>
        {/* 右侧索引列表 */}
        <ul className="city-index">
          {this.renderCityIndex()}
        </ul>
      </div>
    );
  }
}

export default index;