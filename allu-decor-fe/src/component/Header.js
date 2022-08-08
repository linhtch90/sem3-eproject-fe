import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  ApartmentOutlined,
  CarryOutOutlined,
  CommentOutlined,
  FundProjectionScreenOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  ScheduleOutlined,
  SettingOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Button, Col, Dropdown, Menu, Row, Space } from 'antd';

import { resetUser } from '../feature/user/UserSlice';

import styles from '../css/Header.module.css';

const MENU_ITEMS = [
  { label: <Link to="/">Home</Link>, key: 'home', icon: <HomeOutlined /> },
  { label: 'Projects', key: 'projects', icon: <FundProjectionScreenOutlined /> },
  { label: <Link to="product">Products</Link>, key: 'product', icon: <ShopOutlined /> },
  { label: 'Feedbacks', key: 'feedbacks', icon: <CarryOutOutlined /> },
  { label: <Link to="faq">FaQ</Link>, key: 'faqs', icon: <CommentOutlined /> },
  { label: <Link to="aboutus">About Us</Link>, key: 'aboutus', icon: <ApartmentOutlined /> },
  { label: <Link to="admin">Admin</Link>, key: 'admin', icon: <SettingOutlined /> },
];

const MENU_ITEMS_ADMIN = [
  { label: <Link to="/">Home</Link>, key: 'home', icon: <HomeOutlined /> },
  { label: 'Projects', key: 'projects', icon: <FundProjectionScreenOutlined /> },
  { label: <Link to="product">Products</Link>, key: 'product', icon: <ShopOutlined /> },
  { label: 'Feedbacks', key: 'feedbacks', icon: <CarryOutOutlined /> },
  { label: <Link to="faq">FaQ</Link>, key: 'faqs', icon: <CommentOutlined /> },
  { label: <Link to="aboutus">About Us</Link>, key: 'aboutus', icon: <ApartmentOutlined /> },
  { label: <Link to="admin">Admin</Link>, key: 'admin', icon: <SettingOutlined /> },
];

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userReducer.user);
  const cartItems = useSelector((state) => state.cartReducer.cartItems);
  const [currentMenu, setCurrentMenu] = React.useState('home');

  const handleClick = (e) => {
    setCurrentMenu(e.key);
  };

  const handleSignInClick = () => {
    navigate('/signin');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleClientInvoiceManagement = () => {
    navigate('/clientinvoicemanagement');
  };

  const handleSignOutClick = () => {
    dispatch(resetUser());
    localStorage.removeItem('token');
    navigate('/');
  };

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <Button type="primary" onClick={handleSignOutClick} icon={<LogoutOutlined />}>
              Sign Out
            </Button>
          ),
        },
      ]}
    />
  );

  const menuCart = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <Button block type="primary" icon={<ShoppingCartOutlined />} onClick={handleCartClick}>
              Checkout
            </Button>
          ),
        },
        {
          key: '2',
          label: (
            <Button block type="primary" icon={<ScheduleOutlined />} onClick={handleClientInvoiceManagement}>
              Invoice Management
            </Button>
          ),
        },
      ]}
    />
  );

  return (
    <div className={styles.headerContainer}>
      <Row className={styles.headerSpace}>
        <Col span={4}>Logo</Col>
        <Col span={20}>
          <Row justify="end">
            <Space direction="vertical" size={'middle'}>
              <Row justify="end">
                <Space size={'middle'}>
                  <Dropdown overlay={menuCart} placement="bottomRight">
                    <Badge count={cartItems.length > 0 ? cartItems.length : null}>
                      <Button
                        type="primary"
                        shape="circle"
                        icon={<ShoppingOutlined />}
                        onClick={handleCartClick}
                      ></Button>
                    </Badge>
                  </Dropdown>

                  {user ? (
                    <>
                      <Dropdown overlay={menu} placement="bottomRight">
                        <Avatar style={{ backgroundColor: '#1890ff' }}>{user.firstname.charAt(0)}</Avatar>
                      </Dropdown>
                    </>
                  ) : (
                    <>
                      <Button type="primary" shape="round" onClick={handleSignInClick} icon={<LoginOutlined />}>
                        Sign In
                      </Button>

                      <Button type="primary" shape="round" onClick={handleSignUpClick} icon={<UserAddOutlined />}>
                        Sign Up
                      </Button>
                    </>
                  )}
                </Space>
              </Row>
              <Row justify="end">
                {user && user.role === 'Admin' ? (
                  <Menu
                    theme="dark"
                    onClick={handleClick}
                    selectedKeys={[currentMenu]}
                    mode="horizontal"
                    disabledOverflow
                    items={MENU_ITEMS_ADMIN}
                  />
                ) : (
                  <Menu
                    theme="dark"
                    onClick={handleClick}
                    selectedKeys={[currentMenu]}
                    mode="horizontal"
                    disabledOverflow
                    items={MENU_ITEMS}
                  />
                )}
              </Row>
            </Space>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
