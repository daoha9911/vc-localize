import React from 'react';
import { connect } from 'dva';
import { Link } from 'umi';
import styles from './index.less';

const CompareNotice = ({ compareEstate, loggedIn }) => {
  return (
    <>
      {loggedIn && compareEstate && compareEstate?.length >= 1 && (
        <div className={styles.CompareNotice_Wrapper}>
          <span>
            Bạn có <span className={styles.c_red}>{compareEstate?.length} bất động sản</span> trong
            danh sách so sánh.
            <Link to="/user/compare">
              {' '}
              <span className={styles.c_green}>xem ngay</span>
            </Link>
          </span>
        </div>
      )}
    </>
  );
};

export default connect(({ compare, login }) => ({
  compareEstate: compare.estates,
  loggedIn: login.loggedIn,
}))(CompareNotice);
