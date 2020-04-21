import React, { Component } from 'react';
import { Carousel } from 'antd-mobile';
import { apiSwiper } from '../../api/home';
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
  render() {
    return (
      <div className="index">
        {/* 轮播 */}
        {this.renderSwiper()}
      </div>
    );
  }
}

export default index;