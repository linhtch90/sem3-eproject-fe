import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';

import AboutUsDemo from '../sub-component/AboutUsDemo';

import AdminHome from './AdminHome';
import AdminPage from './AdminPage';
import AdminProject from './AdminProject';
import FaqPage from './FaqPage';
import Footer from './Footer';
import Header from './Header';
import HomePage from './HomePage';
import SignIn from './SignIn';
import SignUp from './SignUp';
import UserSignUpSuccess from './UserSignUpSuccess';

import styles from '../css/AppContainer.module.css';

const AppContainer = () => {
  return (
    <div className={styles.appMargin}>
      <HashRouter>
        <Layout>
          <Header />
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="aboutus" element={<AboutUsDemo />} />
              <Route path="faq" element={<FaqPage />} />
              <Route path="admin" element={<AdminPage />}>
                <Route index element={<AdminHome />} />
                <Route path="project" element={<AdminProject />} />
              </Route>
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="user/createusersuccess" element={<UserSignUpSuccess />} />
            </Routes>
            <Footer />
          </Layout>
        </Layout>
      </HashRouter>
    </div>
  );
};

export default AppContainer;
