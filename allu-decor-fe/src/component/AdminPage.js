import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ProjectOutlined, QuestionCircleOutlined, ShopOutlined, UserOutlined, WechatOutlined } from '@ant-design/icons';
import { Col, Menu, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';

const adminMenu = [
  { label: <Link to="/admin/user">Users</Link>, key: 'user', icon: <UserOutlined /> },
  { label: <Link to="/admin/project">Projects</Link>, key: 'project', icon: <ProjectOutlined /> },
  { label: <Link to="/admin/product">Products</Link>, key: 'product', icon: <ShopOutlined /> },
  { label: <Link to="/admin/customerreview">Customer Reviews</Link>, key: 'customerreview', icon: <WechatOutlined /> },
  { label: <Link to="/admin/contactinfo">ContactInfo</Link>, key: 'contactinfo', icon: <ProjectOutlined /> },
  { label: <Link to="/admin/aboutu">AboutUs</Link>, key: 'aboutu', icon: <ProjectOutlined /> },
  { label: <Link to="/admin/domain">Domain</Link>, key: 'domain', icon: <ProjectOutlined /> },
  { label: <Link to="/admin/service">Service</Link>, key: 'service', icon: <ProjectOutlined /> },
  { label: <Link to="/admin/faq">Faq</Link>, key: 'faq', icon: <QuestionCircleOutlined /> },
];

const AdminPage = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const userRole = localStorage.getItem('userrole');
    if (userRole !== 'Admin') {
      navigate('/unauthorized');
    }
  }, []);

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
