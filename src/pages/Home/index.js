import React, { Component } from 'react';
import Index from '../Index'
import House from '../House'
import Profile from '../Profile'
import { Route, Link } from 'react-router-dom';
class HomeIndex extends Component {
  render() {
    return (
      <div className="app">
        <Link to="/home">首页</Link>
        <Link to="/home/house">房屋列表</Link>
        <Link to="/home/profile">个人中心</Link>
        <hr />
        <Route exact path="/home" component={Index} />
        <Route path="/home/house" component={House} />
        <Route path="/home/profile" component={Profile} />
      </div>
    );
  }
}

export default HomeIndex;