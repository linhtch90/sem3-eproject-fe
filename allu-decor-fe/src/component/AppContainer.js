import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import AboutUsDemo from '../sub-component/AboutUsDemo';
import HomeDemo from '../sub-component/HomeDemo';

import FaqPage from './FaqPage';
import Footer from './Footer';
import Header from './Header';

import styles from '../css/AppContainer.module.css';

const AppContainer = () => {
  return (
    <div className={styles.appWidth}>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomeDemo />} />
          <Route path="aboutus" element={<AboutUsDemo />} />
          <Route path="faq" element={<FaqPage />} />
        </Routes>
        <Footer />
      </HashRouter>
    </div>
  );
};

export default AppContainer;
