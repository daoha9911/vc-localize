import React from 'react';

import styles from './index.less';

const Advertise = () => {
  return (
    <section className={styles.container}>
      <div className={styles.box}>
        <h2 className={styles.title}>
          Tham gia cùng chúng tôi để có ngôi nhà mơ ước ở các tỉnh thành trên Việt Nam
        </h2>
        <div className={styles.link}>
          <a href="#" title="Mua nhà">
            Mua nhà
          </a>
          <a href="#" title="Thuê nhà">
            Thuê nhà
          </a>
        </div>
      </div>
    </section>
  );
};

export default Advertise;
