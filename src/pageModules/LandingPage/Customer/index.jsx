import React, { useState, useEffect } from 'react';

import cls from 'classnames';

import { MockCustomer } from './constants';

import styles from './index.less';

const Customer = () => {
  const [currentCustomer, setCurrentCustomer] = useState(MockCustomer[0]);
  const [current, setCurrent] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const newCurrent = current < 1 ? current + 1 : 0;
  //     setCurrent(newCurrent);
  //     setCurrentCustomer(MockCustomer[newCurrent]);
  //   }, 3000);
  //   return () => clearInterval(interval);
  // });

  return (
    <section className={`${styles.container} w1200`}>
      <h2 className={styles.title}>
        Khách hàng <br /> nhận xét về chúng tôi
      </h2>
      <div className={styles.group}>
        <div className={styles.detail}>
          <div className={styles.quote}>
            <h2>“{currentCustomer?.quote}”</h2>
          </div>
          <div className={styles.desc}>
            <p>{currentCustomer?.description}</p>
          </div>
          <div className={styles.customer}>
            <div className={styles.groupLeft}>
              <div className={styles.name}>{currentCustomer?.name}</div>
              <div className={styles.job}>
                <span className={styles.highlight}>{currentCustomer?.job}</span> ,{' '}
                {currentCustomer?.address}
              </div>
            </div>
            {/* <div className={styles.groupRight}>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={70}
                    height={70}
                    viewBox="0 0 70 70"
                    fill="none"
                  >
                    <g filter="url(#filter0_d)">
                      <circle
                        cx={35}
                        cy={31}
                        r={23}
                        transform="rotate(-180 35 31)"
                        fill="url(#paint0_linear)"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M30.6922 24.2745C30.7854 24.3674 30.8594 24.4779 30.9098 24.5995C30.9603 24.721 30.9863 24.8514 30.9863 24.983C30.9863 25.1147 30.9603 25.245 30.9098 25.3666C30.8594 25.4882 30.7854 25.5986 30.6922 25.6916L25.3942 30.9876L30.6922 36.2837C30.7853 36.3767 30.8591 36.4872 30.9095 36.6087C30.9598 36.7303 30.9857 36.8606 30.9857 36.9922C30.9857 37.1238 30.9598 37.2541 30.9095 37.3757C30.8591 37.4972 30.7853 37.6077 30.6922 37.7007C30.5992 37.7938 30.4887 37.8676 30.3672 37.918C30.2456 37.9683 30.1153 37.9942 29.9837 37.9942C29.8521 37.9942 29.7218 37.9683 29.6002 37.918C29.4787 37.8676 29.3682 37.7938 29.2752 37.7007L23.2706 31.6962C23.1774 31.6032 23.1034 31.4928 23.053 31.3712C23.0025 31.2496 22.9766 31.1192 22.9766 30.9876C22.9766 30.856 23.0025 30.7256 23.053 30.6041C23.1034 30.4825 23.1774 30.372 23.2706 30.2791L29.2752 24.2745C29.3681 24.1813 29.4786 24.1073 29.6001 24.0569C29.7217 24.0064 29.8521 23.9805 29.9837 23.9805C30.1153 23.9805 30.2457 24.0064 30.3673 24.0569C30.4889 24.1073 30.5993 24.1813 30.6922 24.2745Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M23.9795 30.9866C23.9795 30.7212 24.0849 30.4666 24.2726 30.279C24.4603 30.0913 24.7148 29.9858 24.9803 29.9858L45.9963 29.9858C46.2617 29.9858 46.5163 30.0913 46.704 30.279C46.8917 30.4666 46.9971 30.7212 46.9971 30.9866C46.9971 31.252 46.8917 31.5066 46.704 31.6943C46.5163 31.8819 46.2617 31.9874 45.9963 31.9874L24.9803 31.9874C24.7148 31.9874 24.4603 31.8819 24.2726 31.6943C24.0849 31.5066 23.9795 31.252 23.9795 30.9866Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_d"
                        x={0}
                        y={0}
                        width={70}
                        height={70}
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity={0} result="BackgroundImageFix" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        />
                        <feOffset dy={4} />
                        <feGaussianBlur stdDeviation={6} />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0.145098 0 0 0 0 0.670588 0 0 0 0 0.643137 0 0 0 0.5 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow"
                          result="shape"
                        />
                      </filter>
                      <linearGradient
                        id="paint0_linear"
                        x1="15.2583"
                        y1="26.9412"
                        x2="58.1549"
                        y2="27.7042"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#39BC90" />
                        <stop offset={1} stopColor="#25ABA4" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div>
                  <svg
                    width={70}
                    height={70}
                    viewBox="0 0 70 70"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_d)">
                      <circle cx={35} cy={31} r={23} fill="url(#paint0_linear)" />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M39.3078 37.7255C39.2146 37.6326 39.1406 37.5221 39.0902 37.4005C39.0397 37.279 39.0137 37.1486 39.0137 37.017C39.0137 36.8853 39.0397 36.755 39.0902 36.6334C39.1406 36.5118 39.2146 36.4014 39.3078 36.3084L44.6058 31.0124L39.3078 25.7163C39.2147 25.6233 39.1409 25.5128 39.0905 25.3913C39.0402 25.2697 39.0143 25.1394 39.0143 25.0078C39.0143 24.8762 39.0402 24.7459 39.0905 24.6243C39.1409 24.5028 39.2147 24.3923 39.3078 24.2993C39.4008 24.2062 39.5113 24.1324 39.6328 24.082C39.7544 24.0317 39.8847 24.0058 40.0163 24.0058C40.1479 24.0058 40.2782 24.0317 40.3998 24.082C40.5213 24.1324 40.6318 24.2062 40.7248 24.2993L46.7294 30.3038C46.8226 30.3968 46.8966 30.5072 46.947 30.6288C46.9975 30.7504 47.0234 30.8808 47.0234 31.0124C47.0234 31.144 46.9975 31.2744 46.947 31.3959C46.8966 31.5175 46.8226 31.628 46.7294 31.7209L40.7248 37.7255C40.6319 37.8187 40.5214 37.8927 40.3999 37.9431C40.2783 37.9936 40.1479 38.0195 40.0163 38.0195C39.8847 38.0195 39.7543 37.9936 39.6327 37.9431C39.5111 37.8927 39.4007 37.8187 39.3078 37.7255Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M46.0205 31.0134C46.0205 31.2788 45.9151 31.5334 45.7274 31.721C45.5397 31.9087 45.2852 32.0142 45.0197 32.0142L24.0037 32.0142C23.7383 32.0142 23.4837 31.9087 23.296 31.721C23.1083 31.5334 23.0029 31.2788 23.0029 31.0134C23.0029 30.748 23.1083 30.4934 23.296 30.3057C23.4837 30.1181 23.7383 30.0126 24.0037 30.0126L45.0197 30.0126C45.2852 30.0126 45.5397 30.1181 45.7274 30.3057C45.9151 30.4934 46.0205 30.748 46.0205 31.0134Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_d"
                        x={0}
                        y={0}
                        width={70}
                        height={70}
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity={0} result="BackgroundImageFix" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        />
                        <feOffset dy={4} />
                        <feGaussianBlur stdDeviation={6} />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0.145098 0 0 0 0 0.670588 0 0 0 0 0.643137 0 0 0 0.5 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow"
                          result="shape"
                        />
                      </filter>
                      <linearGradient
                        id="paint0_linear"
                        x1="15.2583"
                        y1="26.9412"
                        x2="58.1549"
                        y2="27.7042"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#39BC90" />
                        <stop offset={1} stopColor="#25ABA4" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div> */}
          </div>
          <div className={styles.customers}>
            {MockCustomer &&
              Array.isArray(MockCustomer) &&
              MockCustomer.length > 0 &&
              MockCustomer.map((cus) => {
                return (
                  <div
                    key={`${cus.id} - ${cus.name}`}
                    className={cls(styles.item, { [styles.active]: cus.id === currentCustomer.id })}
                    onClick={() => {
                      setCurrentCustomer(cus);
                    }}
                  >
                    <div className={styles.avatar}>
                      <img src={cus.avatar} alt="introl_images" />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className={styles.avatarImage}>
          <img src={currentCustomer?.avatar} alt="introl_images" />
        </div>
      </div>
    </section>
  );
};

export default Customer;
