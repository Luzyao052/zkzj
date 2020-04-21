import React, { Component } from 'react';
import { Carousel, Flex } from 'antd-mobile';
import { apiSwiper } from '../../api/home';
import './index.css'
import navs from '../../utils/navConfig';

class index extends Component {
  state = {
    data: [],
    imgHeight: 176,
    auto: false
  }
  componentDidMount() {
    // simulate img loading
    this.getSwiper()
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
  render() {
    return (
      <div className="index">
        {/* 轮播 */}
        {this.renderSwiper()}
        {/* flex布局 */}
        <Flex className="nav">
          {this.renderNav()}
        </Flex>
      </div>
    );
  }
}

export default index;