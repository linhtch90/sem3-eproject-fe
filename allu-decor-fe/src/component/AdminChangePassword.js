import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { LoginOutlined } from '@ant-design/icons';
import { Button, Form, Input, Row, Spin } from 'antd';

import { changePassword } from '../feature/admin_user/AdminChangePasswordSlice';
import { getUserById } from '../feature/user/UserSlice';

const AdminChangePassword = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userChangePassword = useSelector((state) => state.userReducer.changePassword);
  const [form] = Form.useForm();

  React.useEffect(() => {
    dispatch(getUserById({ id: params.userId }));
  }, []);

  const handleOnFinish = (values) => {
    dispatch(changePassword({ email: values.email, password: values.password }));
    form.resetFields();
    navigate('api/user');
  };

  return (
    <div>
      {userChangePassword ? (
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

          <Form.Item wrapperCol={{ span: 8, offset: 8 }}>
            <Button type="primary" shape="round" htmlType="submit" block icon={<LoginOutlined />}>
              Change Password
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Row justify="center">
          <Spin size="large" />
        </Row>
      )}
    </div>
  );
};

export default AdminChangePassword;
