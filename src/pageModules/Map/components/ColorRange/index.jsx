/* eslint-disable */
import React, { useState, useCallback } from 'react';

import { Tooltip } from 'antd';
import cls from 'classnames';

import iconHot from '@/static/web_images/hot.png';
import iconPrice from '@/static/web_images/price.png';

import styles from './index.less';

const ColorRange = ({ map, colorRanges }) => {
  const [icon, setIcon] = useState(true);

  const renderColorRangeMin = useCallback(
    (zoom, colorRangeData) => {
      if (!isNaN(colorRangeData?.province?.meta?.max)) {
        if (zoom <= 10.5) {
          return parseFloat(colorRangeData?.province?.meta?.max).toFixed(2) || 0;
        }
        if (zoom > 10.5) {
          return colorRangeData?.district?.meta?.max
            ? parseFloat(colorRangeData?.district?.meta?.max).toFixed(2)
            : 0;
        }
      }
      return 0;
    },
    [map],
  );

  const renderColorRangeMax = useCallback(
    (zoom, colorRangeData) => {
      if (!isNaN(colorRangeData?.province?.meta?.min)) {
        if (zoom <= 10.5) {
          return parseFloat(colorRangeData?.province?.meta?.min).toFixed(2) || 0;
        }
        if (zoom > 10.5) {
          return colorRangeData?.district?.meta?.min
            ? parseFloat(colorRangeData?.district?.meta?.min).toFixed(2)
            : 0;
        }
      }
      return 0;
    },
    [map],
  );

  const renderColorRange = useCallback(
    (zoom, colorRangeData) => {
      if (zoom <= 10.5) {
        return colorRangeData?.province?.result.map((res) => (
          <div style={{ backgroundColor: res[1] }} className={styles.priceRange_Component} />
        ));
      }
      if (zoom > 10.5) {
        return colorRangeData?.district?.result.map((res) => (
          <div style={{ backgroundColor: res[1] }} className={styles.priceRange_Component} />
        ));
      }
      return null;
    },
    [map],
  );

  return (
    <>
      {map?.getZoom() <= 10.5 && colorRanges?.province && (
        <>
          <div>
            <Tooltip
              placement="leftBottom"
              title={icon ? 'Màu theo giá' : 'Màu theo số lượng bất động sản đang rao bán'}
            >
              <span
                onClick={() => {
                  setIcon(!icon);
                }}
              >
                <img src={icon ? iconHot : iconPrice} alt="" />
              </span>
            </Tooltip>
            ,
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={12}
                height={12}
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.11609 3.12039C1.30848 2.94716 1.60487 2.9627 1.77809 3.15508L6.00574 7.85036L10.2334 3.15508C10.4066 2.9627 10.703 2.94716 10.8954 3.12039C11.0878 3.29362 11.1033 3.59001 10.9301 3.78239L6.37184 8.84484C6.27505 8.95234 6.13981 9.00462 6.00574 8.99961C5.87167 9.00462 5.73643 8.95234 5.63964 8.84484L1.08139 3.78239C0.908167 3.59001 0.9237 3.29362 1.11609 3.12039Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
          <div className={cls('flex items-center justify-between', styles.priceRange_Content)}>
            <span className="mr-2">
              Giá mỗi m<sup>2</sup>{' '}
            </span>
            <div className="flex items-center justify-between">
              <span className={cls('mr-1', styles.customColorRange_Num)}>
                {renderColorRangeMin(map?.getZoom(), colorRanges)}
              </span>
              <div className="flex items-center justify-between mr-1">
                {renderColorRange(map?.getZoom(), colorRanges)}
              </div>
              <span className={styles.customColorRange_Num}>
                {renderColorRangeMax(map?.getZoom(), colorRanges)}
              </span>
            </div>
          </div>
        </>
      )}
      {map?.getZoom() > 10.5 && colorRanges?.district && (
        <>
          <div>
            <Tooltip
              placement="leftBottom"
              title={icon ? 'Màu theo giá' : 'Màu theo số lượng bất động sản đang rao bán'}
            >
              <span
                onClick={() => {
                  setIcon(!icon);
                }}
              >
                <img src={icon ? iconHot : iconPrice} alt="" />
              </span>
            </Tooltip>
            ,
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={12}
                height={12}
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.11609 3.12039C1.30848 2.94716 1.60487 2.9627 1.77809 3.15508L6.00574 7.85036L10.2334 3.15508C10.4066 2.9627 10.703 2.94716 10.8954 3.12039C11.0878 3.29362 11.1033 3.59001 10.9301 3.78239L6.37184 8.84484C6.27505 8.95234 6.13981 9.00462 6.00574 8.99961C5.87167 9.00462 5.73643 8.95234 5.63964 8.84484L1.08139 3.78239C0.908167 3.59001 0.9237 3.29362 1.11609 3.12039Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
          <div className={cls('flex items-center justify-between', styles.priceRange_Content)}>
            <span className="mr-2">
              Giá mỗi m<sup>2</sup>{' '}
            </span>
            <div className="flex items-center justify-between">
              <span className={cls('mr-1', styles.customColorRange_Num)}>
                {renderColorRangeMin(map?.getZoom(), colorRanges)}
              </span>
              <div className="flex items-center justify-between mr-1">
                {renderColorRange(map?.getZoom(), colorRanges)}
              </div>
              <span className={styles.customColorRange_Num}>
                {renderColorRangeMax(map?.getZoom(), colorRanges)}
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ColorRange;
