/* eslint-disable */
import React from 'react';
import { convertPositionFromPrice } from '@/utils/utils';
import styles from './index.less';

const PriceRangeSlider = ({ under1, under2, mean, over1, over2, pricePerM2 }) => {
  // console.log(convertPositionFromPrice(under2, pricePerM2, over1))
  return (
    <>
      <div className={styles.PriceRangeSlider_Wrapper}>
        <div className={styles.PriceRangeSlider_MaxPrice}>
          <h2>Cao nhất: {over2 ? over2.toFixed(2) : 0}</h2>
        </div>
        <div className={styles.PriceRangeSlider_Rail} />
        <div className={styles.PriceRangeSlider_Track}>
          <div className={styles.PriceRangeSlider_Track1} />
          <div
            className={styles.PriceRangeSlider_Track2}
            style={
              under1 && {
                left: `${convertPositionFromPrice(under2, under1, over2)}%`,
                width: `calc(100% - ${convertPositionFromPrice(under2, under1, over2)}%)`,
              }
            }
          />
          <div
            className={styles.PriceRangeSlider_Track3}
            style={
              over1 && {
                left: `${convertPositionFromPrice(under2, over1, over2)}%`,
                width: `calc(100% - ${convertPositionFromPrice(under2, over1, over2)}%)`,
              }
            }
          />
        </div>
        <div className={styles.PriceRangeSlider_Mask}>
          <div className={styles.PriceRangeSlider_MaskUnder2}>
            <span>{under2 ? under2.toFixed(2) : 0}</span>
          </div>
          <div
            className={styles.PriceRangeSlider_MaskUnder1}
            style={
              under1 && {
                left: `${convertPositionFromPrice(under2, under1, over2) - 3}%`,
              }
            }
          >
            <span>{under1 ? under1.toFixed(2) : 0}</span>
          </div>
          <div className={styles.PriceRangeSlider_MaskMean}>
            <div className="flex flex-col justify-center items-center">
              <span>Trung Bình </span>
              <span>{mean ? mean.toFixed(2) : 0}</span>
            </div>
          </div>
          <div
            className={styles.PriceRangeSlider_MaskPricePerM2}
            style={
              pricePerM2 && {
                left: `${convertPositionFromPrice(under2, pricePerM2, over2) - 2}%`,
              }
            }
          >
            <span>{pricePerM2 ? pricePerM2.toFixed(2) : 0}</span>
          </div>
          <div
            className={styles.PriceRangeSlider_MaskUnder1}
            style={
              over1 && {
                left: `${convertPositionFromPrice(under2, mean, over1) + 5}%`,
              }
            }
          >
            <span>{over1 ? over1.toFixed(2) : 0}</span>
          </div>
        </div>
        <div
          className={styles.PriceRangeSlider_PriceMean}
          style={
            pricePerM2 && {
              left: `${convertPositionFromPrice(under2, pricePerM2, over2)}%`,
            }
          }
        />
      </div>
    </>
  );
};

export default PriceRangeSlider;
