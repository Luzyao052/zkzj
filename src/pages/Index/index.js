import React, { Component } from 'react';
import { Carousel, Flex, Grid, WingBlank, SearchBar } from 'antd-mobile';
import { apiSwiper, apiGroups, apiNews } from '../../api/home';
import './index.scss'
import navs from '../../utils/navConfig';

class index extends Component {
  state = {
    data: [], // 轮播
    imgHeight: 176,
    auto: false,
    groups: [], // 租房小组
    news: [],// 最新资讯
    keyword: ''
  }
  componentDidMount() {
    // simulate img loading
    // this.getSwiper()
    // this.getGroups()
    // this.getNews()
    this.loadDatas()
  }
  // 初始化整体数据
  loadDatas = async () => {
    const apis = [apiSwiper(), apiGroups(), apiNews()];
    let [swiper, groups, news] = await Promise.all(apis);
    // console.log(swiper, groups, news);
    this.setState({
      data: swiper.body,
      groups: groups.body,
      news: news.body
    }, () => {
      this.setState({
        auto: true
      })
    })
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
  // 最新资讯
  getNews = async () => {
    const res = await apiNews()
    // console.log(res);
    this.setState({
      news: res.body
    })
  }
  // 渲染最新资讯
  renderNews = () => {
    return this.state.news.map(item => (
      <div className="news-item" key={item.id}>
        <div className="imgwrap">
          <img
            className="img"
            src={`https://api-haoke-web.itheima.net${item.imgSrc}`}
            alt=""
          />
        </div>
        <Flex className="content" direction="column" justify="between">
          <h3 className="title">{item.title}</h3>
          <Flex className="info" justify="between">
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
    ))
  }
  // 渲染顶部导航
  renderTopNav = () => {
    return (
      <Flex justify="around" className="topNav">
        <div className="searchBox">
          <div className="city">
            北京<i className="iconfont icon-arrow" />
          </div>
          <SearchBar
            value={this.state.keyword}
            onChange={(v) => this.setState({ keyword: v })}
            placeholder="请输入小区或地址"
          />
        </div>
        <div className="map" onClick={()=>{this.props.history.push('/map')}}>
          <i key="0" className="iconfont icon-map" />
        </div>
      </Flex>
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
        {/* 最新资讯 */}
        <div className="news">
          <h3 className="group-title">最新资讯</h3>
          <WingBlank size="md">{this.renderNews()}</WingBlank>
        </div>
        {/*  // 渲染顶部导航 */}
        {this.renderTopNav()}
      </div>
    );
  }
}

export default index;