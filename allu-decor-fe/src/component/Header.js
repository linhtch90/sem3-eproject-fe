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
  SettingOutlined,
  ShopOutlined,
  ShoppingOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Col, Dropdown, Menu, Row, Space } from 'antd';

import { resetUser } from '../feature/user/UserSlice';

import styles from '../css/Header.module.css';

const MENU_ITEMS = [
  { label: <Link to="/">Home</Link>, key: 'home', icon: <HomeOutlined /> },
  { label: 'Projects', key: 'projects', icon: <FundProjectionScreenOutlined /> },
  { label: 'Products', key: 'products', icon: <ShopOutlined /> },
  { label: 'Feedbacks', key: 'feedbacks', icon: <CarryOutOutlined /> },
  { label: <Link to="faq">FaQ</Link>, key: 'faqs', icon: <CommentOutlined /> },
  { label: <Link to="aboutus">About Us</Link>, key: 'aboutus', icon: <ApartmentOutlined /> },
  { label: <Link to="admin">Admin</Link>, key: 'admin', icon: <SettingOutlined /> },
];

const MENU_ITEMS_ADMIN = [
  { label: <Link to="/">Home</Link>, key: 'home', icon: <HomeOutlined /> },
  { label: 'Projects', key: 'projects', icon: <FundProjectionScreenOutlined /> },
  { label: 'Products', key: 'products', icon: <ShopOutlined /> },
  { label: 'Feedbacks', key: 'feedbacks', icon: <CarryOutOutlined /> },
  { label: <Link to="faq">FaQ</Link>, key: 'faqs', icon: <CommentOutlined /> },
  { label: <Link to="aboutus">About Us</Link>, key: 'aboutus', icon: <ApartmentOutlined /> },
  { label: <Link to="admin">Admin</Link>, key: 'admin', icon: <SettingOutlined /> },
];

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userReducer.user);
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
            <Button type="primary" shape="round" onClick={handleSignOutClick} icon={<LogoutOutlined />}>
              Sign Out
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
                  <Button type="primary" shape="circle" icon={<ShoppingOutlined />}></Button>

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
