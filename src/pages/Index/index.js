import React, { Component } from 'react';
import { Carousel, Flex, Grid } from 'antd-mobile';
import { apiSwiper, apiGroups } from '../../api/home';
import './index.scss'
import navs from '../../utils/navConfig';

class index extends Component {
  state = {
    data: [], // 轮播
    imgHeight: 176,
    auto: false,
    groups: [] // 租房小组
  }
  componentDidMount() {
    // simulate img loading
    this.getSwiper()
    this.getGroups()
  }
  // 获取轮播图
  getSwiper = async () => {
    const res = await apiSwiper()
    // console.log(res);
    this.setState({
      data: res.body
    }, () => {
      this.setState({
        auto: true
      })
    })
  }
  // 渲染轮播组件
  renderSwiper = () => {
    return (
      <Carousel
        autoplay={this.state.auto}
        infinite
      >
        {this.state.data.map(val => (
          <a
            key={val.id}
            href="http://www.baidu.com"
            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
          >
            <img
              src={`https://api-haoke-web.itheima.net${val.imgSrc}`}
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'));
                this.setState({ imgHeight: 'auto' });
              }}
            />
          </a>
        ))}
      </Carousel>
    )
  }
  // 渲染菜单
  renderNav = () => {
    return (
      navs.map(item => {
        return (
          <Flex.Item onClick={() => this.props.history.push(item.path)} key={item.id}>
            <img alt="" src={item.img} />
            <p>{item.title}</p>
          </Flex.Item>
        )
      })
    )
  }
  // 获取宫格
  getGroups = async () => {
    const res = await apiGroups()
    this.setState({
      groups: res.body
    }, () => {
      this.setState({
        auto: true
      })
    })
  }
  // 渲染租房小组-宫格
  renderGroups = () => {
    return (
      <Grid data={this.state.groups}
        columnNum={2}
        // 关闭默认正方形
        square={false}
        hasLine={false}
        renderItem={item => {
          // console.log(item)
          return (
            // item结构
            <Flex className="grid-item" justify="between">
              <div className="desc">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
            </Flex>
          )
        }}
      />
    )
  }
  render() {
    return (
      <div className="index">
        {/* 轮播 */}
        {this.renderSwiper()}
        {/* flex布局 */}
        <Flex className="nav">
          {this.renderNav()}
        </Flex>
        {/* 租房小组 */}
        <div className="group">
          <Flex className="group-title" justify="between">
            <h3>租房小组</h3>
            <span>更多</span>
          </Flex>
          {/* 租房小组-宫格布局 */}
          {this.renderGroups()}
        </div>
      </div>
    );
  }
}

export default index;