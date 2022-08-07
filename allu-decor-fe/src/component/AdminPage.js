import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ProjectOutlined } from '@ant-design/icons';
import { Col, Menu, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';

const adminMenu = [
  { label: <Link to="/admin/project">Projects</Link>, key: 'project', icon: <ProjectOutlined /> },
  { label: <Link to="/admin/product">Products</Link>, key: 'product', icon: <ProjectOutlined /> },
  { label: <Link to="/admin/customerreview">Customer Reviews</Link>, key: 'customerreview', icon: <ProjectOutlined /> },
];

const AdminPage = () => {
  return (
    <Row>
      <Col style={{ backgroundColor: '#001529' }} span={4}>
        <Sider width={240}>
          <Menu theme="dark" items={adminMenu} />
        </Sider>
      </Col>
      <Col span={20}>
        <Content>
          <Outlet />
        </Content>
      </Col>
    </Row>
  );
};

export default AdminPage;
