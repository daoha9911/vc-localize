import React from 'react';
import ContentLoader from 'react-content-loader';
import styles from '../index.less';

const MyLoader = (props) => (
  <>
    <ContentLoader
      speed={2}
      width={400}
      height={280}
      className={styles.customSkeletonWidth}
      viewBox="0 0 400 280"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect
        x="0"
        y="0"
        rx="0"
        ry="0"
        width="210"
        height="138"
        className={styles.customSkeletonWidth}
      />
      <rect
        x="0"
        y="149"
        rx="0"
        ry="0"
        width="210"
        height="24"
        className={styles.customSkeletonWidth}
      />
      <rect
        x="0"
        y="188"
        rx="0"
        ry="0"
        width="210"
        height="50"
        className={styles.customSkeletonWidth}
      />
    </ContentLoader>
  </>
);

export default MyLoader;
