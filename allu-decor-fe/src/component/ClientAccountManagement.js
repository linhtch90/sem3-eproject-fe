import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CarryOutOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Typography } from 'antd';

import { updateUser, updateUserWithoutPassword } from '../feature/admin_user/AdminUserSlice';
import { getUserById } from '../feature/user/UserSlice';

const { Title } = Typography;

const ClientAccountManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const userAccount = useSelector((state) => state.userReducer.userAccount);
  const updateUserStatus = useSelector((state) => state.adminUserReducer.updateUserStatus);
  const updateUserWithoutPasswordStatus = useSelector(
    (state) => state.adminUserReducer.updateUserWithoutPasswordStatus
  );

  React.useEffect(() => {
    dispatch(getUserById({ id: localStorage.getItem('userid') }));
  }, []);

  React.useEffect(() => {
    if (userAccount) {
      const { firstname, lastname, address, district, city, phone, email } = userAccount;
      form.setFieldsValue({ firstname, lastname, address, district, city, phone, email });
    }
  }, [userAccount]);

  const handleOnFinishUpdate = async (values) => {
    const { firstname, lastname, address, district, city, phone, email, password } = values;
    if (password) {
      await dispatch(
        updateUser({
          id: localStorage.getItem('userid'),
          firstname,
          lastname,
          address,
          district,
          city,
          phone,
          email,
          password,
        })
      );
      if (updateUserStatus === 'ok') {
        navigate('user/updateusersuccess');
      }
    } else {
      await dispatch(
        updateUserWithoutPassword({
          id: localStorage.getItem('userid'),
          firstname,
          lastname,
          address,
          district,
          city,
          phone,
          email,
        })
      );
      if (updateUserWithoutPasswordStatus === 'ok') {
        navigate('user/updateusersuccess');
      }
    }
  };

  return (
    <Col span={24} style={{ marginTop: '4rem', marginBottom: '4rem' }}>
      <Row justify="center">
        <Title
          style={{
            color: '#076678',
            fontSize: '2rem',
            fontWeight: 'bolder',
            textAlign: 'left',
            textShadow: '3px 3px 0px rgba(131,165,152,0.7)',
          }}
        >
          My Personal Info
        </Title>
      </Row>
      {userAccount ? (
        <Row justify="center">
          <Col span={8}>
            <Form
              form={form}
              name="basic"
              layout="vertical"
              initialValues={{ remember: true }}
              autoComplete="off"
              labelCol={{
                span: 22,
                offset: 0,
              }}
              wrapperCol={{
                span: 22,
                offset: 0,
              }}
              onFinish={handleOnFinishUpdate}
            >
              <Form.Item
                label="First Name"
                name="firstname"
                rules={[{ required: true, message: 'Please input first name!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Last Name"
                name="lastname"
                rules={[{ required: true, message: 'Please input last name!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please input address!' }]}>
                <Input />
              </Form.Item>

              <Form.Item
                label="District"
                name="district"
                rules={[{ required: true, message: 'Please input district!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="City" name="city" rules={[{ required: true, message: 'Please input city!' }]}>
                <Input />
              </Form.Item>

              <Form.Item label="Phone" name="phone" rules={[{ required: true, message: 'Please input phone!' }]}>
                <Input />
              </Form.Item>

              <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input email!' }]}>
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                // rules={[{ required: true, message: 'Please input password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ span: 22, offset: 0 }}>
                <Button type="primary" shape="round" htmlType="submit" block icon={<CarryOutOutlined />}>
                  Update My Information
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      ) : null}
    </Col>
  );
};

export default ClientAccountManagement;
