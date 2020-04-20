import React, { Component } from 'react';
import Index from '../Index'
import House from '../House'
import Profile from '../Profile'
import { Route } from 'react-router-dom';
import { TabBar } from 'antd-mobile';
class HomeIndex extends Component {
  state = {
    selectedTab: '/home',
    // TabBar 数据
    tabItems: [
      {
        title: '首页',
        path: '/home',
        icon: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg)',
        sicon: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg)'
      },
      {
        title: '找房',
        path: '/home/house',
        icon: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg)',
        sicon: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg)'
      },
      {
        title: '我的',
        path: '/home/profile',
        icon: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg)',
        sicon: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg)'
      },
    ]
  };
  renderTabBarItems = () => {
    return (
      this.state.tabItems.map(item => {
        return (
          <TabBar.Item
            title={item.title}
            key="Life"
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: `${item.icon} center center /  21px 21px no-repeat`
            }}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: `${item.sicon} center center /  21px 21px no-repeat`
            }}
            />
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
