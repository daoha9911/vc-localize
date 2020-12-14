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

const SwiperImage = ({ images }) => {
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
        <div className={cls('absolute', styles.customInto)}>
          <div className={cls('flex justify-between items-center')}>
            <div className={styles.introDay}>
              <span>Mới</span>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="21"
                viewBox="0 0 16 21"
                fill="none"
              >
                <path
                  d="M1.5 3C1.5 1.89543 2.39543 1 3.5 1H12.5C13.6046 1 14.5 1.89543 14.5 3V18.4535C14.5 19.3623 13.3856 19.7999 12.7672 19.1339L8.73279 14.7892C8.33716 14.3631 7.66284 14.3631 7.26721 14.7892L3.23279 19.1339C2.61435 19.7999 1.5 19.3623 1.5 18.4535V3Z"
                  fill="white"
                  stroke="#ED411C"
                  strokeWidth="1.2"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SwiperImage;
