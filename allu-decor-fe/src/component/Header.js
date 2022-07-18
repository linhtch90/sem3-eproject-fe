import React from 'react';
import { Link } from 'react-router-dom';
import {
  ApartmentOutlined,
  CarryOutOutlined,
  CommentOutlined,
  FundProjectionScreenOutlined,
  HomeOutlined,
  LoginOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import { Button, Col, Menu, Row } from 'antd';

import styles from '../css/Header.module.css';

const MENU_ITEMS = [
  { label: <Link to="/">Home</Link>, key: 'home', icon: <HomeOutlined /> },
  { label: 'Projects', key: 'projects', icon: <FundProjectionScreenOutlined /> },
  { label: 'Products', key: 'products', icon: <ShopOutlined /> },
  { label: 'Feedbacks', key: 'feedbacks', icon: <CarryOutOutlined /> },
  { label: 'FaQs', key: 'faqs', icon: <CommentOutlined /> },
  { label: <Link to="aboutus">About Us</Link>, key: 'aboutus', icon: <ApartmentOutlined /> },
];

const Header = () => {
  const [currentMenu, setCurrentMenu] = React.useState('home');

  const handleClick = (e) => {
    setCurrentMenu(e.key);
  };
  return (
    <div>
      <Row justify="space-between" className={styles.headerSpace}>
        <Col>Logo</Col>
        <Col>
          <Row justify="end">
            <Button type="primary" shape="round" icon={<LoginOutlined />}>
              Sign In
            </Button>
          </Row>
          <Row>
            <Menu onClick={handleClick} selectedKeys={[currentMenu]} mode="horizontal" items={MENU_ITEMS} />
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
