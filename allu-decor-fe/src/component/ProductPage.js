import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import { Col, Menu, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';

const productMenu = [
  { label: <Link to="/product/home">Home Products</Link>, key: 'productHome', icon: <HomeOutlined /> },
];

const ProductPage = () => {
  return (
    <Row>
      <Col span={4}>
        <Sider width={240}>
          <Menu theme="light" items={productMenu} />
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

export default ProductPage;
