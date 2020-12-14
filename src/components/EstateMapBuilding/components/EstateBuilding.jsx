import React from 'react';
// import MockImageBuilding from '@/static/web_images/MockImageBuilding.png';
import cls from 'classnames';
import styles from '../index.less';

const EstateBuilding = ({ data, handleClick }) => {
  return (
    <>
      {data && (
        <div
          className={cls('flex', styles.EstateBuilding_Component)}
          onClick={() => {
            handleClick(data?._id);
          }}
        >
          <div className={styles.EstateBuilding_ImageWrapper}>
            <img src={data?.images.split(',')[0]} alt="" />
          </div>
          <div className={cls('flex flex-col', styles.EstateBuilding_ContentWrapper)}>
            <div className={styles.introDay}>
              <span>Mới</span>
            </div>
            <div className="mt-2 mb-1">
              <span className={styles.spanPrice}>{data?.price}</span>
            </div>
            <div>
              <span className={cls('mr-1', styles.spanDescription)}>{data?.numBedroom} Phòng</span>
              <span className={styles.spanDescription}>{data?.size}m²</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EstateBuilding;
