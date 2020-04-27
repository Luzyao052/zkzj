import React, { Component } from 'react'

import FilterFooter from '../../../../components/FilterFooter'

import styles from './index.module.css'

export default class FilterMore extends Component {
  // 设置状态数据
  state = {
    // 当前选中的条件数据
    selected: this.props.value
  }
  // 处理选中数据
  hanlderSel(id) {
    const { selected } = this.state
    const newSelected = [...selected]
    // 判断当前在数组中存在=》删除 / 添加
    let index = newSelected.indexOf(id)
    if (index < 0) {
      // 没找到就添加
      newSelected.push(id)
    } else {
      newSelected.splice(index, 1)
    }
    // 更新状态数据
    this.setState({
      selected: newSelected
    })
  }
  // 渲染标签
  renderFilters(data) {
    // 高亮类名： styles.tagActive
    return (
      data.map(item => (<span onClick={() => this.hanlderSel(item.value)}
        key={item.value}
        className={[styles.tag, this.state.selected.includes(item.value) ? styles.tagActive : ''].join(' ')}>{item.label}</span>))
    )
  }

  render() {
    const { oriented, floor, roomType, characteristic } = this.props.data
    return (
      <div className={styles.root}>
        {/* 遮罩层 */}
        <div className={styles.mask} onClick={this.props.onCancel} />

        {/* 条件内容 */}
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderFilters(roomType)}</dd>

            <dt className={styles.dt}>朝向</dt>
            <dd className={styles.dd}>{this.renderFilters(oriented)}</dd>

            <dt className={styles.dt}>楼层</dt>
            <dd className={styles.dd}>{this.renderFilters(floor)}</dd>

            <dt className={styles.dt}>房屋亮点</dt>
            <dd className={styles.dd}>{this.renderFilters(characteristic)}</dd>
          </dl>
        </div>

        {/* 底部按钮 */}
        <FilterFooter className={styles.footer} onOk={() => this.props.onOk(this.state.selected)} onCancel={this.props.onCancel} />
      </div>
    )
  }
}
