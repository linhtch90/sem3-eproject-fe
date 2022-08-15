import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CarryOutOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Table, Typography } from 'antd';

import {
  createNewContactInfo,
  deleteContactInfo,
  getAllContactInfos,
  updateContactInfo,
} from '../feature/AdminContactInfo/AdminContactInfoSlice';

const { Title } = Typography;

const AdminContactInfo = () => {
  const dispatch = useDispatch();
  const [selectedRow, setSelectedRow] = React.useState([]);

  const [form] = Form.useForm();

  const handleOnFinishCreate = async (values) => {
    const { address, ward, city, phone, email } = values;
    await dispatch(
      createNewContactInfo({
        address,
        ward,
        city,
        phone,
        email,
      })
    );
    await dispatch(getAllContactInfos());

    form.resetFields();
  };

  const handleOnFinishUpdate = async (values) => {
    const { address, ward, city, phone, email } = values;
    await dispatch(
      updateContactInfo({
        id: selectedRow[0].id,
        address,
        ward,
        city,
        phone,
        email,
      })
    );
    await dispatch(getAllContactInfos());

    setSelectedRow([]);
    form.resetFields();
  };

  const handleDeleteContactInfo = async () => {
    await dispatch(deleteContactInfo({ id: selectedRow[0].id }));
    await dispatch(getAllContactInfos());

    setSelectedRow([]);
    form.resetFields();
  };

  // Data table
  const data = useSelector((state) => state.adminContactInfoReducer.contactInfo);

  const columns = [
    { title: 'Address contactInfo', dataIndex: 'address' },
    { title: 'Ward', dataIndex: 'ward' },
    { title: 'City', dataIndex: 'city' },
    { title: 'Phone', dataIndex: 'phone' },
    { title: 'Email', dataIndex: 'email' },
  ];

  const onSelectChange = (key, newSelectedRow) => {
    setSelectedRow(newSelectedRow);
    const { address, ward, city, phone, email } = newSelectedRow[0];
    form.setFieldsValue({ address, ward, city, phone, email });
  };

  const rowSelection = {
    type: 'radio',
    onChange: onSelectChange,
  };

  React.useEffect(() => {
    dispatch(getAllContactInfos());
  }, []);

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
          Admin Contact Info Page
        </Title>
      </Row>

      <Col span={24}>
        <Row justify="center" gutter={16}>
          <Col span={16}>
            <Title level={4} style={{ color: '#D65D0E' }}>
              Data Table
            </Title>

            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
          </Col>
          <Col span={8}>
            <Title level={4} style={{ color: '#D65D0E' }}>
              Contact Info
            </Title>

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
              <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please input address!' }]}>
                <Input />
              </Form.Item>

              <Form.Item label="Ward" name="ward" rules={[{ required: true, message: 'Please input ward!' }]}>
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
                      onClick={handleDeleteContactInfo}
                    >
                      Delete
                    </Button>
                  </Form.Item>
                </Row>
              ) : (
                <Form.Item wrapperCol={{ span: 22, offset: 0 }}>
                  <Button type="primary" shape="round" htmlType="submit" block icon={<CarryOutOutlined />}>
                    Create Project
                  </Button>
                </Form.Item>
              )}
            </Form>
          </Col>
        </Row>
      </Col>
    </div>
  );
};

export default AdminContactInfo;
