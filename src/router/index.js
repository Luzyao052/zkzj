import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import Home from '../pages/Home';
import CityList from '../pages/CityList';
import Map from '../pages/Map';
import Fn404 from '../pages/NotFound';

class index extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Link to="/home">主页</Link>
          <Link to="/cityList">城市列表</Link>
          <Link to="/map">地图</Link>
          <hr />
          <Switch>
            <Redirect exact to="/home" from="/"/>
            <Route path="/home" component={Home} />
            <Route path="/cityList" component={CityList} />
            <Route path="/map" component={Map} />
            {/* 404页面 */}
            <Route component={Fn404} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default index;