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
export default class Filter extends Component {
  state = {
    titleSelectedStatus, // 高亮
    // 打开当前type状态
    openType: ''
  }
  componentDidMount() {
    this.getFilterData()
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
  onOk = () => {
    this.setState({
      openType: ''
    })
  }
  // 关闭前三个筛选器内容和遮罩层
  onCancel = () => {
    this.setState({
      openType: ''
    })
  }

  // 获取房屋查询条件
  getFilterData = async () => {
    const { value } = await getCurrCity()
    const res = await apiHouseCondition({ id: value })
    console.log(res);
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
            this.isShowPicker() ? <FilterPicker onOk={this.onOk} onCancel={this.onCancel} /> : null
          }


          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}
