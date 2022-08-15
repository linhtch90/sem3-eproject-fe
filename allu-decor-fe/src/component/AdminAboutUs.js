import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CarryOutOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Table, Typography } from 'antd';

import {
  createNewAboutUs,
  deleteAboutUs,
  getAllAboutUs,
  updateAboutUs,
} from '../feature/AdminAboutUs/AdminAboutUsSlice';

const { Title } = Typography;

const AdminAboutUs = () => {
  const dispatch = useDispatch();
  const [selectedRow, setSelectedRow] = React.useState([]);

  const [form] = Form.useForm();

  const handleOnFinishCreate = async (values) => {
    const { content } = values;
    await dispatch(
      createNewAboutUs({
        content,
      })
    );
    await dispatch(getAllAboutUs());

    form.resetFields();
  };

  const handleOnFinishUpdate = async (values) => {
    const { content } = values;

    await dispatch(
      updateAboutUs({
        id: selectedRow[0].id,
        content,
      })
    );
    await dispatch(getAllAboutUs());

    setSelectedRow([]);
    form.resetFields();
  };

  const handleDeleteAboutUs = async () => {
    await dispatch(deleteAboutUs({ id: selectedRow[0].id }));
    await dispatch(getAllAboutUs());

    setSelectedRow([]);
    form.resetFields();
  };

  // Data table
  const data = useSelector((state) => state.adminAboutUsReducer.aboutUs);

  const columns = [{ title: 'Content', dataIndex: 'content' }];

  const onSelectChange = (key, newSelectedRow) => {
    setSelectedRow(newSelectedRow);
    const { content } = newSelectedRow[0];
    form.setFieldsValue({ content });
  };

  const rowSelection = {
    type: 'radio',
    onChange: onSelectChange,
  };

  React.useEffect(() => {
    dispatch(getAllAboutUs());
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
          Admin About Us Page
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
              About Us Info
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
              <Form.Item
                label="Content"
                name="content"
                rules={[{ required: true, message: 'Please input content about us!' }]}
              >
                <Input.TextArea showCount maxLength={500} />
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
                      onClick={handleDeleteAboutUs}
                    >
                      Delete
                    </Button>
                  </Form.Item>
                </Row>
              ) : (
                <Form.Item wrapperCol={{ span: 22, offset: 0 }}>
                  <Button type="primary" shape="round" htmlType="submit" block icon={<CarryOutOutlined />}>
                    Create AboutUs
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

export default AdminAboutUs;
