import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CarryOutOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Table, Upload } from 'antd';

import {
  createNewProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from '../feature/admin_product/AdminProductSlice';
import { getAllDomains } from '../feature/domain/DomainSlice';
import { getAllServices } from '../feature/service/ServiceSlice';

const AdminProduct = () => {
  const dispatch = useDispatch();
  const [reloadDataTable, setReloadDataTable] = React.useState(true);
  const [selectedRow, setSelectedRow] = React.useState([]);

  React.useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllDomains());
    dispatch(getAllServices());
  }, [reloadDataTable]);

  // Form
  const [form] = Form.useForm();

  const handleOnFinishCreate = (values) => {
    values.image = '';
    values.upload.map(({ originFileObj }) => {
      const reader = new FileReader();
      reader.onload = function (evt) {
        values.image += evt.target.result;
        const { name, price, image, description, domainid, serviceid } = values;

        dispatch(
          createNewProduct({
            name,
            price,
            image,
            description,
            domainid,
            serviceid,
          })
        );

        setReloadDataTable(!reloadDataTable);
        form.resetFields();
      };
      reader.readAsDataURL(originFileObj);
    });
  };

  const handleOnFinishUpdate = (values) => {
    values.images = '';

    if (values.upload) {
      values.upload.map(({ originFileObj }) => {
        const reader = new FileReader();
        reader.onload = function (evt) {
          values.images += evt.target.result;
          const { name, price, image, description, domainid, serviceid } = values;

          dispatch(
            updateProduct({
              id: selectedRow[0].id,
              name,
              price,
              image,
              description,
              domainid,
              serviceid,
            })
          );

          setReloadDataTable(!reloadDataTable);
          form.resetFields();
        };
        reader.readAsDataURL(originFileObj);
      });
    } else {
      const { name, price, image, description, domainid, serviceid } = values;

      dispatch(
        updateProduct({
          id: selectedRow[0].id,
          name,
          price,
          image,
          description,
          domainid,
          serviceid,
        })
      );

      setReloadDataTable(!reloadDataTable);
      form.resetFields();
    }
  };

  const handleDeleteProduct = () => {
    dispatch(deleteProduct({ id: selectedRow[0].id }));
    setReloadDataTable(!reloadDataTable);
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
  const data = useSelector((state) => state.adminProductReducer.products);
  const domains = useSelector((state) => state.domainReducer.domains);
  const services = useSelector((state) => state.serviceReducer.services);

  const columns = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Price', dataIndex: 'price' },
    { title: 'Domain', dataIndex: 'domain' },
    { title: 'Service', dataIndex: 'service' },
  ];

  const onSelectChange = (key, newSelectedRow) => {
    setSelectedRow(newSelectedRow);
    const { name, price, image, description, domainid, serviceid } = newSelectedRow[0];
    form.setFieldsValue({ name, price, image, description, domainid, serviceid });
  };

  const rowSelection = {
    type: 'radio',
    onChange: onSelectChange,
  };

  return (
    <div style={{ padding: 16 }}>
      <h1>Admin Product Page</h1>
      <Col span={24}>
        <Row justify="center" gutter={16}>
          <Col span={16}>
            <h1>Data Table</h1>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
          </Col>
          <Col span={8}>
            <h1>Project Info</h1>
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
              <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input product name!' }]}>
                <Input />
              </Form.Item>

              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: 'Please input product price!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please input product description!' }]}
              >
                <Input.TextArea showCount maxLength={500} />
              </Form.Item>

              <Form.Item
                label="Select Domain"
                name="domainid"
                rules={[{ required: true, message: 'Please select product domain!' }]}
              >
                <Select>
                  {domains
                    ? domains.map((domain) => (
                        <Select.Option value={domain.id} key={domain.id}>
                          {domain.name}
                        </Select.Option>
                      ))
                    : null}
                </Select>
              </Form.Item>

              <Form.Item
                label="Select Service"
                name="serviceid"
                rules={[{ required: true, message: 'Please select product service!' }]}
              >
                <Select>
                  {services
                    ? services.map((service) => (
                        <Select.Option value={service.id} key={service.id}>
                          {service.name}
                        </Select.Option>
                      ))
                    : null}
                </Select>
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
                      onClick={handleDeleteProduct}
                    >
                      Delete
                    </Button>
                  </Form.Item>
                </Row>
              ) : (
                <Form.Item wrapperCol={{ span: 22, offset: 0 }}>
                  <Button type="primary" shape="round" htmlType="submit" block icon={<CarryOutOutlined />}>
                    Create Product
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

export default AdminProduct;
