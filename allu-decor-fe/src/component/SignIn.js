import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification } from 'antd';

import { signIn } from '../feature/user/UserSlice';

const openNotification = () => {
  notification.info({
    message: `Please Try Again`,
    description: 'Your sign in information is incorrect. Please try again!',
    placement: 'bottomRight',
  });
};

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const user = useSelector((state) => state.userReducer.user);

  const checkSignIn = () => {
    if (user && user.status === 'ok') {
      form.resetFields();
      navigate('/');
    } else {
      form.resetFields();
      openNotification();
    }
  };

  const handleOnFinish = async (values) => {
    await dispatch(signIn({ email: values.email, password: values.password }));
    await checkSignIn();
  };

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <Form
        name="basic"
        layout="vertical"
        form={form}
        initialValues={{ remember: true }}
        autoComplete="off"
        labelCol={{
          span: 8,
          offset: 8,
        }}
        wrapperCol={{
          span: 8,
          offset: 8,
        }}
        onFinish={handleOnFinish}
      >
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item wrapperCol={{ span: 8, offset: 8 }}>
          <Button type="primary" shape="round" htmlType="submit" block icon={<LoginOutlined />}>
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
