/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import cls from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';
import DefaultImage from '@/static/web_images/DefaultImage.png';
import 'swiper/swiper.less';
import 'swiper/components/navigation/navigation.less';
import 'swiper/components/pagination/pagination.less';
import styles from '../index.less';

SwiperCore.use([Pagination]);

const SwiperImage = ({ images, data }) => {
  const [swiperClone, setSwiperClone] = useState(null);

  const addDefaultSrc = (e) => {
    e.target.src = DefaultImage;
  };

  const renderSlide = (imgs) => {
    return imgs.map((image, idx) => {
      return (
        <SwiperSlide className={styles.customSwiperSlide} key={image}>
          <img
            onError={addDefaultSrc}
            className={styles.customImageSlide}
            src={(image && image) || DefaultImage}
            alt=""
          />
        </SwiperSlide>
      );
    });
  };

  return (
    <>
      <div className={cls('relative')}>
        <div className={cls('swiper-container', styles.customSwiper)}>
          <Swiper
            onSwiper={(swiper) => setSwiperClone(swiper)}
            slidesPerView={1}
            pagination={{ clickable: true }}
          >
            {images && renderSlide(images)}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default SwiperImage;
