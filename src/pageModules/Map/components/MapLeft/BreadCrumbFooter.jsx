import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'umi';
import styles from './index.less';

const BreadCrumbFooter = () => {
  return (
    <>
      <div className={styles.customBreadCrumbFooter_wrapper}>
        <div className={styles.customBreadCrumbFooter}>
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              {' '}
              <Link to="/">Trang chủ</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {' '}
              <Link to="/map">Mua nhà</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
    </>
  );
};

export default BreadCrumbFooter;
