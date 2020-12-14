import React from 'react';
import cls from 'classnames';
import SwiperImage from './components/SwiperImage';
import styles from './index.less';

const EstateHouseMap = ({ data }) => {
  return (
    <>
      {data && (
        <div className={cls('flex-col')}>
          <div className="cursor-pointer">
            <SwiperImage images={data?.images?.split(',')?.slice(0, 4)} />
            <div className="p-4">
              <div className="mt-1 mb-1">
                <span className={styles.spanPrice}>{data?.price}</span>
              </div>
              <div>
                <span className={styles.spanDescription}>{data?.numBedroom} Phòng ngủ</span>
                <span className={styles.spanDescription}>{data?.size} m²</span>
                <span className={styles.spanDescription}>
                  {data && data?.type === 'sale_apartment' ? 'Chung cư' : 'Nhà mặt đất'}
                </span>
              </div>
              <div>
                <span className={styles.spanAdress}>{data?.address}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EstateHouseMap;
