import React from 'react';
import { Helmet } from 'react-helmet';
// import Header from './Header';
import Footer from './Footer';

import './index.less';

const homeLayout = ({ children }) => {
  return (
    <>
      {/* <Header /> */}
      {children}
      <Footer />
    </>
  );
};

export default homeLayout;
