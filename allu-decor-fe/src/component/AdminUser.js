import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CarryOutOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Table, Typography } from 'antd';

import {
  createNewUser,
  deleteUser,
  getAllUsers,
  updateUser,
  updateUserWithoutPassword,
} from '../feature/admin_user/AdminUserSlice';

const { Title } = Typography;
const AdminUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [reloadDataTable, setReloadDataTable] = React.useState(true);
  const [selectedRow, setSelectedRow] = React.useState([]);
  const users = useSelector((state) => state.userReducer.users);

  React.useEffect(() => {
    dispatch(getAllUsers());
  }, [reloadDataTable]);

  // Form
  const [form] = Form.useForm();

  const handleOnFinishCreate = async (values) => {
    const { firstname, lastname, address, district, city, phone, email, password } = values;
    await dispatch(
      createNewUser({
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
    await dispatch(getAllUsers());

    form.resetFields();
  };

  const handleOnFinishUpdate = async (values) => {
    const { firstname, lastname, address, district, city, phone, email, password } = values;
    if (password) {
      await dispatch(
        updateUser({
          id: selectedRow[0].id,
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
    } else {
      await dispatch(
        updateUserWithoutPassword({
          id: selectedRow[0].id,
          firstname,
          lastname,
          address,
          district,
          city,
          phone,
          email,
        })
      );
    }

    await dispatch(getAllUsers());

    form.resetFields();
  };

  const handleDeleteUser = async () => {
    await dispatch(deleteUser({ id: selectedRow[0].id }));
    await dispatch(getAllUsers());

    setSelectedRow([]);
    form.resetFields();
  };

  // Do not change this
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }

    return e?.fileList;
  };

  // Data table
  const data = useSelector((state) => state.adminUserReducer.users);

  const columns = [
    { title: 'First Name', dataIndex: 'firstname' },
    { title: 'Last Name', dataIndex: 'lastname' },
    { title: 'Address', dataIndex: 'address' },
    { title: 'District', dataIndex: 'district' },
    { title: 'City', dataIndex: 'city' },
    { title: 'Phone', dataIndex: 'phone' },
    { title: 'Email', dataIndex: 'email' },
  ];

  const onSelectChange = (key, newSelectedRow) => {
    setSelectedRow(newSelectedRow);
    const { firstname, lastname, address, district, city, phone, email } = newSelectedRow[0];
    form.setFieldsValue({ firstname, lastname, address, district, city, phone, email });
  };

  const rowSelection = {
    type: 'radio',
    onChange: onSelectChange,
  };

  return (
    <div style={{ padding: 16 }}>
      <Row justify="center">
        <Title
          style={{
            color: '#076678',
            fontSize: '3rem',
            fontWeight: 'bolder',
            textAlign: 'left',
            textShadow: '4px 4px 0px rgba(131,165,152,0.7)',
          }}
        >
          Admin User Page
        </Title>
      </Row>

      <Row>
        <Col span={24}>
          <Title level={4} style={{ color: '#D65D0E' }}>
            Data Table
          </Title>
        </Col>
        <Col span={24}>
          <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Title level={4} style={{ color: '#D65D0E' }}>
            User Info
          </Title>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={14}>
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
            onFinish={selectedRow.length > 0 ? handleOnFinishUpdate : handleOnFinishCreate}
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

            <Form.Item label="District" name="district" rules={[{ required: true, message: 'Please input district!' }]}>
              <Input />
            </Form.Item>

            <Form.Item label="City" name="city" rules={[{ required: true, message: 'Please input city!' }]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: 'Please input phone!' },
                { pattern: new RegExp(/\d{10}/), message: 'Phone number must be a string of 10 digits' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input an email!' },
                { type: 'email', message: 'Email pattern is not valid!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={selectedRow.length <= 0 ? [{ required: true, message: 'Please input password!' }] : null}
            >
              <Input.Password />
            </Form.Item>

            {selectedRow.length > 0 ? (
              <Row justify="space-evenly">
                <Form.Item wrapperCol={{ span: 24, offset: 0 }}>
                  <Button type="primary" shape="round" htmlType="submit" block icon={<CarryOutOutlined />}>
                    Update
                  </Button>
                </Form.Item>

                <Form.Item wrapperCol={{ span: 24, offset: 0 }}>
                  <Button
                    danger
                    type="primary"
                    shape="round"
                    htmlType="button"
                    block
                    icon={<CarryOutOutlined />}
                    onClick={handleDeleteUser}
                  >
                    Delete
                  </Button>
                </Form.Item>
                <Form.Item wrapperCol={{ span: 24, offset: 0 }}>
                  {users ? (
                    users.map((user) => (
                      <Button
                        key={user.id}
                        type="primary"
                        shape="round"
                        htmlType="button"
                        block
                        icon={<CarryOutOutlined />}
                        onClick={() => navigate(user.id)}
                      >
                        Change Password
                      </Button>
                    ))
                  ) : (
                    <Row justify="center"></Row>
                  )}
                </Form.Item>
              </Row>
            ) : (
              <Form.Item wrapperCol={{ span: 22, offset: 0 }}>
                <Button type="primary" shape="round" htmlType="submit" block icon={<CarryOutOutlined />}>
                  Create User
                </Button>
              </Form.Item>
            )}
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default AdminUser;
