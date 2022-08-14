import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CarryOutOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Table } from 'antd';

import {
  createNewAboutUs,
  deleteAboutUs,
  getAllAboutUs,
  updateAboutUs,
} from '../feature/AdminAboutUs/AdminAboutUsSlice';

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
    <div>
      <h1>Admin AboutUsPage</h1>
      <Col span={24}>
        <Row justify="center" gutter={16}>
          <Col span={16}>
            <h1>Data Table</h1>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
          </Col>
          <Col span={8}>
            <h1> About Us </h1>
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
