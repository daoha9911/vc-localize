/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Button, Input, Spin } from 'antd';
import cls from 'classnames';
import { normalizeSeoText } from '@/utils/utils';
import useSearchLocation from '@/hooks/useSearchLocation';
import BannerImage from '@/static/web_images/Banner.png';
import styles from './index.less';

const Banner = () => {
  const {
    loading,
    suggestions,
    handleInputChange,
    inputValue,
    handleSuggestionSelect,
    handleSubmit
  } = useSearchLocation();
  return (
    <section className={`${styles.container}`}>
      <div className={`flex items-start justify-between w1200 ${styles.wrap}`}>
        <div className="mt-5">
          <h1 className={styles.title}>
            Khám phá <br /> nơi bạn muốn sống
          </h1>
          <div className={styles.link}>
            <div className={styles.link_wrap}>
              <a className={styles.active} href="#" title="Mua nhà">
                Mua nhà
              </a>
              <a href="#" title="Thuê nhà">
                Thuê nhà
              </a>
            </div>
          </div>
          <div className={cls('mt-4 flex justify-center items-start')} style={{ maxWidth: '100%' }}>
            <div className={cls(styles.searchLocationWrapper, 'relative')}>
              <React.Fragment>
                <Input
                  onChange={(e) => {
                    handleInputChange(e?.target?.value);
                  }}
                  style={{
                    outline: 'none',
                    padding: 0,
                  }}
                  className={styles.searchLocation}
                  placeholder="Khu vực, địa chỉ, v.v...."
                  value={inputValue}
                  onPressEnter={handleSubmit}
                />
                {suggestions && Array.isArray(suggestions) && suggestions.length > 0 && (
                  <div className={styles.searchLocation_suggestions}>
                    {suggestions.map((s) => (
                      <div
                        key={s}
                        className={styles.searchLocation_suggestionItem}
                        onClick={() => {
                          handleSuggestionSelect(s);
                        }}
                      >
                        {s}
                      </div>
                    ))}
                  </div>
                )}
              </React.Fragment>
            </div>
            <Button
              className={cls('flex items-center', styles.customSearchButton)}
              onClick={handleSubmit}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
              >
                <path
                  d="M8 0.75C12.0041 0.75 15.25 3.99594 15.25 8C15.25 9.7319 14.6427 11.3219 13.6295 12.5688L18.5303 17.4697C18.8232 17.7626 18.8232 18.2374 18.5303 18.5303C18.2641 18.7966 17.8474 18.8208 17.5538 18.6029L17.4697 18.5303L12.5688 13.6295C11.3219 14.6427 9.7319 15.25 8 15.25C3.99594 15.25 0.75 12.0041 0.75 8C0.75 3.99594 3.99594 0.75 8 0.75ZM8 2.25C4.82436 2.25 2.25 4.82436 2.25 8C2.25 11.1756 4.82436 13.75 8 13.75C11.1756 13.75 13.75 11.1756 13.75 8C13.75 4.82436 11.1756 2.25 8 2.25Z"
                  fill="white"
                />
              </svg>
            </Button>
          </div>
        </div>
        <div
          className={`flex justify-center ${styles.photo}`}
          style={{ backgroundImage: `url(${BannerImage})` }}
        />
      </div>
    </section>
  );
};

export default Banner;
