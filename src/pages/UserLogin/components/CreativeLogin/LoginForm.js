import React from 'react';
import { Message } from '@alifd/next';
import { withRouter } from 'react-router-dom';
import AuthForm from './AuthForm';
import { request } from '@/utils/request';
import { userLogin } from '@/config/dataSource';


export default withRouter(function LoginForm(props) {
  const formChange = (value) => {
    console.log('formChange:', value);
  };

  const  handleSubmit = async (errors, value) => {
    try {
      userLogin.data = {
        mobile: value.name,
        password: value.password
      };
      const { data } = await request(userLogin);
      Message.success('登录成功');
      console.log('set token ', data.data.token);
      localStorage.setItem('token', 'Bearer '.concat(data.data.token));
      props.history.push('/dashboard/monitor');
    } catch(err) {
      // request 方法已处理异常，通常这里不需要做特殊处理
      console.error(err);
    }
  };

  const config = [
    {
      label: '用户名',
      component: 'Input',
      componentProps: {
        placeholder: '用户名',
        size: 'large',
        maxLength: 20,
      },
      formBinderProps: {
        name: 'name',
        required: true,
        message: '必填',
      },
    },
    {
      label: '密码',
      component: 'Input',
      componentProps: {
        placeholder: '密码',
        htmlType: 'password',
      },
      formBinderProps: {
        name: 'password',
        required: true,
        message: '必填',
      },
    },
    {
      label: '记住账号',
      component: 'Checkbox',
      componentProps: {},
      formBinderProps: {
        name: 'checkbox',
      },
    },
    {
      label: '登录',
      component: 'Button',
      componentProps: {
        type: 'primary',
      },
      formBinderProps: {},
    },
  ];

  const initFields = {
    name: '',
    password: '',
    checkbox: false,
  };

  const links = [
    { to: '/register', text: '立即注册' },
    { to: '/forget', text: '找回密码' },
  ];

  return (
    <AuthForm
      title="登录"
      config={config}
      initFields={initFields}
      formChange={formChange}
      handleSubmit={handleSubmit}
      links={links}
    />
  );
})
