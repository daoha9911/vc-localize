import images from '@/assets/images';
import React from 'react';

import cls from 'classnames'

import styles from './index.less';

const RegionHighlight = () => {
  return (
    <section className={`${styles.container} w1200`}>
      <h2 className={styles.title}>Khu vực nổi bật</h2>
      <div className={styles.row}>
        <div className={cls(styles.column, styles.column_odd)}>
          <div className={styles.item}>
            <div className={styles.image}>
              <img src={images.rs_1} alt="" />
            </div>
            <div className={styles.name}>Cầu giấy</div>
          </div>
          <div className={styles.item}>
            <div className={styles.image}>
              <img src={images.rs_5} alt="" />
            </div>
            <div className={styles.name}>Hoàn kiếm</div>
          </div>
        </div>
        <div className={cls(styles.column, styles.column_even)}>
          <div className={styles.item}>
            <div className={styles.image}>
              <img src={images.rs_6} alt="" />
            </div>
            <div className={styles.name}>Long biên</div>
          </div>
          <div className={styles.item}>
            <div className={styles.image}>
              <img src={images.rs_3} alt="" />
            </div>
            <div className={styles.name}>Hai bà trưng</div>
          </div>
        </div>
        <div className={cls(styles.column, styles.column_odd)}>
          <div className={styles.item}>
            <div className={styles.image}>
              <img src={images.rs_2} alt="" />
            </div>
            <div className={styles.name}>Hà đông</div>
          </div>
          <div className={styles.item}>
            <div className={styles.image}>
              <img src={images.rs_4} alt="" />
            </div>
            <div className={styles.name}>Hoàng mai</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegionHighlight;
