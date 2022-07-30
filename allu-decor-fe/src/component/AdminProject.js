import React from 'react';
import { CarryOutOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Upload } from 'antd';

const AdminProject = () => {
  const handleOnFinish = (values) => {
    values.images = [];

    values.upload.map(({ originFileObj }) => {
      const reader = new FileReader();
      reader.onload = function (evt) {
        values.images.push(evt.target.result);
      };
      reader.readAsDataURL(originFileObj);
    });

    console.log(values);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }

    return e?.fileList;
  };

  return (
    <div>
      <h1>Admin Project Page</h1>
      <Col span={24}>
        <Row justify="center">
          <Col span={16}>Table</Col>
          <Col span={8}>
            <h1>Project Info</h1>
            <Form
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
              onFinish={handleOnFinish}
            >
              <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input project name!' }]}>
                <Input />
              </Form.Item>

              <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: 'Please input project status!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please input project description!' }]}
              >
                <Input.TextArea showCount maxLength={500} />
              </Form.Item>

              <Form.Item name="upload" label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
                <Upload name="logo" listType="picture">
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item>

              <Form.Item wrapperCol={{ span: 22, offset: 0 }}>
                <Button type="primary" shape="round" htmlType="submit" block icon={<CarryOutOutlined />}>
                  Update
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Col>
    </div>
  );
};

export default AdminProject;
