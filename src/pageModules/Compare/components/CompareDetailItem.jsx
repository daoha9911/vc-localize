import React from 'react';
import styles from '../index.less';

const CompareDetailItem = ({ children }) => {
  return (
    <>
      <div className={styles.CompareDetailItem_Wrapper}>{children}</div>
    </>
  );
};

export default CompareDetailItem;
