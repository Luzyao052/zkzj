// 地图组件
import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import './index.scss'
class index extends Component {
  componentDidMount() {
    this.initMap()
  }

  // 初始化地图
  initMap = () => {
    // console.log(window);
    const { BMap } = window
    var map = new BMap.Map("container");
    var point = new BMap.Point(116.404, 39.915);
    map.centerAndZoom(point, 15);
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
  }
  // 渲染头部导航
  renderNavBar = () => {
    return (
      <NavBar
        mode="dark"
        icon={<Icon type="left" />}
        onLeftClick={() => this.props.history.goBack()}
      >地图找房</NavBar>
    )
  }
  render() {
    return (
      <div className="mapBox">
        {/* 导航栏 */}
        {this.renderNavBar()}
        {/* 初始化地图 */}
        <div id="container"></div>
      </div>
    );
  }
}

export default index;