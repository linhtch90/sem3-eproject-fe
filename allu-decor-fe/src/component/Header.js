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
  ShopOutlined,
  ShoppingOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Button, Col, Menu, Row, Space } from 'antd';

import { resetUser } from '../feature/user/UserSlice';

import styles from '../css/Header.module.css';

const MENU_ITEMS = [
  { label: <Link to="/">Home</Link>, key: 'home', icon: <HomeOutlined /> },
  { label: 'Projects', key: 'projects', icon: <FundProjectionScreenOutlined /> },
  { label: 'Products', key: 'products', icon: <ShopOutlined /> },
  { label: 'Feedbacks', key: 'feedbacks', icon: <CarryOutOutlined /> },
  { label: <Link to="faq">FaQ</Link>, key: 'faqs', icon: <CommentOutlined /> },
  { label: <Link to="aboutus">About Us</Link>, key: 'aboutus', icon: <ApartmentOutlined /> },
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

  return (
    <div>
      <Row justify="space-between" className={styles.headerSpace}>
        <Col>Logo</Col>
        <Col>
          <Row justify="end">
            <Space size={'middle'}>
              <Button type="primary" shape="circle" icon={<ShoppingOutlined />}></Button>

              {user ? (
                <>
                  <Button type="primary" shape="round" onClick={handleSignOutClick} icon={<LogoutOutlined />}>
                    Sign Out
                  </Button>
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
          <Row>
            <Menu onClick={handleClick} selectedKeys={[currentMenu]} mode="horizontal" items={MENU_ITEMS} />
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
