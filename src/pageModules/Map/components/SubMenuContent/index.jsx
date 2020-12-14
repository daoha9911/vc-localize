import React, { useState, useEffect, useCallback } from 'react';
import cls from 'classnames';
import LeftArrow from '@/components/Icons/LeftArrow';
import { useQueryLocation } from '@/hooks/useQueryLocation';
import useHandleDataloading from '@/pageModules/Map/components/Map/hooks/useHandleDataLoading';
// import { history } from 'umi';
import styles from './index.less';

const GlobalHeaderSubMenuContent = ({ previousCoordinates, map }) => {
  const [activeSubMenuContent, setActiveSubMenuContent] = useState('');
  const { setFilter } = useQueryLocation();

  const { onLoading, onLoadDone } = useHandleDataloading();

  useEffect(() => {
    if (window !== undefined) {
      window.scrollTo({ top: 0 });
    }
  }, []);

  const detailOverviewDescribeClick = useCallback(() => {
    const offsetTop = document.getElementById('detailOverviewDescribe')?.offsetTop;
    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
  }, []);

  const goToSimilarEstate = useCallback(() => {
    const offsetTop = document.getElementById('similarEstate')?.offsetTop;
    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
  }, []);

  const sellerContactClick = useCallback(() => {
    const offsetTop = document.getElementById('sellerContact')?.offsetTop;
    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
  }, []);

  const onSubMenuContentClick = useCallback((key) => {
    setActiveSubMenuContent(key);
    switch (key) {
      case 'overview':
        detailOverviewDescribeClick();
        break;
      case 'price':
        sellerContactClick();
        break;
      case 'similarEstate':
        goToSimilarEstate();
        break;
      default:
        break;
    }
  }, []);

  const onHistoryBack = () => {
    // history.goBack();
    setFilter({
      id: null,
      buildingId: null,
    });
    onLoading();
    if (previousCoordinates) {
      map.flyTo({
        ...previousCoordinates,
        speed: 0.3,
      });
    }
  };

  return (
    <>
      <div className="flex items-center">
        <div
          onClick={onHistoryBack}
          className={cls('flex items-center mr-3', styles.customSubMenuContentBack)}
        >
          <span className="mr-2 ">
            <LeftArrow />
          </span>
          <span className={styles.customSubMenuContentSpan}>Quay lại</span>
        </div>
        <div className="mx-3">
          <span
            onClick={() => onSubMenuContentClick('overview')}
            className={cls(styles.customSubMenuContentSpan, {
              [styles.subMenuContentActive]: activeSubMenuContent === 'overview',
            })}
          >
            Tổng quan
          </span>
        </div>
        <div className="mx-3">
          <span
            onClick={() => onSubMenuContentClick('price')}
            className={cls(styles.customSubMenuContentSpan, {
              [styles.subMenuContentActive]: activeSubMenuContent === 'price',
            })}
          >
            Giá
          </span>
        </div>
        {/* <div className="mx-3">
          <span
            onClick={() => onSubMenuContentClick('building')}
            className={cls(styles.customSubMenuContentSpan, {
              [styles.subMenuContentActive]: activeSubMenuContent === 'building',
            })}
          >
            Toà nhà
          </span>
        </div> */}
        <div className="mx-3">
          <span
            onClick={() => onSubMenuContentClick('similarEstate')}
            className={cls(styles.customSubMenuContentSpan, {
              [styles.subMenuContentActive]: activeSubMenuContent === 'similarEstate',
            })}
          >
            Bất động sản tương tự
          </span>
        </div>
      </div>
    </>
  );
};

export default GlobalHeaderSubMenuContent;
