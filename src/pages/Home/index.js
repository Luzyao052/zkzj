import React, { Component } from 'react';
import Index from '../Index'
import House from '../House'
import Profile from '../Profile'
import { Route } from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import './index.css'
import tabItems from '../../utils/tabbarConfig';
class HomeIndex extends Component {
  state = {
    selectedTab: '/home'
  };
  // {/* tabbar渲染 */}
  renderTabBarItems = () => {
    return (
      tabItems.map(item => {
        return (
          <TabBar.Item
            title={item.title}
            key={item.path}
            icon={
              <i className={`iconfont ${item.icon}`} />
            }
            selectedIcon={<i className={`iconfont ${item.icon}`} />
            }
            selected={this.state.selectedTab === item.path}
            // badge={1} 徽标数
            onPress={() => {
              // console.log(this);
              this.props.history.push(item.path)
              this.setState({
                selectedTab: item.path,
              });
            }}
            data-seed="logId"
          >
          </TabBar.Item>
        )
      })
    )
  }
  render() {


    return (
      <div className="app">
        <Route exact path="/home" component={Index} />
        <Route path="/home/house" component={House} />
        <Route path="/home/profile" component={Profile} />

        <div className="barBox">
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
            tabBarPosition="bottom"
            noRenderContent={true}
          >
            {/* tabbar渲染 */}
            {this.renderTabBarItems()}
          </TabBar>
        </div>
      </div>
    );
  }
}

export default HomeIndex;
