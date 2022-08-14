import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CarryOutOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Table, Upload } from 'antd';

import {
  createNewCustomerReview,
  deleteCustomerReview,
  getAllCustomerReviews,
  updateCustomerReview,
} from '../feature/admin_customerreview/AdminCustomerReviewSlice';

const AdminCustomerReview = () => {
  const dispatch = useDispatch();
  const [selectedRow, setSelectedRow] = React.useState([]);

  React.useEffect(() => {
    dispatch(getAllCustomerReviews());
  }, []);

  // Form
  const [form] = Form.useForm();

  const handleOnFinishCreate = async (values) => {
    values.image = '';
    await values.upload.map(({ originFileObj }) => {
      const reader = new FileReader();
      reader.onload = async function (evt) {
        values.image += evt.target.result;
        const { firstname, lastname, company, content, image } = values;

        await dispatch(
          createNewCustomerReview({
            firstname,
            lastname,
            company,
            content,
            image,
          })
        );
        await dispatch(getAllCustomerReviews());

        form.resetFields();
      };
      reader.readAsDataURL(originFileObj);
    });
  };

  const handleOnFinishUpdate = async (values) => {
    values.images = '';

    if (values.upload) {
      await values.upload.map(({ originFileObj }) => {
        const reader = new FileReader();
        reader.onload = async function (evt) {
          values.images += evt.target.result;
          const { firstname, lastname, company, content, image } = values;

          await dispatch(
            updateCustomerReview({
              id: selectedRow[0].id,
              firstname,
              lastname,
              company,
              content,
              image,
            })
          );
          await dispatch(getAllCustomerReviews());

          form.resetFields();
        };
        reader.readAsDataURL(originFileObj);
      });
    } else {
      const { firstname, lastname, company, content, image } = values;

      await dispatch(
        updateCustomerReview({
          id: selectedRow[0].id,
          firstname,
          lastname,
          company,
          content,
          image,
        })
      );
      await dispatch(getAllCustomerReviews());

      setSelectedRow([]);
      form.resetFields();
    }
  };

  const handleDeleteCustomerReview = async () => {
    await dispatch(deleteCustomerReview({ id: selectedRow[0].id }));
    await dispatch(getAllCustomerReviews());

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
  const data = useSelector((state) => state.adminCustomerReviewReducer.customerreviews);

  const columns = [
    { title: 'First Name', dataIndex: 'firstname' },
    { title: 'Last Name', dataIndex: 'lastname' },
    { title: 'Company', dataIndex: 'company' },
    { title: 'Content', dataIndex: 'content' },
  ];

  const onSelectChange = (key, newSelectedRow) => {
    setSelectedRow(newSelectedRow);
    const { firstname, lastname, company, content } = newSelectedRow[0];
    form.setFieldsValue({ firstname, lastname, company, content });
  };

  const rowSelection = {
    type: 'radio',
    onChange: onSelectChange,
  };

  return (
    <div style={{ padding: 16 }}>
      <h1>Admin Customer Review Page</h1>
      <Col span={24}>
        <Row justify="center" gutter={16}>
          <Col span={16}>
            <h1>Data Table</h1>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
          </Col>
          <Col span={8}>
            <h1>Customer Review Info</h1>
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

              <Form.Item
                label="Company"
                name="company"
                rules={[{ required: true, message: 'Please input your company!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Content"
                name="content"
                rules={[{ required: true, message: 'Please input your content!' }]}
              >
                <Input.TextArea showCount maxLength={500} />
              </Form.Item>

              <Form.Item name="upload" label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
                <Upload name="logo" listType="picture">
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
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
                      onClick={handleDeleteCustomerReview}
                    >
                      Delete
                    </Button>
                  </Form.Item>
                </Row>
              ) : (
                <Form.Item wrapperCol={{ span: 22, offset: 0 }}>
                  <Button type="primary" shape="round" htmlType="submit" block icon={<CarryOutOutlined />}>
                    Create Customer Review
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

export default AdminCustomerReview;
