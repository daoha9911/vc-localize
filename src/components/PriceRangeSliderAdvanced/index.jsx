/* eslint-disable */
import React from 'react';
import { convertPositionFromPrice } from '@/utils/utils';
import styles from './index.less';
import { useDispatch } from 'dva';
const PriceRangeSliderAdvanced = ({ under1, under2, mean, over1, over2, pricePerM2 }) => {
  // console.log(convertPositionFromPrice(under2, pricePerM2, over1))
  const dispatch = useDispatch();
  const handleOnclick = () => {
    dispatch({ type: 'formregister/openForm' });
  };
  return (
    <>
      <div className={styles.Advanced_Quote}>
        <h2 className={styles.Advanced_QuoteH2}>Dự đoán giá tương lai</h2>
      </div>
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
        <div
          className={styles.PriceRangeSlider_PriceMean}
          style={
            pricePerM2 && {
              left: `${convertPositionFromPrice(under2, pricePerM2, over2)}%`,
            }
          }
        />
      </div>
      <div className={styles.Advanced_Content}>
        <span
          className="cursor-not-allowed"
          style={{
            color: '#cbd5e0',
          }}
        >
          Để xem thêm những thông tin nâng cao về căn nhà cùng những phân tích chuyên sâu về giá từ
          các chuyên gia vui lòng{' '}
          {/* <span onClick={handleOnclick} className={styles.Advanced_Content_Login}> */}
          đăng nhập.
          {/* </span> */}
        </span>
      </div>
    </>
  );
};

export default PriceRangeSliderAdvanced;
