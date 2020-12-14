import React from 'react';
import images from '@/assets/images/index';

import styles from './index.less';

const Blog = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Những thứ cần đọc trên blog</h2>
      <p className={styles.desc}>Hướng dẫn và điểm nổi bật hàng đầu cho người mua và thuê</p>
      <div className={styles.list}>
        <div className={styles.item}>
          <div className={styles.photo}>
            <a href="#" title="Tám lí do bạn nên đến ở TP.Hồ Chí Minh">
              <img src={images.region_2} alt="region" />
            </a>
          </div>
          <h3 className={styles.title}>
            <a href="#" title="Tám lí do bạn nên đến ở TP.Hồ Chí Minh">
              Tám lí do bạn nên đến ở TP.Hồ Chí Minh
            </a>
          </h3>
        </div>
        <div className={styles.item}>
          <div className={styles.photo}>
            <a href="#" title="Nơi tốt nhất chúng ta ở và rèn luyện sức khỏe.">
              <img src={images.region_4} alt="region" />
            </a>
          </div>
          <h3 className={styles.title}>
            <a href="#" title="Nơi tốt nhất chúng ta ở và rèn luyện sức khỏe.">
              Nơi tốt nhất chúng ta ở và rèn luyện sức khỏe.
            </a>
          </h3>
        </div>
        <div className={styles.item}>
          <div className={styles.photo}>
            <a href="#" title="Thị trường bất động sản nào có giá tốt nhất ?">
              <img src={images.region_3} alt="region" />
            </a>
          </div>
          <h3 className={styles.title}>
            <a href="#" title="Thị trường bất động sản nào có giá tốt nhất ?">
              Thị trường bất động sản nào có giá tốt nhất ?
            </a>
          </h3>
        </div>
        <div className={styles.item}>
          <div className={styles.photo}>
            <a href="#" title="Những điều bận cần biết khi lựa chọn vị trí mua nhà.">
              <img src={images.region_6} alt="region" />
            </a>
          </div>
          <h3 className={styles.title}>
            <a href="#" title="Những điều bận cần biết khi lựa chọn vị trí mua nhà.">
              Những điều bận cần biết khi lựa chọn vị trí mua nhà.
            </a>
          </h3>
        </div>
      </div>
    </section>
  );
};

export default Blog;
