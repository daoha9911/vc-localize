/* eslint-disable */
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import debounce from 'lodash/debounce';
import { Tooltip } from 'antd';
import cls from 'classnames';
import { connect, useSelector, useDispatch } from 'dva';
import get from 'lodash/get';
import { LoadingOutlined } from '@ant-design/icons';

//hooks
import useMap from './components/Map/hooks';
import { useQueryLocation } from '@/hooks/useQueryLocation';
import { useMount, useRequest, useUpdateEffect } from '@umijs/hooks';

//component
import HeaderSubMenu from './components/SubMenu';
import HeaderSubMenuContent from './components/SubMenuContent';
import MapMobileControl from './components/MapMobileControl';
import CloseMapButton from './components/CloseMapButton';
import MapLeft from './components/MapLeft';
import MapLeftContent from './components/MapLeftContent';
import BuildingListAppartment from './components/BuildingListAppartment';
import BuildingListHouse from './components/BuildingListHouse';
import ColorRange from './components/ColorRange';

//service
import { getFilterEstates, getAdministrativeTypeAndId } from './services/getFilterEstates';

//styles
import styles from './index.less';
import iconHot from '@/static/web_images/hot.png';
import iconPrice from '@/static/web_images/price.png';
import {
  switchPopColorType,
  switchPriceColorType,
  changeCurrentProvince,
  changeTerritory,
} from '@/pages/map/model';

import qs from 'qs';

let dis = qs.parse(window.location.href).filters?.where.currentDis;
let subDis = qs.parse(window.location.href).filters?.where.currentSubDis;
const INIT_CENTER = [105.74463246210325, 20.97180779628566];
const INIT_ZOOM = 9;

