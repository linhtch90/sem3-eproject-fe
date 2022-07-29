import React from 'react';
import { UserAddOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

const SignUp = () => {
  return (
    <div>
      <Form
        name="basic"
        layout="vertical"
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
      >
        <Form.Item
          label="Firstname"
          name="firstname"
          rules={[{ required: true, message: 'Please input your firstname!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Lastname"
          name="lastname"
          rules={[{ required: true, message: 'Please input your lastname!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please input your address!' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="District"
          name="district"
          rules={[{ required: true, message: 'Please input your district!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="City" name="city" rules={[{ required: true, message: 'Please input your city!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Phone" name="phone" rules={[{ required: true, message: 'Please input your phone number!' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not a valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
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
          <Button type="primary" shape="round" htmlType="submit" block icon={<UserAddOutlined />}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
