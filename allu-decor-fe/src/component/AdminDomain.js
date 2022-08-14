import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CarryOutOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Table } from 'antd';

import { createNewDomain, deleteDomain, getAllDomains, updateDomain } from '../feature/admin_domain/AdminDomainSlice';

const AdminDomain = () => {
  const dispatch = useDispatch();

  const [selectedRow, setSelectedRow] = React.useState([]);

  React.useEffect(() => {
    dispatch(getAllDomains());
  }, []);

  // Form
  const [form] = Form.useForm();

  const handleOnFinishCreate = async (values) => {
    const { name } = values;
    await dispatch(
      createNewDomain({
        name,
      })
    );
    await dispatch(getAllDomains());

    form.resetFields();
  };

  const handleOnFinishUpdate = async (values) => {
    const { name } = values;

    await dispatch(
      updateDomain({
        id: selectedRow[0].id,
        name,
      })
    );
    await dispatch(getAllDomains());

    setSelectedRow([]);
    form.resetFields();
  };

  const handleDeleteDomain = async () => {
    await dispatch(deleteDomain({ id: selectedRow[0].id }));
    await dispatch(getAllDomains());

    setSelectedRow([]);
    form.resetFields();
  };

  // Data table
  const data = useSelector((state) => state.adminDomainReducer.domains);

  const columns = [{ title: 'Domain Name', dataIndex: 'name' }];

  const onSelectChange = (key, newSelectedRow) => {
    setSelectedRow(newSelectedRow);
    const { name } = newSelectedRow[0];
    form.setFieldsValue({ name });
  };

  const rowSelection = {
    type: 'radio',
    onChange: onSelectChange,
  };

  return (
    <div style={{ padding: 16 }}>
      <h1>Admin Domain Page</h1>
      <Col span={24}>
        <Row justify="center" gutter={16}>
          <Col span={16}>
            <h1>Data Table</h1>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
          </Col>
          <Col span={8}>
            <h1>Domain Info</h1>
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
              <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input domain name!' }]}>
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
                      onClick={handleDeleteDomain}
                    >
                      Delete
                    </Button>
                  </Form.Item>
                </Row>
              ) : (
                <Form.Item wrapperCol={{ span: 22, offset: 0 }}>
                  <Button type="primary" shape="round" htmlType="submit" block icon={<CarryOutOutlined />}>
                    Create Domain
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

export default AdminDomain;
