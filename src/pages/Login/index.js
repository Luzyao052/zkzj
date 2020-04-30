import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace, NavBar, Toast } from 'antd-mobile'

import { Link } from 'react-router-dom'

import styles from './index.module.css'
import { apiLogin } from '../../api/user'
// import { setLocal, LOGIN_TOKEN } from '../../utils/fixcity'
import Auth from '../../utils/fixcity'
import { withFormik } from 'formik';
import * as yup from 'yup'; // for everything
// let yup = require('yup');
// 验证规则：
const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

class Login extends Component {
  // state = {
  //   username: '',
  //   password: ''
  // }
  // 受控组件 双向绑定
  // handler = (e) => {
  //   // console.log(e.target);
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   })
  // }
  // 点击登录
  // handleLogin = async (e) => {
  //   e.preventDefault()
  //   const { username, password } = this.state
  //   const { status, description, body } = await apiLogin({ username, password })
  //   // console.log(status, description, body);
  //   if (status === 200) {
  //     Toast.success(description, 2)
  //     setLocal(LOGIN_TOKEN, body.token)
  //     this.props.history.push('/')
  //   } else {
  //     Toast.fail(description)
  //   }
  // }
  render() {
    const {
      values,
      // touched,
      errors,
      handleChange,
      // handleBlur,
      handleSubmit,
    } = this.props;
    // console.log(errors)
    return (
      <div className={styles.root}>
        {/* 顶部导航 */}
        <NavBar mode="light">
          账号登录
        </NavBar>
        <WhiteSpace size="xl" />

        {/* 登录表单 */}
        <WingBlank>
          <form onSubmit={handleSubmit}>
            <div className={styles.formItem}>
              <input
                value={values.username}
                onChange={handleChange}
                className={styles.input}
                name="username"
                placeholder="请输入账号"
              />
            </div>
            {/* 长度为5到8位，只能出现数字、字母、下划线 */}
            {errors.username && <div className={styles.error}>{errors.username}</div>}
            <div className={styles.formItem}>
              <input
                value={values.password}
                onChange={handleChange}
                className={styles.input}
                name="password"
                type="password"
                placeholder="请输入密码"
              />
            </div>
            {/* 长度为5到12位，只能出现数字、字母、下划线 */}
            {errors.password && <div className={styles.error}>{errors.password}</div>}
            <div className={styles.formSubmit}>
              <button className={styles.submit} type="submit">
                登 录
              </button>
            </div>
          </form>
          <Flex className={styles.backHome}>
            <Flex.Item>
              <Link to="/registe">还没有账号，去注册~</Link>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    )
  }
}
// 返回新的组件 ----------formik
const NewLogin = withFormik({
  mapPropsToValues: () => ({ username: 'admin', password: 'admin' }),

  // 表单校验
  validationSchema: yup.object().shape({
    username: yup.string().required('账号为必填项').matches(REG_UNAME, '长度为5到8位，只能出现数字、字母、下划线'),
    password: yup.string().required('密码为必填项').matches(REG_PWD, '长度为5到12位，只能出现数字、字母、下划线'),
  }),

  handleSubmit: async (values, formikBag) => {
    const { username, password } = values
    const { status, description, body } = await apiLogin({ username, password })
    // console.log(status, description, body);
    if (status === 200) {
      Toast.success(description, 2)
      // setLocal(LOGIN_TOKEN, body.token)
      Auth.setUser(body.token)
      formikBag.props.history.push('/home/profile')
    } else {
      Toast.fail(description)
    }
  },

  displayName: 'BasicForm',
})(Login);
export default NewLogin
