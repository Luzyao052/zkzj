import React from 'react'

import { Toast } from 'antd-mobile'
import Filter from './components/Filter'
// 导入样式
import styles from './index.module.css'
import { apiHouseList } from '../../api/house'
import { getCurrCity } from '../../utils/fixcity'
import { AutoSizer, List, InfiniteLoader } from 'react-virtualized'
import { BASE_URL } from '../../utils/request'
import HouseItem from '../../components/HouseItem'
import NoHouse from '../../components/NoHouse'
export default class HouseList extends React.Component {
  state = {
    list: [], // 房屋列表数据
    count: 0
  }

  async componentDidMount() {
    const { value } = await getCurrCity()
    this.cityId = value;
    // 初始化调用一次
    this.onFilter()
  }

  // 设置回调，接收数据 
  onFilter = async (data) => {
    this.data = data
    // console.log(data);
    let dataObj = {
      cityId: this.cityId,
      ...data,
      start: 1,
      end: 20
    }
    const { body: { list, count } } = await apiHouseList(dataObj)
    // console.log(list);
    // 有数据的提示
    if (count !== 0) {
      Toast.success(`获取到${count}条房源数据！`, 1)
    }
    this.setState({
      list,
      count
    })
  }

  // 渲染列表项方法
  renderHouseItem = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) => {
    // 获取一下数据
    const { list } = this.state
    // 获取当前列表项数据
    const item = list[index]
    // console.log(item);
    // 处理暂时没有加载到数据情况
    if (!item) return null;
    // 数据item没有的时候
    if (!item) {
      return (
        <div style={style} key={key}>
          <p className={styles.loading}></p>
        </div>
      )
    }
    item.src = `${BASE_URL}${item.houseImg}`
    return (
      <HouseItem onClick={() => {
        // h5 history模式路径传参，在this.props.location.state可以拿到
        // 如果哈希模式使用这种格式传参，会接受到undefined
        this.props.history.push('/detail/' + item.houseCode, { id: item.houseCode, a: 10 })
        // hash模式的路径传参 在this.props.location.state可以拿到
        // this.props.history.push({ pathname: '/detail/' + item.houseCode, state: { id: item.houseCode, a: 10 } })
      }} {...item} key={key} style={style} />
    );
  }
  // 下拉加载更多
  // 判断当前行是否加载完成
  isRowLoaded = ({ index }) => {
    return !!this.state.list[index];
    // console.log(index);
  }
  // 加载更多
  loadMoreRows = ({ startIndex, stopIndex }) => {
    let dataObj = {
      cityId: this.cityId,
      ...this.data,
      start: startIndex,
      end: stopIndex
    }
    return apiHouseList(dataObj)
      .then(res => {
        // Store response data in list...
        // console.log(res);
        this.setState({
          list: [...this.state.list, ...res.body.list]
        })
      })
  }

  // 渲染列表
  renderHouseList = () => {
    return this.state.count > 0 ? <InfiniteLoader
      isRowLoaded={this.isRowLoaded}
      loadMoreRows={this.loadMoreRows}
      // 远程数据总条数
      rowCount={this.state.count}
    >
      {({ onRowsRendered, registerChild }) => (
        <AutoSizer>
          {({ height, width }) => (
            <List
              className={styles.houseList}
              height={height}
              onRowsRendered={onRowsRendered}
              ref={registerChild}
              rowCount={this.state.list.length}
              rowHeight={130}
              rowRenderer={this.renderHouseItem}
              width={width}
            />
          )}
        </AutoSizer>
      )}
    </InfiniteLoader> : <NoHouse>暂无房源数据</NoHouse>
  }
  render() {
    return (
      <div className={styles.root}>
        {/* 条件筛选栏 */}
        <Filter onFilter={this.onFilter} />
        {/* 列表 */}

        {this.renderHouseList()}

      </div>
    )
  }
}
