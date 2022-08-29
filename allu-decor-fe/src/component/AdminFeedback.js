import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CarryOutOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Table, Typography } from 'antd';

import { getAllFeedback, removeFeedbackById } from '../feature/admin_feedback/AdminFeedbackSlice';

const { Title } = Typography;

const AdminFeedback = () => {
  const dispatch = useDispatch();

  const [selectedRow, setSelectedRow] = React.useState([]);

  React.useEffect(() => {
    dispatch(getAllFeedback());
  }, []);

  // Form
  const [form] = Form.useForm();

  const handleDeleteFeedback = async () => {
    await dispatch(removeFeedbackById({ id: selectedRow[0].id }));
    await dispatch(getAllFeedback());

    setSelectedRow([]);
    form.resetFields();
  };

  // Data table
  const data = useSelector((state) => state.adminFeedbackReducer.feedbacks);

  const columns = [
    { title: 'Firstname', dataIndex: 'firstname' },
    { title: 'Lastname', dataIndex: 'lastname' },
    { title: 'Content', dataIndex: 'content' },
  ];

  const onSelectChange = (key, newSelectedRow) => {
    setSelectedRow(newSelectedRow);
    const { firstname, lastname, content } = newSelectedRow[0];
    form.setFieldsValue({ firstname, lastname, content });
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
          Admin Feedback Page
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
              Feedback Info
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
            >
              <Form.Item label="Firstname" name="firstname">
                <Input />
              </Form.Item>
              <Form.Item label="Lastname" name="lastname">
                <Input />
              </Form.Item>
              <Form.Item label="Content" name="content">
                <Input.TextArea showCount maxLength={250} rows={7} />
              </Form.Item>

              {selectedRow.length > 0 ? (
                <Row justify="space-evenly">
                  <Form.Item wrapperCol={{ span: 24, offset: 0 }}>
                    <Button
                      danger
                      type="primary"
                      shape="round"
                      htmlType="button"
                      block
                      icon={<CarryOutOutlined />}
                      onClick={handleDeleteFeedback}
                    >
                      Delete
                    </Button>
                  </Form.Item>
                </Row>
              ) : null}
            </Form>
          </Col>
        </Row>
      </Col>
    </div>
  );
};

export default AdminFeedback;
