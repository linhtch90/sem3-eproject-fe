import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CarryOutOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Table, Typography } from 'antd';

import { createNewFaq, deleteFaq, getAllFaqs, updateFaq } from '../feature/admin_faq/AdminFaqSlice';

const { Title } = Typography;

const AdminFaq = () => {
  const dispatch = useDispatch();
  const [selectedRow, setSelectedRow] = React.useState([]);

  React.useEffect(() => {
    dispatch(getAllFaqs());
  }, []);

  // Form
  const [form] = Form.useForm();

  const handleOnFinishCreate = async (values) => {
    const { question, answer } = values;
    await dispatch(
      createNewFaq({
        question,
        answer,
      })
    );
    await dispatch(getAllFaqs());

    form.resetFields();
  };

  const handleOnFinishUpdate = async (values) => {
    const { question, answer } = values;

    await dispatch(
      updateFaq({
        id: selectedRow[0].id,
        question,
        answer,
      })
    );
    await dispatch(getAllFaqs());

    setSelectedRow([]);
    form.resetFields();
  };

  const handleDeleteFaq = async () => {
    await dispatch(deleteFaq({ id: selectedRow[0].id }));
    await dispatch(getAllFaqs());

    setSelectedRow([]);
    form.resetFields();
  };

  // Data table
  const data = useSelector((state) => state.adminFaqReducer.faqs);

  const columns = [
    { title: 'Question', dataIndex: 'question' },
    { title: 'Answer', dataIndex: 'answer' },
  ];

  const onSelectChange = (key, newSelectedRow) => {
    setSelectedRow(newSelectedRow);
    const { question, answer } = newSelectedRow[0];
    form.setFieldsValue({ question, answer });
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
          Admin Faq Page
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
              Faq Info
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
                label="Question"
                name="question"
                rules={[{ required: true, message: 'Please input question!' }]}
              >
                <Input.TextArea showCount rows={4} maxLength={500} />
              </Form.Item>
              <Form.Item label="Answer" name="answer" rules={[{ required: true, message: 'Please input answer!' }]}>
                <Input.TextArea showCount rows={10} maxLength={2000} />
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
                      onClick={handleDeleteFaq}
                    >
                      Delete
                    </Button>
                  </Form.Item>
                </Row>
              ) : (
                <Form.Item wrapperCol={{ span: 22, offset: 0 }}>
                  <Button type="primary" shape="round" htmlType="submit" block icon={<CarryOutOutlined />}>
                    Create Faq
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

export default AdminFaq;
