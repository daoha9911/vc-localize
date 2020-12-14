import React from 'react';
import { Image } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.css';

import BuildingImage from '@/static/web_images/Building.png';

import styles from './index.less';

SwiperCore.use([Pagination, Autoplay]);

const Customer = () => {
  return (
    <section className={`${styles.container} w1200 relative`}>
      <h2 className={styles.title}>Biến động giá bất động sản</h2>
      <p className={styles.subtitle}>Năm 2020-2021 tại Hà Nội</p>
      <div className="flex">
        <div className={`${styles.item} ${styles.outsite} `}>
          <div className={styles.wrap}>
            <div className={styles.icon}>
              <svg
                width={49}
                height={49}
                viewBox="0 0 49 49"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0)">
                  <path
                    d="M20.6574 2.75434L20.6741 2.67786L20.6741 35.4664L10.3439 25.1589C9.83957 24.6542 9.15636 24.3773 8.43928 24.3773C7.72221 24.3773 7.04378 24.6542 6.53824 25.1589L4.93359 26.7628C4.42925 27.2671 4.15039 27.9392 4.15039 28.6558C4.15039 29.3729 4.42726 30.0454 4.9316 30.5497L22.5991 48.2188C23.1054 48.7251 23.7799 49.002 24.4973 49C25.2188 49.002 25.8936 48.7251 26.3992 48.2188L44.0683 30.5497C44.5722 30.0454 44.8495 29.3733 44.8495 28.6558C44.8495 27.9392 44.5718 27.2671 44.0683 26.7628L42.4636 25.1589C41.9601 24.6542 41.2876 24.3773 40.5705 24.3773C39.8539 24.3773 39.2169 24.6542 38.7129 25.1589L28.3249 35.5828L28.3249 2.71769C28.3249 1.24092 27.0521 -1.14441e-05 25.5761 -1.14441e-05H23.3066C21.8306 -1.14441e-05 20.6574 1.27757 20.6574 2.75434Z"
                    fill="#FE0000"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect
                      width={49}
                      height={49}
                      fill="white"
                      transform="translate(0 49) rotate(-90)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className={styles.detail}>
              <span>Đống Đa</span>
              <span>{'< 80tr/m²'}</span>
            </div>
          </div>
        </div>
        <Swiper
          slidesPerView={1}
          loop
          speed={800}
          autoplay
          breakpoints={{
            576: {
              slidesPerView: 1,
            },
            992: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 3,
            },
          }}
          className={`${styles.customSwiper} ${styles.insite}`}
        >
          <SwiperSlide className={styles.customSwiperSlide}>
            <div className={styles.item}>
              <div className={styles.wrap}>
                <div className={styles.icon}>
                  <svg
                    width={49}
                    height={49}
                    viewBox="0 0 49 49"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0)">
                      <path
                        d="M28.3426 46.2457L28.3259 46.3221L28.3259 13.5336L38.6561 23.8411C39.1604 24.3458 39.8436 24.6227 40.5607 24.6227C41.2778 24.6227 41.9562 24.3458 42.4618 23.8411L44.0664 22.2372C44.5707 21.7329 44.8496 21.0608 44.8496 20.3442C44.8496 19.6271 44.5727 18.9546 44.0684 18.4503L26.4009 0.781222C25.8946 0.274889 25.2201 -0.0019812 24.5027 1.0673e-05C23.7812 -0.0019812 23.1064 0.274889 22.6008 0.781222L4.93174 18.4503C4.4278 18.9546 4.15053 19.6267 4.15053 20.3442C4.15053 21.0608 4.4282 21.7329 4.93174 22.2372L6.53639 23.8411C7.03994 24.3458 7.71239 24.6227 8.42947 24.6227C9.14614 24.6227 9.78314 24.3458 10.2871 23.8411L20.6751 13.4172L20.6751 46.2823C20.6751 47.7591 21.9479 49 23.4239 49H25.6934C27.1694 49 28.3426 47.7224 28.3426 46.2457Z"
                        fill="#0CBD39"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect
                          width={49}
                          height={49}
                          fill="white"
                          transform="translate(49) rotate(90)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className={styles.detail}>
                  <span>Cầu giấy</span>
                  <span>{'> 80tr/m²'}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.customSwiperSlide}>
            <div className={styles.item}>
              <div className={styles.wrap}>
                <div className={styles.icon}>
                  <svg
                    width={49}
                    height={49}
                    viewBox="0 0 49 49"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0)">
                      <path
                        d="M28.3426 46.2457L28.3259 46.3221L28.3259 13.5336L38.6561 23.8411C39.1604 24.3458 39.8436 24.6227 40.5607 24.6227C41.2778 24.6227 41.9562 24.3458 42.4618 23.8411L44.0664 22.2372C44.5707 21.7329 44.8496 21.0608 44.8496 20.3442C44.8496 19.6271 44.5727 18.9546 44.0684 18.4503L26.4009 0.781222C25.8946 0.274889 25.2201 -0.0019812 24.5027 1.0673e-05C23.7812 -0.0019812 23.1064 0.274889 22.6008 0.781222L4.93174 18.4503C4.4278 18.9546 4.15053 19.6267 4.15053 20.3442C4.15053 21.0608 4.4282 21.7329 4.93174 22.2372L6.53639 23.8411C7.03994 24.3458 7.71239 24.6227 8.42947 24.6227C9.14614 24.6227 9.78314 24.3458 10.2871 23.8411L20.6751 13.4172L20.6751 46.2823C20.6751 47.7591 21.9479 49 23.4239 49H25.6934C27.1694 49 28.3426 47.7224 28.3426 46.2457Z"
                        fill="#0CBD39"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect
                          width={49}
                          height={49}
                          fill="white"
                          transform="translate(49) rotate(90)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className={styles.detail}>
                  <span>Hoàn kiếm</span>
                  <span>{'> 80tr/m²'}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.customSwiperSlide}>
            <div className={styles.item}>
              <div className={styles.wrap}>
                <div className={styles.icon}>
                  <svg
                    width={49}
                    height={49}
                    viewBox="0 0 49 49"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0)">
                      <path
                        d="M20.6574 2.75434L20.6741 2.67786L20.6741 35.4664L10.3439 25.1589C9.83957 24.6542 9.15636 24.3773 8.43928 24.3773C7.72221 24.3773 7.04378 24.6542 6.53824 25.1589L4.93359 26.7628C4.42925 27.2671 4.15039 27.9392 4.15039 28.6558C4.15039 29.3729 4.42726 30.0454 4.9316 30.5497L22.5991 48.2188C23.1054 48.7251 23.7799 49.002 24.4973 49C25.2188 49.002 25.8936 48.7251 26.3992 48.2188L44.0683 30.5497C44.5722 30.0454 44.8495 29.3733 44.8495 28.6558C44.8495 27.9392 44.5718 27.2671 44.0683 26.7628L42.4636 25.1589C41.9601 24.6542 41.2876 24.3773 40.5705 24.3773C39.8539 24.3773 39.2169 24.6542 38.7129 25.1589L28.3249 35.5828L28.3249 2.71769C28.3249 1.24092 27.0521 -1.14441e-05 25.5761 -1.14441e-05H23.3066C21.8306 -1.14441e-05 20.6574 1.27757 20.6574 2.75434Z"
                        fill="#FE0000"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect
                          width={49}
                          height={49}
                          fill="white"
                          transform="translate(0 49) rotate(-90)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className={styles.detail}>
                  <span>Long Biên</span>
                  <span>{'< 80tr/m²'}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className={styles.customSwiperSlide}>
            <div className={styles.item}>
              <div className={styles.wrap}>
                <div className={styles.icon}>
                  <svg
                    width={49}
                    height={49}
                    viewBox="0 0 49 49"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0)">
                      <path
                        d="M20.6574 2.75434L20.6741 2.67786L20.6741 35.4664L10.3439 25.1589C9.83957 24.6542 9.15636 24.3773 8.43928 24.3773C7.72221 24.3773 7.04378 24.6542 6.53824 25.1589L4.93359 26.7628C4.42925 27.2671 4.15039 27.9392 4.15039 28.6558C4.15039 29.3729 4.42726 30.0454 4.9316 30.5497L22.5991 48.2188C23.1054 48.7251 23.7799 49.002 24.4973 49C25.2188 49.002 25.8936 48.7251 26.3992 48.2188L44.0683 30.5497C44.5722 30.0454 44.8495 29.3733 44.8495 28.6558C44.8495 27.9392 44.5718 27.2671 44.0683 26.7628L42.4636 25.1589C41.9601 24.6542 41.2876 24.3773 40.5705 24.3773C39.8539 24.3773 39.2169 24.6542 38.7129 25.1589L28.3249 35.5828L28.3249 2.71769C28.3249 1.24092 27.0521 -1.14441e-05 25.5761 -1.14441e-05H23.3066C21.8306 -1.14441e-05 20.6574 1.27757 20.6574 2.75434Z"
                        fill="#FE0000"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect
                          width={49}
                          height={49}
                          fill="white"
                          transform="translate(0 49) rotate(-90)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className={styles.detail}>
                  <span>Hà Đông</span>
                  <span>{'< 80tr/m²'}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className={styles.img}>
        <Image src={BuildingImage} />
      </div>
    </section>
  );
};

export default Customer;
