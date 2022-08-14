import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAddOutlined } from '@ant-design/icons';
import { Button, Form, Input, Row, Typography } from 'antd';
import axios from 'axios';

const { Title } = Typography;

const SignUp = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const signUpUrl = 'https://localhost:44302/api/user';

  const handleOnFinish = async (values) => {
    const response = await axios({
      method: 'post',
      url: signUpUrl,
      data: {
        id: '',
        firstname: values.firstname,
        lastname: values.lastname,
        address: values.address,
        district: values.district,
        city: values.city,
        role: '',
        phone: values.phone,
        email: values.email,
        password: values.password,
      },
    });

    if (response.data.message === 'User created') {
      navigate('/user/createusersuccess');
    }
  };

  return (
    <div style={{ width: '80%', margin: 'auto', marginTop: '4rem', marginBottom: '4rem' }}>
      <Row justify="center">
        <Title
          style={{
            color: '#076678',
            fontSize: '4rem',
            fontWeight: 'bolder',
            textAlign: 'left',
            textShadow: '6px 6px 0px rgba(131,165,152,0.7)',
          }}
        >
          Sign Up
        </Title>
      </Row>
      <Form
        form={form}
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
        onFinish={handleOnFinish}
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
