import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CarryOutOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Table, Upload } from 'antd';

import { createNewProject, getAllProjects, updateProject } from '../feature/admin_project/AdminProjectSlice';

const AdminProject = () => {
  const dispatch = useDispatch();

  // Form
  const handleOnFinishCreate = (values) => {
    values.image = '';

    values.upload.map(({ originFileObj }) => {
      const reader = new FileReader();
      reader.onload = function (evt) {
        values.image += evt.target.result;
      };
      reader.readAsDataURL(originFileObj);
    });

    console.log(values.image);

    const { name, status, image, description } = values;

    dispatch(
      createNewProject({
        name,
        status,
        image,
        description,
      })
    );
    dispatch(getAllProjects());
  };

  const handleOnFinishUpdate = (values) => {
    values.images = '';

    values.upload.map(({ originFileObj }) => {
      const reader = new FileReader();
      reader.onload = function (evt) {
        values.images += evt.target.result;
      };
      reader.readAsDataURL(originFileObj);
    });

    const { name, status, image, description } = values;

    dispatch(
      updateProject({
        id: selectedRow[0].id,
        name,
        status,
        image,
        description,
      })
    );
    dispatch(getAllProjects());
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }

    return e?.fileList;
  };

  // Data table
  const [selectedRow, setSelectedRow] = React.useState([]);
  const data = useSelector((state) => state.adminProjectReducer.projects);

  const columns = [
    { title: 'Project Name', dataIndex: 'name' },
    { title: 'Status', dataIndex: 'status' },
    { title: 'Description', dataIndex: 'description' },
  ];

  const onSelectChange = (newSelectedRow) => {
    setSelectedRow(newSelectedRow);
  };

  const rowSelection = {
    type: 'radio',
    onChange: onSelectChange,
  };

  React.useEffect(() => {
    dispatch(getAllProjects());
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h1>Admin Project Page</h1>
      <Col span={24}>
        <Row justify="center" gutter={16}>
          <Col span={16}>
            <h1>Data Table</h1>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
          </Col>
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
              onFinish={selectedRow.length > 0 ? handleOnFinishUpdate : handleOnFinishCreate}
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

              {selectedRow.length > 0 ? (
                <Form.Item wrapperCol={{ span: 22, offset: 0 }}>
                  <Button
                    type="primary"
                    shape="round"
                    htmlType="submit"
                    block
                    // onClick={handleUpdateProject}
                    icon={<CarryOutOutlined />}
                  >
                    Update Project
                  </Button>
                </Form.Item>
              ) : (
                <Form.Item wrapperCol={{ span: 22, offset: 0 }}>
                  <Button
                    type="primary"
                    shape="round"
                    htmlType="submit"
                    block
                    // onClick={handleCreateProject}
                    icon={<CarryOutOutlined />}
                  >
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

export default AdminProject;