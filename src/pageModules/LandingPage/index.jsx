import React from 'react';
import { Helmet } from 'react-helmet';
// import Advertise from './Advertise';
import Banner from './Banner';
// import Blog from './Blog';
import Customer from './Customer';
import Intro from './Intro';
import RegionHighlight from './RegionHighlight';
import HowToWork from './HowToWork';
import Register from './Register';
import PriceFluctuation from './PriceFluctuation';

const landingPage = () => {
  return (
    <>
      <Banner />
      <Intro />
      <RegionHighlight />
      <PriceFluctuation />
      <Customer />
      <HowToWork />
      <Register />
      {/* <Advertise /> */}
      {/* <Blog /> */}
    </>
  );
};

export default landingPage;