const Map = ({ mapsource, isMobileMapOpen }) => {
  const [isSatellite, setSatellite] = useState(false);
  const containerRef = useRef();
  const [sourceData, setSourceData] = useState();
  const { map, generateMap, locatePoint } = useMap(INIT_CENTER, INIT_ZOOM, containerRef.current);
  const colorType = useSelector((state) => state?.mapsource?.colorType);
  const dispatch = useDispatch();
  const { filters } = useQueryLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  useEffect(() => {
    generateMap(containerRef.current, isSatellite);
  }, [isSatellite, filters?.where?.recordType]);
  // HARD_CODE
  useEffect(() => {
    changeCurrentProvince(dispatch, { province: 'VNM.27_1' });
  }, []);
  useEffect(() => {
    changeTerritory(dispatch, { province: 'VNM.27_1', dis, subDis });
  }, [dis, subDis]);
  // HARD_CODE
  const { loading, run, data } = useRequest(getFilterEstates, {
    manual: true,
    onSuccess: (res) => {
      if (res?.success) {
        setSourceData(res?.data);
      }
    },
  });

  //Get data while map or filter change
  const getRecords = useCallback(
    (mapsource, filters, bottomLeft, topRight) => {
      const recordType = filters?.where?.recordType ? filters?.where?.recordType : 'apartment';
      const sortBy = filters?.where?.sortBy ? filters?.where?.sortBy : 'time';
      const order = filters?.where?.order ? filters?.where?.order : 'DESC';
      const filterData = {
        minPrice: filters?.where?.minPrice || null,
        maxPrice: filters?.where?.maxPrice || null,
        minSize: filters?.where?.minSize || null,
        maxSize: filters?.where?.maxSize || null,
        direction: filters?.where?.direction || null,
        numBedroom: filters?.where?.numBedroom || null,
        contactType: filters?.where?.contactType || null,
        topRight: {
          latitude: topRight && topRight.lat,
          longitude: topRight && topRight.lng,
        },
        bottomLeft: {
          latitude: bottomLeft && bottomLeft.lat,
          longitude: bottomLeft && bottomLeft.lng,
        },
      };

      const { currentSubDis, currentDis, currentProvince } = mapsource;
      const { administrativeType, id } = getAdministrativeTypeAndId(
        currentSubDis,
        currentDis,
        currentProvince,
      );

      run(recordType, administrativeType, id, sortBy, order, currentPage, pageSize, filterData);
    },
    [currentPage, filters],
  );

  useEffect(() => {
    if (mapsource.topRight && mapsource.bottomLeft && !filters?.where?.id) {
      getRecords(mapsource, filters, mapsource.bottomLeft, mapsource.topRight);
    }
  }, [mapsource.currentSubDis, mapsource.topRight, mapsource.bottomLeft, currentPage, filters]);

  //Get data while search change
  useEffect(() => {
    const locatedP =
      filters?.where?.lat && filters?.where?.lng
        ? { lat: filters?.where?.lat, lng: filters?.where?.lng }
        : null;
    if (!locatePoint) {
      return;
    }
    locatePoint(locatedP, 'subDis');
  }, [locatePoint, filters?.where?.lat, filters?.where?.lng]);

  //Mobile 
  const openMobileMap = useCallback(() => {
    dispatch({
      type: 'mobileMap/openMobileMap',
    });
  }, []);

  const closeMobileMap = useCallback(() => {
    dispatch({
      type: 'mobileMap/closeMobileMap',
    });
  }, []);

  //Price range color render
  const renderColorRangeMin = useCallback(
    (zoom, colorRangeData, type = 'price') => {
      const maxProvince = get(colorRangeData, `province.${type}.meta.min`);
      const maxDistrict = get(colorRangeData, `district.${type}.meta.min`);
      if (zoom <= 10.5 && !isNaN(parseFloat(maxProvince))) {
        return parseFloat(parseFloat(maxProvince).toFixed(2)) || 0;
      }
      if (zoom > 10.5 && !isNaN(parseFloat(maxDistrict))) {
        return parseFloat(parseFloat(maxDistrict).toFixed(2)) || 0;
      }
      return 0;
    },
    [map],
  );

  const renderColorRangeMax = useCallback(
    (zoom, colorRangeData, type = 'price') => {
      const maxProvince = get(colorRangeData, `province.${type}.meta.max`);
      const maxDistrict = get(colorRangeData, `district.${type}.meta.max`);
      if (zoom <= 10.5 && !isNaN(parseFloat(maxProvince))) {
        return parseFloat(parseFloat(maxProvince).toFixed(2)) || 0;
      }
      if (zoom > 10.5 && !isNaN(parseFloat(maxDistrict))) {
        return parseFloat(parseFloat(maxDistrict).toFixed(2)) || 0;
      }
      return 0;
    },
    [map],
  );

  const renderColorRange = useCallback(
    (zoom, colorRangeData, type = 'price') => {
      const resultProvince = get(colorRangeData, `province.${type}.result`) || [];
      const resultDistrict = get(colorRangeData, `district.${type}.result`) || [];
      if (zoom <= 10.5) {
        return resultProvince.map((res) => (
          <div style={{ backgroundColor: res[1] }} className={styles.priceRange_Component} />
        ));
      }
      if (zoom > 10.5) {
        return resultDistrict.map((res) => (
          <div style={{ backgroundColor: res[1] }} className={styles.priceRange_Component} />
        ));
      }
      return null;
    },
    [map],
  );

  //Change content by url
  const contentLeft = useMemo(() => {
    if (filters?.where?.id) {
      return <MapLeftContent map={map} />;
    }
    if (filters?.where?.buildingId) {
      return <BuildingListAppartment id={filters?.where?.buildingId} />;
    }
    if (filters?.where?.houseId) {
      return <BuildingListHouse id={filters?.where?.houseId} />;
    }

    return (
      <MapLeft
        data={sourceData}
        pageSize={pageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        loading={loading}
        loadingPoint={mapsource?.loading?.point}
        loadingMapChange={mapsource?.loading?.data}
        map={map}
      />
    );
  }, [
    filters?.where?.id,
    filters?.where?.buildingId,
    map,
    pageSize,
    setCurrentPage,
    loading,
    sourceData,
    mapsource,
    mapsource?.loading?.point,
    mapsource?.loading?.data,
  ]);

  const isLoading = useMemo(
    () => Object.keys(mapsource?.loading).some((k) => mapsource?.loading[k]),
    [mapsource.loading],
  );

  console.log(isSatellite, 'isSatellite-here')

  return (
    <>
      <div className={`dinhgia-bds-submenu ${styles.customSubMenu}`}>
        {filters && filters?.where && filters?.where?.id ? (
          <HeaderSubMenuContent
            map={map}
            previousCoordinates={mapsource?.previousCoordinates || {}}
          />
        ) : (
          <HeaderSubMenu initialValue={filters?.where?.locationName} locatePoint={locatePoint} />
        )}
      </div>
      <div className={styles.customContent}>
        <div className="dinhgia-bds_content">
          <div className={styles.contentLeft}>{contentLeft}</div>
        </div>
        <div
          className={cls(styles.contentRight, { [styles.customMobileMap]: isMobileMapOpen })}
          style={{
            pointerEvents: isLoading ? 'none' : 'all',
          }}
        >
          <div style={{ width: '100%', height: '100%' }} ref={containerRef}>
            {(mapsource?.loading?.point || mapsource?.loading?.data) && (
              <div className={styles.loadingIndicator}>
                <p>Đang tải dữ liệu</p>
                <LoadingOutlined />
              </div>
            )}
            {mapsource?.colorRanges && map?.getZoom() < 12.5 && (
              <div
                className={`flex flex-row-reverse justify-between ${styles.colorRanges_Wrapper}`}
                style={{
                  width: '98%',
                }}
              >
                <div>
                  <Tooltip
                    placement="leftBottom"
                    title={
                      colorType === 'price'
                        ? 'Màu theo giá'
                        : 'Màu theo số lượng bất động sản đang rao bán'
                    }
                  >
                    <span
                      onClick={() => {
                        if (colorType === 'price') {
                          switchPopColorType(dispatch);
                        } else {
                          switchPriceColorType(dispatch);
                        }
                      }}
                    >
                      <img src={colorType === 'price' ? iconPrice : iconHot} />
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
                <div
                  className={cls('flex items-center justify-between', styles.priceRange_Content)}
                >
                  <span className="mr-2">
                    {colorType === 'price' ? (
                      <div>
                        Giá mỗi m<sup>2</sup>{' '}
                      </div>
                    ) : (
                      <div>Số lượng bài viết</div>
                    )}
                  </span>
                  <div className="flex items-center justify-between">
                    <span className={cls('mr-1', styles.customColorRange_Num)}>
                      {renderColorRangeMin(map?.getZoom(), mapsource?.colorRanges, colorType)}
                    </span>
                    <div className="flex items-center justify-between mr-1">
                      {renderColorRange(map?.getZoom(), mapsource?.colorRanges, colorType)}
                    </div>
                    <span className={styles.customColorRange_Num}>
                      {renderColorRangeMax(map?.getZoom(), mapsource?.colorRanges, colorType)}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div className={styles.Satellite_Group}>
              <div className={styles.Satellite_Wrap}>
                <div className={cls(styles.Satellite_Item,{[styles.active]: !isSatellite})} onClick={()=>setSatellite(false)}>Bản đồ</div>
                <div className={cls(styles.Satellite_Item,{[styles.active]: isSatellite})} onClick={()=>setSatellite(true)}>Vệ tinh</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.mapMobileControl}>
          <MapMobileControl
            mobileMap={isMobileMapOpen}
            openMobileMap={openMobileMap}
            closeMobileMap={closeMobileMap}
          />
        </div>
        {isMobileMapOpen && (
          <div className={styles.customLocation_Quote}>
            <h2>{filters?.where?.locationName ? filters?.where?.locationName : null}</h2>
          </div>
        )}
        {isMobileMapOpen && (
          <div className={styles.closeMapButton}>
            <CloseMapButton closeMobileMap={closeMobileMap} />
          </div>
        )}
      </div>
    </>
  );
};

export default connect(({ mapsource, mobileMap }) => ({
  mapsource,
  isMobileMapOpen: mobileMap.isOpen,
}))(Map);
