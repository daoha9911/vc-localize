/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback, useEffect } from 'react';
import cls from 'classnames';
import debounce from 'lodash/debounce';
import AgileChar from '@/components/AgileChar';
import AgileTable from '@/components/AgileTable';
import EstateComponent from '@/components/EstatesComponent';
import { Row, Col, Pagination, Empty, Menu, Dropdown, Button, Tooltip, Modal } from 'antd';
import { connect } from 'umi';
import { useRequest } from '@umijs/hooks';
import { useQueryLocation } from '@/hooks/useQueryLocation';

import LocationSearchInput from '@/components/LocationSearchInput';

import { getFavoriteEstate } from '@/services/estate';
import { getChartByDistrict } from '../../services/getChartByDistrict';
import SkeletonLoading from './SkeletonLoading';
import BreadCrumbFooter from './BreadCrumbFooter';
import CompareNotice from './CompareNotice';
import MobileFilterContent from './components/MobileFilterContent';

import useHandlePointLoading from '../Map/hooks/useHandlePointLoading';

import styles from './index.less';

const MapLeft = ({
  data,
  loading,
  loadingPoint,
  loadingMapChange,
  pageSize,
  currentPage,
  setCurrentPage,
  zoom,
  center,
  currentDis,
  currentSubDis,
  currentProvince,
  map,
  loggedIn,
  dispatch
}) => {
  const { onLoading, onLoadDone } = useHandlePointLoading();
  const { filters, setFilter } = useQueryLocation();

  const { data: chartdata, run: runChart, loading: chartLoading } = useRequest(getChartByDistrict, {
    manual: true,
    debounceInterval: 1000,
  });

  const { data: favorEstates, run: runFavorEstate, loading: favorEstateLoading } = useRequest(
    getFavoriteEstate,
    {
      manual: true,
    },
  );

  const [prepare, setPrepare] = useState(undefined);
  const [currentSortBy, setCurrentSortBy] = useState('');
  const [active, setActive] = useState(1);

  const [idMobMoldal, setIsMobModal] = useState(false);

  const handleMobModalOpen = useCallback(() => {
    setIsMobModal(true);
  }, []);

  const handleMobModalClose = useCallback(() => {
    setIsMobModal(false);
  }, []);

  const menuSortBy = (
    <Menu>
      <Menu.Item>
        <div
          onClick={() => {
            setFilter({
              sortBy: 'time',
            });
            setCurrentSortBy('Thời gian');
          }}
        >
          <span className={styles.customHeaderSpan}>Thời gian</span>
        </div>
      </Menu.Item>
      <Menu.Item>
        <div
          onClick={() => {
            setFilter({
              sortBy: 'suitable',
            });
            setCurrentSortBy('Độ thích hợp');
          }}
        >
          <span className={styles.customHeaderSpan}>Độ thích hợp</span>
        </div>
      </Menu.Item>
      <Menu.Item>
        <div
          onClick={() => {
            setFilter({
              sortBy: 'price',
              order: 'DESC',
            });
            setCurrentSortBy('Giá từ cao đến thấp');
          }}
        >
          <span className={styles.customHeaderSpan}>Giá từ cao đến thấp</span>
        </div>
      </Menu.Item>
      <Menu.Item>
        <div
          onClick={() => {
            setFilter({
              sortBy: 'price',
              order: 'ASC',
            });
            setCurrentSortBy('Giá từ thấp đến cao');
          }}
        >
          <span className={styles.customHeaderSpan}>Giá từ thấp đến cao</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  const renderEstatesComponent = useCallback(
    (datas) => {
      return datas.map((d, idx) => (
        <Col
          key={idx}
          className={`${styles.customEstateComponent}, ${styles.customEstateComponentEffect}`}
          md={12}
          lg={12}
          xxl={12}
        >
          <div className={styles.estateComponent}>
            <EstateComponent favorEstates={favorEstates?.data?.payload || []} data={d} />
          </div>
        </Col>
      ));
    },
    [data, loading],
  );

  useEffect(() => {
    if (window !== undefined) {
      window.scrollTo({ top: 0 });
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      setPrepare(data);
    }
    return () => {
      setPrepare(undefined);
    };
  }, [data]);

  const updateChart = useCallback(() => {
    if (currentDis) {
      runChart(filters?.where?.recordType || 'apartment', 'district', currentDis);
    }
    if (currentSubDis && map?.getZoom() >= 11) {
      runChart(filters?.where?.recordType || 'apartment', 'ward', currentSubDis);
    }
  }, [currentDis, currentSubDis, filters?.where?.recordType]);

  useEffect(() => {
    updateChart();
  }, [currentDis, currentSubDis, filters?.where?.recordType, map?.getZoom()]);

  useEffect(() => {
    if (loggedIn) {
      runFavorEstate();
    }
  }, [loggedIn, map?.getZoom()]);

  useEffect(() => {
    if (filters?.where?.recordType === 'apartment') {
      setActive(1);
    }
    if (filters?.where?.recordType === 'house') {
      setActive(2);
    }
  }, [filters?.where?.recordType]);

  const onPaginationChange = (page) => {
    setCurrentPage(page);
  };

  const selectApartment = useCallback((event) => {
    setActive(1);
    onLoading();
    setFilter({
      recordType: 'apartment',
    });
    dispatch({
      type: 'mapsource/changeRecordType'
    })
  }, [map]);
  const selectHouse = useCallback((event) => {
    setActive(2);
    onLoading();
    setFilter({
      recordType: 'house',
    });
    dispatch({
      type: 'mapsource/changeRecordType'
    })
  }, [map]);

  return (
    <>
      <div className={styles.customContentLeft}>
        <div className={styles.Muna_Mobile_Filter}>
          <div className="flex justify-between items-center">
            <div className="flex-grow mr-4">
              <LocationSearchInput />
            </div>
            <div className="flex" onClick={handleMobModalOpen}>
              <div className="mr-1">
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.51256 3.51256C3.84075 3.18438 4.28587 3 4.75 3H18.75C19.2141 3 19.6592 3.18437 19.9874 3.51256C20.3156 3.84075 20.5 4.28587 20.5 4.75V7.336C20.4999 7.80005 20.3155 8.24522 19.9873 8.57333C19.9873 8.57336 19.9874 8.5733 19.9873 8.57333L14.7803 13.7803C14.4874 14.0732 14.0126 14.0732 13.7197 13.7803C13.4268 13.4874 13.4268 13.0126 13.7197 12.7197L18.9267 7.51267C18.9735 7.46584 18.9999 7.40224 19 7.336C19 7.33595 19 7.33605 19 7.336V4.75C19 4.68369 18.9737 4.62011 18.9268 4.57322C18.8799 4.52634 18.8163 4.5 18.75 4.5H4.75C4.6837 4.5 4.62011 4.52634 4.57322 4.57322C4.52634 4.62011 4.5 4.6837 4.5 4.75V7.336C4.5 7.4033 4.52678 7.46636 4.57191 7.51126L4.57333 7.51267L9.78033 12.7197C10.0732 13.0126 10.0732 13.4874 9.78033 13.7803C9.48744 14.0732 9.01256 14.0732 8.71967 13.7803L3.51409 8.57474C3.51382 8.57448 3.51356 8.57422 3.5133 8.57396C3.18293 8.24493 3 7.79833 3 7.336V4.75C3 4.28587 3.18438 3.84075 3.51256 3.51256Z"
                    fill="#00AEAC"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.25 12.5C9.66421 12.5 10 12.8358 10 13.25V19.499C10 19.8243 10.3058 20.0631 10.6213 19.9843L13.1211 19.3594C13.2293 19.3324 13.3255 19.2699 13.3941 19.182C13.4628 19.094 13.5 18.9857 13.5 18.8742V13.25C13.5 12.8358 13.8358 12.5 14.25 12.5C14.6642 12.5 15 12.8358 15 13.25V18.8738C15 18.8739 15 18.8738 15 18.8738C15.0001 19.3199 14.851 19.7534 14.5765 20.105C14.3019 20.4567 13.9177 20.7065 13.4848 20.8146L10.9849 21.4396C9.72243 21.7548 8.5 20.7997 8.5 19.499V13.25C8.5 12.8358 8.83579 12.5 9.25 12.5Z"
                    fill="#00AEAC"
                  />
                </svg>
              </div>
              <span>Lọc</span>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <Button type={active === 1 ? 'primary' : 'default'} onClick={selectApartment}>
            Chung cư{' '}
          </Button>{' '}
          <Button type={active === 2 ? 'primary' : 'default'} onClick={selectHouse}>
            {' '}
            Nhà mặt đất{' '}
          </Button>
        </div>
        <div className="mb-4">
          <h2 className={styles.customHeaderH2}>
            {filters?.where?.recordType && filters?.where?.recordType === 'house'
              ? 'Thông tin các BĐS tại khu vực xung quanh '
              : 'Thông tin các BĐS tại khu vực xung quanh '}{' '}
            {(map?.getZoom() > 10.5 && filters?.where?.locationName) || 'Hà Nội'}
          </h2>
        </div>
        <div className="mb-4">
          <div className="flex justify-between">
            <div>
              <span className={cls(styles.customHeaderSpan, 'mr-1')} style={{ color: '#00AEAC' }}>
                {prepare?.totalRecords}
              </span>
              <span className={styles.customHeaderSpan}>Kết quả</span>
            </div>
            <div>
              <Dropdown overlay={menuSortBy}>
                <div className="flex items-center">
                  <span className={cls('cursor-pointer mr-2', styles.customHeaderSpan)}>
                    Sắp xếp: {currentSortBy ? currentSortBy : 'Lựa chọn'}
                  </span>
                  <div>
                    <svg
                      width={10}
                      height={6}
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.170852 0.837478C0.398662 0.609675 0.768005 0.609675 0.995814 0.837478L4.66667 4.50834L8.33752 0.837478C8.56532 0.609675 8.93468 0.609675 9.16247 0.837478C9.39027 1.06529 9.39027 1.43463 9.16247 1.66244L5.07914 5.74577C4.85135 5.97356 4.48198 5.97356 4.25419 5.74577L0.170852 1.66244C-0.0569508 1.43463 -0.0569508 1.06529 0.170852 0.837478Z"
                        fill="#00AEAC"
                      />
                    </svg>
                  </div>
                </div>
              </Dropdown>
            </div>
          </div>
        </div>
        <div>
          {(loading || loadingPoint || loadingMapChange || prepare === undefined) && (
            <SkeletonLoading />
         )} 
          {prepare?.data.length >= 1 && !loading && !loadingPoint && !loadingMapChange && (
            <Row gutter={[32, 32]}>{renderEstatesComponent(prepare?.data)}</Row>
          )}
          {(!prepare || prepare?.data.length === 0) &&
            prepare !== undefined &&
            !loading &&
            !loadingMapChange &&
            !loadingPoint && (
              <Empty
                description={
                  <span className={styles.customHeaderH2}>Không có nhà đang bán tại đây</span>
                }
              />
            )}
        </div>
        <div>
          {prepare?.data.length >= 1 && (
            <Pagination
              total={(prepare?.totalPages && prepare.totalPages * pageSize) || null}
              onChange={onPaginationChange}
              pageSize={pageSize}
              className={styles.customPagination}
              showSizeChanger={false}
              defaultCurrent={currentPage}
              size="small"
            />
          )}
        </div>
        <Tooltip title="Đang phát triển">
          <span
            style={{
              color: '#cbd5e0',
            }}
            className={`cursor-not-allowed ${styles.menuTab}`}
          >
            <div className="">
              <div className={styles.contentLeftsearchControl}>
                <div className="mb-2">
                  <span className={styles.contentLeftsearchControl_SearchSpan}>LƯU TÌM KIẾM</span>
                  {/* <Switch /> */}
                </div>
                <div>
                  <span className={styles.contentLeftsearchControl_QuoteSpan}>
                    Để được cập nhật thêm danh sách nhà mới phù hợp với nhu cầu của bạn
                  </span>
                </div>
              </div>
            </div>
          </span>
        </Tooltip>
        {currentProvince && (
          <AgileTable
            zoom={map?.getZoom()}
            currentDis={currentDis}
            currentProvince={currentProvince}
          />
        )}
        {currentDis && (
          <AgileChar zoom={map?.getZoom()} data={chartdata?.data} loading={chartLoading} />
        )}
      </div>
      <BreadCrumbFooter />
      <div className="fixed bottom-0 z-10">
        <CompareNotice />
      </div>
      <Modal
        className={styles.customMobFilterModal}
        footer={null}
        onCancel={handleMobModalClose}
        visible={idMobMoldal}
        centered
      >
        <MobileFilterContent onClose={handleMobModalClose} />
      </Modal>
    </>
  );
};

export default connect(({ mapsource, login }) => ({
  zoom: mapsource.zoom,
  center: mapsource.center,
  currentDis: mapsource.currentDis,
  currentProvince: mapsource.currentProvince,
  currentSubDis: mapsource.currentSubDis,
  loggedIn: login.loggedIn,
}))(MapLeft);
