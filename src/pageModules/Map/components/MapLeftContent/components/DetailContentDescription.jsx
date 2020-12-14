import React from 'react';
import styles from '../index.less';

const DetailContentDescription = ({ icon, title }) => {
  return (
    <>
      <div className="flex items-center mr-4 py-2">
        <div className="mr-2 flex ali">{icon}</div>
        <div>
          <span className={styles.DetailContentDesciption_Title}>{title}</span>
        </div>
      </div>
    </>
  );
};

export default DetailContentDescription;
