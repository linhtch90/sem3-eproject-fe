import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';

import AboutUsDemo from '../sub-component/AboutUsDemo';
import ProjectDetail from '../sub-component/ProjectDetail';

import AdminAboutUs from './AdminAboutUs';
import AdminContactInfo from './AdminContactInfo';
import AdminChangePassword from './AdminChangePassword';
import AdminCustomerReview from './AdminCustomerReview';
import AdminDomain from './AdminDomain';
import AdminFaq from './AdminFaq';
import AdminHome from './AdminHome';
import AdminPage from './AdminPage';
import AdminProduct from './AdminProduct';
import AdminProject from './AdminProject';
import AdminService from './AdminService';
import AdminUser from './AdminUser';
import ClientAccountManagement from './ClientAccountManagement';
import ClientInvoiceManagement from './ClientInvoiceManagement';
import FaqPage from './FaqPage';
import Footer from './Footer';
import Header from './Header';
import HomePage from './HomePage';
import PageNotFound from './PageNotFound';
import ProductCart from './ProductCart';
import ProductDetail from './ProductDetail';
import ProductHome from './ProductHome';
import ProductPage from './ProductPage';
import ProjectPage from './ProjectPage';
import SignIn from './SignIn';
import SignUp from './SignUp';
import UnauthorizedPage from './UnauthorizedPage';
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
              <Route path="project" element={<ProjectPage />}>
                <Route path="project/projectDetail/id?id=:projectId" element={<ProjectDetail />} />
              </Route>

              <Route path="admin" element={<AdminPage />}>
                <Route index element={<AdminHome />} />
                <Route path="project" element={<AdminProject />} />
                <Route path="product" element={<AdminProduct />} />
                <Route path="customerreview" element={<AdminCustomerReview />} />
                <Route path="contactinfo" element={<AdminContactInfo />} />
                <Route path="aboutu" element={<AdminAboutUs />} />
                <Route path="domain" element={<AdminDomain />} />
                <Route path="service" element={<AdminService />} />
                <Route path="user" element={<AdminUser />} />
                <Route path="faq" element={<AdminFaq />} />
              </Route>

              <Route path="product" element={<ProductPage />}>
                <Route index element={<ProductHome />} />
                <Route path=":productId" element={<ProductDetail />} />
              </Route>

              <Route path="cart" element={<ProductCart />} />
              <Route path="clientinvoicemanagement" element={<ClientInvoiceManagement />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="account" element={<ClientAccountManagement />} />
              <Route path="user/createusersuccess" element={<UserSignUpSuccess />} />
              <Route path="unauthorized" element={<UnauthorizedPage />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
          </Layout>
        </Layout>
      </HashRouter>
    </div>
  );
};

export default AppContainer;
