import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'
import styles from './index.module.css'
import { apiHouseCondition } from '../../../../api/house'
import { getCurrCity } from '../../../../utils/fixcity'
// 标题高亮状态(默认值)
const titleSelectedStatus = {
  area: false,
  mode: false,
  price: false,
  more: false
}
// 选中数据维护(测试)
const selectedValues = {
  area: ['area', 'null'],
  // area: ['area', 'AREA|69cc5f6d-4f29-a77c', 'AREA|73aa1890-64c7-51d9'],
  mode: ['null'],
  // mode: ['true'],
  price: ['null'],
  // price: ['PRICE|1000'],
  more: []
}
export default class Filter extends Component {
  state = {
    titleSelectedStatus, // 高亮
    // 打开当前type状态
    openType: ''
  }
  componentDidMount() {
    this.getFilterData()
    // 初始化：存储到实例属性上
    this.selectedValues = { ...selectedValues }
  }
  // 传给子组件使用的高亮
  onHighLight = (info) => {
    // console.log(info);
    let newHighLight = { ...titleSelectedStatus, [info]: true }
    this.setState({
      titleSelectedStatus: newHighLight,
      openType: info
    })
  }
  // 是否显示前三个过滤器的内容=》picker
  isShowPicker = () => {
    const { openType } = this.state;
    return openType === 'area' || openType === 'mode' || openType === 'price'
  }
  // 确定选择过滤条件
  onOk = (curSel) => {
    const { openType } = this.state;
    // 存储当前选中筛选数据
    this.selectedValues[openType] = curSel
    // console.log('接收到的子组件传来的数据：', curSel, this.selectedValues);
    this.setState({
      openType: '',
      // 处理高亮
      titleSelectedStatus: this.handlerSel()
    }, () => {
      this.props.onFilter(this.formatFilters(this.selectedValues))
    })
  }
  // 关闭前三个筛选器内容和遮罩层
  onCancel = () => {
    this.setState({
      openType: '',
      // 处理高亮
      titleSelectedStatus: this.handlerSel()
    })
  }

  // 获取房屋查询条件
  getFilterData = async () => {
    const { value } = await getCurrCity()
    const res = await apiHouseCondition({ id: value })
    // console.log(res);
    // 把组件筛选数据存放到组件实例的成员属性上
    this.filterData = res.body;
  }
  // 渲染picker并提供对应的数据
  renderPicker = () => {
    if (this.isShowPicker()) {
      const { area, subway, rentType, price } = this.filterData
      const { openType } = this.state;
      // 传递对应的picker数据
      let data, cols = 1;
      // 当前选中的值
      let curSel = this.selectedValues[openType];
      // 根据openType去取当前点击的picker数据
      switch (openType) {
        case 'area':
          data = [area, subway]
          cols = 3;
          break;
        case 'mode':
          data = rentType
          break;
        case 'price':
          data = price
          break;
        default:
          break;
      }
      return <FilterPicker data={data} key={openType} cols={cols} curSel={curSel} onOk={this.onOk} onCancel={this.onCancel} />
    }
  }
  // 处理筛选器选中后有无条件的高亮状态
  handlerSel = () => {
    // 存储新的高亮状态
    const newStatus = { ...titleSelectedStatus }
    // 遍历存储的选中数据，确定是否高亮
    Object.keys(this.selectedValues).forEach(key => {
      // 获取当前选中的值
      var selectVal = this.selectedValues[key]
      // console.log(selectVal);
      // 判断是否高亮
      if (key === 'area' && (selectVal[1] !== 'null' || selectVal[0] === 'subway')) {
        newStatus[key] = true
      } else if (key === 'mode' && selectVal[0] !== 'null') {
        newStatus[key] = true
      } else if (key === 'price' && selectVal[0] !== 'null') {
        newStatus[key] = true
      } else if (key === 'more' && selectVal.length > 0) {
        newStatus[key] = true
      } else {
        newStatus[key] = false
      }
    })
    return newStatus;
  }
  // 渲染第四个筛选器
  renderFilterMore = () => {
    if (this.state.openType === 'more') {
      const { oriented, floor, roomType, characteristic } = this.filterData
      // 数据通过父传子渲染
      const data = { oriented, floor, roomType, characteristic }
      return (
        <FilterMore value={this.selectedValues[this.state.openType]} data={data} onOk={this.onOk} onCancel={this.onCancel} />
      )
    }
  }
  // 点击确认后处理所有筛选器数据 =》 后台同学需要的格式
  formatFilters = (val) => {
    // console.log(val);
    // 获取存储的筛选条件数据
    const { area, mode, price, more } = val;
    const filters = {}
    // 区域下边：区域 ｜ 地铁
    let areaKey = area[0]
    if (area.length === 2) {
      filters[areaKey] = area[1]
    } else {
      if (area[2] === 'null') {
        filters[areaKey] = area[1]
      } else {
        filters[areaKey] = area[2]
      }
    }
    // filters[areaKey] = filters.area
    // 出租方式 价格
    filters.rentType = mode[0]
    filters.price = price[0]
    // 更多
    filters.more = more.join(',')
    // console.log(filters);
    return filters
  }
  render() {
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {this.isShowPicker() ? <div onClick={this.onCancel} className={styles.mask} /> : null}

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle onHighLight={this.onHighLight} titleSelectedStatus={this.state.titleSelectedStatus} />

          {/* 前三个菜单对应的内容： */}
          {
            // 渲染picker并提供对应的数据
            this.renderPicker()
          }


          {/* 最后一个菜单对应的内容： */}
          {this.renderFilterMore()}
        </div>
      </div>
    )
  }
}
