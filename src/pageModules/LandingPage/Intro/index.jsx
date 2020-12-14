import React from 'react';
import BuyHouseIcon from '@/static/web_images/BuyHouse_Icon.svg';
import RentHouseIcon from '@/static/web_images/RentHouse_Icon.svg';
import PriceHouseIcon from '@/static/web_images/PriceHouse_Icon.svg';
import introImages from '@/static/web_images/intro_images.png';
import { Image } from 'antd';

import styles from './index.less';

const Intro = () => {
  return (
    <section className={`${styles.container} w1200`}>
      <div className={`flex justify-between ${styles.intro}`}>
        <div className={styles.avatarImage}>
          <img src={introImages} alt="introl_images" />
        </div>
        <div className={styles.muna_greedted_text}>
          <h2 className={styles.muna_greedted_title}>
            Chào mừng đến với <span className={styles.highLight}>MUNA</span>
          </h2>
          <div className={styles.muna_greedted_subtitle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Senectus egestas sed at purus
            dictum nunc, bibendum. Eget eget a at erat fermentum. Augue magnis eleifend nam dui eu
            amet, dapibus consectetur elementum. Commodo ultrices at ac sapien est sed.
          </div>
          <div className={styles.muna_greedted_subtitle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Senectus egestas sed at purus
            dictum nunc, bibendum. Eget eget a at erat fermentum. Augue magnis eleifend nam dui eu
            amet, dapibus consectetur elementum. Commodo ultrices at ac sapien est sed.
          </div>
        </div>
      </div>
      <h2 className={styles.title}>
        <span className={styles.highLight}>MUNA</span> có thể giúp bạn
      </h2>
      <div className={styles.list}>
        <div className={styles.item}>
          <div className={styles.photo}>
            <img src={BuyHouseIcon} />
          </div>
          <div className={styles.text}>
            <h3 className={styles.name}>
              <a href="#" title="Mua nhà">
                Mua nhà
              </a>
            </h3>
            <div className={styles.desc}>
              Với hơn 1 triệu căn nhà được đăng bán trên website, chúng tôi sẽ giúp bạn tìm kiếm
              ngôi nhà phù hợp nhất dành cho mình.
            </div>
            <div className={styles.more}>
              <svg
                width={46}
                height={46}
                viewBox="0 0 46 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx={23} cy={23} r={23} fill="#1890FF" fillOpacity="0.3" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M27.3078 29.7255C27.2146 29.6326 27.1406 29.5221 27.0902 29.4005C27.0397 29.279 27.0137 29.1486 27.0137 29.017C27.0137 28.8853 27.0397 28.755 27.0902 28.6334C27.1406 28.5118 27.2146 28.4014 27.3078 28.3084L32.6058 23.0124L27.3078 17.7163C27.2147 17.6233 27.1409 17.5128 27.0905 17.3913C27.0402 17.2697 27.0143 17.1394 27.0143 17.0078C27.0143 16.8762 27.0402 16.7459 27.0905 16.6243C27.1409 16.5028 27.2147 16.3923 27.3078 16.2993C27.4008 16.2062 27.5113 16.1324 27.6328 16.082C27.7544 16.0317 27.8847 16.0058 28.0163 16.0058C28.1479 16.0058 28.2782 16.0317 28.3998 16.082C28.5213 16.1324 28.6318 16.2062 28.7248 16.2993L34.7294 22.3038C34.8226 22.3968 34.8966 22.5072 34.947 22.6288C34.9975 22.7504 35.0234 22.8808 35.0234 23.0124C35.0234 23.144 34.9975 23.2744 34.947 23.3959C34.8966 23.5175 34.8226 23.628 34.7294 23.7209L28.7248 29.7255C28.6319 29.8187 28.5214 29.8927 28.3999 29.9431C28.2783 29.9936 28.1479 30.0195 28.0163 30.0195C27.8847 30.0195 27.7543 29.9936 27.6327 29.9431C27.5111 29.8927 27.4007 29.8187 27.3078 29.7255Z"
                  fill="#1890FF"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M34.0205 23.0129C34.0205 23.2783 33.9151 23.5329 33.7274 23.7206C33.5397 23.9082 33.2852 24.0137 33.0197 24.0137L12.0037 24.0137C11.7383 24.0137 11.4837 23.9082 11.296 23.7206C11.1083 23.5329 11.0029 23.2783 11.0029 23.0129C11.0029 22.7475 11.1083 22.4929 11.296 22.3053C11.4837 22.1176 11.7383 22.0121 12.0037 22.0121L33.0197 22.0121C33.2852 22.0121 33.5397 22.1176 33.7274 22.3053C33.9151 22.4929 34.0205 22.7475 34.0205 23.0129Z"
                  fill="#1890FF"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className={`${styles.item} mt-8`}>
          <div className={styles.photo}>
            <img src={RentHouseIcon} />
          </div>
          <div className={styles.text}>
            <h3 className={styles.name}>
              <a href="#" title="Thuê nhà">
                Thuê nhà
              </a>
            </h3>
            <div className={styles.desc}>
              Chúng tôi có thể giúp bạn dễ dàng tìm kiếm một ngôi nhà hoặc một căn hộ cho thuê phù
              hợp dành cho bạn.
            </div>
            <div className={styles.more}>
              <svg
                width={46}
                height={46}
                viewBox="0 0 46 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx={23} cy={23} r={23} fill="#F35828" fillOpacity="0.2" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M27.3078 29.7255C27.2146 29.6326 27.1406 29.5221 27.0902 29.4005C27.0397 29.279 27.0137 29.1486 27.0137 29.017C27.0137 28.8853 27.0397 28.755 27.0902 28.6334C27.1406 28.5118 27.2146 28.4014 27.3078 28.3084L32.6058 23.0124L27.3078 17.7163C27.2147 17.6233 27.1409 17.5128 27.0905 17.3913C27.0402 17.2697 27.0143 17.1394 27.0143 17.0078C27.0143 16.8762 27.0402 16.7459 27.0905 16.6243C27.1409 16.5028 27.2147 16.3923 27.3078 16.2993C27.4008 16.2062 27.5113 16.1324 27.6328 16.082C27.7544 16.0317 27.8847 16.0058 28.0163 16.0058C28.1479 16.0058 28.2782 16.0317 28.3998 16.082C28.5213 16.1324 28.6318 16.2062 28.7248 16.2993L34.7294 22.3038C34.8226 22.3968 34.8966 22.5072 34.947 22.6288C34.9975 22.7504 35.0234 22.8808 35.0234 23.0124C35.0234 23.144 34.9975 23.2744 34.947 23.3959C34.8966 23.5175 34.8226 23.628 34.7294 23.7209L28.7248 29.7255C28.6319 29.8187 28.5214 29.8927 28.3999 29.9431C28.2783 29.9936 28.1479 30.0195 28.0163 30.0195C27.8847 30.0195 27.7543 29.9936 27.6327 29.9431C27.5111 29.8927 27.4007 29.8187 27.3078 29.7255Z"
                  fill="#F35828"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M34.0205 23.0129C34.0205 23.2783 33.9151 23.5329 33.7274 23.7206C33.5397 23.9082 33.2852 24.0137 33.0197 24.0137L12.0037 24.0137C11.7383 24.0137 11.4837 23.9082 11.296 23.7206C11.1083 23.5329 11.0029 23.2783 11.0029 23.0129C11.0029 22.7475 11.1083 22.4929 11.296 22.3053C11.4837 22.1176 11.7383 22.0121 12.0037 22.0121L33.0197 22.0121C33.2852 22.0121 33.5397 22.1176 33.7274 22.3053C33.9151 22.4929 34.0205 22.7475 34.0205 23.0129Z"
                  fill="#F35828"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className={`${styles.item} mt-16`}>
          <div className={styles.photo}>
            <img src={PriceHouseIcon} />
          </div>
          <div className={styles.text}>
            <h3 className={styles.name}>
              <a href="#" title="Định giá BĐS">
                Định giá BĐS
              </a>
            </h3>
            <div className={styles.desc}>
              Dựa trên công nghệ trí tuệ nhân tạo và phân tích từ các chuyên gia, chúng tôi có thể
              giúp bạn định giá bất động sản mà bạn đang sở hữu.
            </div>
            <div className={styles.more}>
              <svg
                width={46}
                height={46}
                viewBox="0 0 46 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx={23} cy={23} r={23} fill="#00AEAC" fillOpacity="0.2" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M27.3078 29.7255C27.2146 29.6326 27.1406 29.5221 27.0902 29.4005C27.0397 29.279 27.0137 29.1486 27.0137 29.017C27.0137 28.8853 27.0397 28.755 27.0902 28.6334C27.1406 28.5118 27.2146 28.4014 27.3078 28.3084L32.6058 23.0124L27.3078 17.7163C27.2147 17.6233 27.1409 17.5128 27.0905 17.3913C27.0402 17.2697 27.0143 17.1394 27.0143 17.0078C27.0143 16.8762 27.0402 16.7459 27.0905 16.6243C27.1409 16.5028 27.2147 16.3923 27.3078 16.2993C27.4008 16.2062 27.5113 16.1324 27.6328 16.082C27.7544 16.0317 27.8847 16.0058 28.0163 16.0058C28.1479 16.0058 28.2782 16.0317 28.3998 16.082C28.5213 16.1324 28.6318 16.2062 28.7248 16.2993L34.7294 22.3038C34.8226 22.3968 34.8966 22.5072 34.947 22.6288C34.9975 22.7504 35.0234 22.8808 35.0234 23.0124C35.0234 23.144 34.9975 23.2744 34.947 23.3959C34.8966 23.5175 34.8226 23.628 34.7294 23.7209L28.7248 29.7255C28.6319 29.8187 28.5214 29.8927 28.3999 29.9431C28.2783 29.9936 28.1479 30.0195 28.0163 30.0195C27.8847 30.0195 27.7543 29.9936 27.6327 29.9431C27.5111 29.8927 27.4007 29.8187 27.3078 29.7255Z"
                  fill="#00918C"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M34.0205 23.0129C34.0205 23.2783 33.9151 23.5329 33.7274 23.7206C33.5397 23.9082 33.2852 24.0137 33.0197 24.0137L12.0037 24.0137C11.7383 24.0137 11.4837 23.9082 11.296 23.7206C11.1083 23.5329 11.0029 23.2783 11.0029 23.0129C11.0029 22.7475 11.1083 22.4929 11.296 22.3053C11.4837 22.1176 11.7383 22.0121 12.0037 22.0121L33.0197 22.0121C33.2852 22.0121 33.5397 22.1176 33.7274 22.3053C33.9151 22.4929 34.0205 22.7475 34.0205 23.0129Z"
                  fill="#00918C"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
