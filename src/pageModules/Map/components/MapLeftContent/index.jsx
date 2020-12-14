/* eslint-disable no-lonely-if */
/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import cls from 'classnames';
import mapboxgl from 'mapbox-gl';
import { Modal, Tooltip } from 'antd';
import { useRequest } from '@umijs/hooks';
import { useQueryLocation } from '@/hooks/useQueryLocation';
import { LinkOutlined } from '@ant-design/icons';
import { convertDerectionText } from '@/utils/utils';
import { connect } from 'dva';
import PriceRangeSlider from '@/components/PriceRangeSlider';
import PriceRangeSliderAdvanced from '@/components/PriceRangeSliderAdvanced';
import AgileChar from '@/components/AgileChar';
import { getFavoriteEstate, addFavoriteEstate, deleteFavoriteEstate } from '@/services/estate';
import { getOneEstates } from '../../services/getFilterEstates';
import { getChartByDistrict } from '../../services/getChartByDistrict';

import LightgalleryImageProvider from './components/LightGalleryImages';
import DetailContentDesciption from './components/DetailContentDescription';
import BreadCrumbDetailFooter from './components/BreadCrumbDetailFooter';
import SimilarEstate from './components/SimilarEstate';
import ContactModal from './components/ContactModal';

import styles from './index.less';

const MapLeftContent = ({ map, loggedIn, dispatch }) => {
  const { confirm } = Modal;
  const [visible, setVisible] = useState(false);
  const [isContactModalVisible, setContactModalVisivle] = useState(false);
  const [activeFavor, setActiveFavor] = useState(false);

  const popUp = new mapboxgl.Popup({
    closeButton: false,
  });

  const { filters } = useQueryLocation();

  const getDetailEstateRequest = useRequest(getOneEstates, {
    manual: true,
  });

  const getChartRequest = useRequest(getChartByDistrict, {
    manual: true,
  });

  const { data: favorEstates, run: runFavorEstate, loading: favorEstateLoading } = useRequest(
    getFavoriteEstate,
    {
      manual: true,
    },
  );

  const {
    data: dataAddFavorEstate,
    run: runAddFavorEstate,
    loading: loadingAddFavorEstate,
  } = useRequest(addFavoriteEstate, {
    manual: true,
    onSuccess: () => {
      setActiveFavor(true);
    },
  });

  const {
    data: dataRemoveFavorEstate,
    run: runRemoveFavorEstate,
    loading: loadingRemoveFavorEstate,
  } = useRequest(deleteFavoriteEstate, {
    manual: true,
    onSuccess: () => {
      setActiveFavor(false);
    },
  });

  const renderFavorEstates = useMemo(() => {
    if (favorEstates && Array.isArray(favorEstates?.data?.payload)) {
      return favorEstates?.data?.payload?.map((favorEstate) => favorEstate?.idEstate);
    }
    return null;
  }, [favorEstates]);

  const images = useMemo(
    () =>
      getDetailEstateRequest?.data?.data && getDetailEstateRequest?.data?.data.images.split(','),
    [getDetailEstateRequest?.data, filters],
  );

  useEffect(() => {
    getDetailEstateRequest.run(filters?.where?.recordType, filters?.where.id);
    if (window !== undefined) {
      window.scrollTo({ top: 0 });
    }
    return () => {
      map?.setFilter('unclustered-point-hightlight', ['==', '_id', '']);
      popUp?.remove();
    };
  }, [filters]);

  useEffect(() => {
    if (getDetailEstateRequest?.data?.data?.addressDistrictId) {
      getChartRequest.run(
        filters?.where?.recordType || 'apartment',
        'ward',
        getDetailEstateRequest?.data?.data?.addressWardId,
      );
    }
  }, [getDetailEstateRequest?.data?.data?.addressDistrictId]);

  useEffect(() => {
    if (getDetailEstateRequest?.data?.data && getDetailEstateRequest?.data?.data.latitude) {
      if (map) {
        map.flyTo({
          center: [
            getDetailEstateRequest?.data?.data.longitude,
            getDetailEstateRequest?.data?.data.latitude,
          ],
          zoom: 15,
          speed: 0.35,
        });
        map.setFilter('unclustered-point-hightlight', [
          '==',
          '_id',
          getDetailEstateRequest?.data?.data._id,
        ]);
        popUp
          .setLngLat([
            getDetailEstateRequest?.data?.data.longitude,
            getDetailEstateRequest?.data?.data.latitude,
          ])
          .setHTML(`<h2 style="padding: 10px">Vị trí ở đây</h2>`)
          .addTo(map);
      }
    }
    return () => {
      map?.setFilter('unclustered-point-hightlight', ['==', '_id', '']);
      popUp?.remove();
    };
  }, [getDetailEstateRequest?.data]);

  useEffect(() => {
    if (loggedIn) {
      runFavorEstate();
    }
  }, [loggedIn]);

  useEffect(() => {
    if (renderFavorEstates?.includes(getDetailEstateRequest?.data?.data?._id)) {
      setActiveFavor(true);
    }
  }, [favorEstates, getDetailEstateRequest?.data]);

  const handleFavorEstateClick = useCallback(
    (id, type) => {
      if (!loggedIn) {
        dispatch({
          type: 'formregister/openForm',
        });
      } else {
        if (!activeFavor) {
          confirm({
            title: 'Bạn có muốn thêm bất động sản này vào danh sách yêu thích ?',
            centered: true,
            okText: 'Đồng ý',
            cancelText: 'Huỷ',
            onOk() {
              runAddFavorEstate(id, type);
            },
          });
        } else {
          confirm({
            title: 'Bạn có muốn xoá bất động sản này khỏi danh sách yêu thích ?',
            centered: true,
            okText: 'Đồng ý',
            cancelText: 'Huỷ',
            onOk() {
              runRemoveFavorEstate(id);
            },
          });
        }
      }
    },
    [activeFavor, loggedIn],
  );

  const handleContactModalOpen = useCallback(() => {
    setContactModalVisivle(true);
  }, []);

  const handleContactModalClose = useCallback(() => {
    setContactModalVisivle(false);
  }, []);

  return (
    <>
      <div className={styles.customContentLeft}>
        <div className="flex">
          <div className={styles.fixedMainImage_Wrapper}>
            <img src={Array.isArray(images) ? images[0] : null} alt="" />
            <div className={cls('flex absolute', styles.blukAction)}>
              {/* <div>
                <div className={cls('flex items-center', styles.blukActionButton)}>
                  <div className="mr-2">
                    <svg
                      width="14"
                      height="12"
                      viewBox="0 0 14 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.49739 0.666686H5.80686C6.083 0.666686 6.30686 0.890546 6.30686 1.16669C6.30686 1.41981 6.11873 1.62901 5.87473 1.66212L5.80686 1.66669H3.49739C2.70348 1.66669 2.05363 2.28346 2.00085 3.06399L1.99739 3.16669V9.50002C1.99739 10.294 2.61417 10.9438 3.39469 10.9966L3.49739 11H9.8312C10.6251 11 11.275 10.3832 11.3277 9.60269L11.3312 9.50002V9.16815C11.3312 8.89202 11.5551 8.66815 11.8312 8.66815C12.0843 8.66815 12.2935 8.85629 12.3267 9.10029L12.3312 9.16815V9.50002C12.3312 10.8362 11.283 11.9276 9.964 11.9966L9.8312 12H3.49739C2.16122 12 1.06988 10.9518 1.00086 9.63282L0.997391 9.50002V3.16669C0.997391 1.83051 2.04563 0.739172 3.36462 0.670152L3.49739 0.666686H5.80686H3.49739ZM8.66673 2.34659V0.500019C8.66673 0.0840389 9.13793 -0.140014 9.45807 0.093219L9.51287 0.139179L13.5093 3.97251C13.6957 4.15141 13.7127 4.43876 13.5601 4.6374L13.5093 4.69415L9.51287 8.52869C9.21273 8.81675 8.7248 8.63182 8.67146 8.23929L8.66673 8.16795V6.35102L8.43773 6.37109C6.83793 6.53802 5.30458 7.25862 3.82802 8.54495C3.48195 8.84642 2.94653 8.56135 3.00345 8.10589C3.44664 4.55955 5.30122 2.60489 8.46713 2.35969L8.66673 2.34659V0.500019V2.34659ZM9.66673 1.67245V2.83335C9.66673 3.10949 9.44286 3.33335 9.16673 3.33335C6.58446 3.33335 4.98404 4.45077 4.29254 6.77149L4.23984 6.95722L4.47463 6.79929C5.9656 5.82482 7.53186 5.33335 9.16673 5.33335C9.41986 5.33335 9.62906 5.52149 9.66213 5.76549L9.66673 5.83335V6.99522L12.4409 4.33341L9.66673 1.67245Z"
                        fill="#727C7D"
                      />
                    </svg>
                  </div>
                  <span className={styles.blukActionButtonSpan}>Share</span>
                </div>
              </div> */}
              <div>
                <div
                  className={cls('flex items-center', styles.blukActionButton, {
                    [styles.customInto_favor]: activeFavor,
                  })}
                  onClick={() =>
                    handleFavorEstateClick(
                      getDetailEstateRequest?.data?.data?._id,
                      getDetailEstateRequest?.data?.data?.type,
                    )
                  }
                >
                  <div className="mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="14"
                      viewBox="0 0 10 14"
                      fill="none"
                    >
                      <path
                        d="M0.666672 3C0.666672 1.89543 1.5621 1 2.66667 1H7.33334C8.43791 1 9.33334 1.89543 9.33334 3V11.7868C9.33334 12.6957 8.21898 13.1333 7.60054 12.4672L5.7328 10.4558C5.33717 10.0298 4.66284 10.0298 4.26721 10.4558L2.39947 12.4672C1.78103 13.1333 0.666672 12.6957 0.666672 11.7868V3Z"
                        fill="white"
                        stroke="#727C7D"
                      />
                    </svg>
                  </div>
                  <span className={styles.blukActionButtonSpan}>
                    {activeFavor ? 'Đã Lưu' : 'Lưu'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex flex-col"
            onClick={() => {
              setVisible(true);
            }}
          >
            <div className={cls(styles.fixedImage_Wrapper)}>
              <img src={Array.isArray(images) ? images[1] : null} alt="" />
              <div className={styles.fixedImage_Wrapper_ViewAll}>
                <span>Xem tất cả {Array.isArray(images) ? images.length : null} ảnh</span>
              </div>
            </div>
            <div className={styles.fixedImage_Wrapper}>
              <img src={Array.isArray(images) ? images[2] : null} alt="" />
            </div>
          </div>
        </div>
        <LightgalleryImageProvider visible={visible} setVisible={setVisible} images={images} />
        <div className={styles.customContentLeft_Padding}>
          <div className="mt-5 mb-6">
            <div className={styles.detailContent}>
              <h2 className={styles.customH2Address}>
                {getDetailEstateRequest?.data?.data && getDetailEstateRequest?.data.data?.address}
              </h2>
              <div className="flex items-center mb-3">
                <div className="mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                  >
                    <path
                      d="M2.84328 2.56825C6.24369 -0.832158 11.7568 -0.832158 15.1573 2.56825C18.5577 5.96866 18.5577 11.4818 15.1573 14.8822L13.9703 16.0561C13.0954 16.9148 11.9603 18.0187 10.5644 19.3683C9.6922 20.2116 8.3084 20.2115 7.4362 19.368L3.94515 15.9722C3.50638 15.5413 3.13912 15.178 2.84328 14.8822C-0.55713 11.4818 -0.55713 5.96866 2.84328 2.56825ZM14.0966 3.62891C11.282 0.814292 6.71856 0.814292 3.90394 3.62891C1.08931 6.44354 1.08931 11.0069 3.90394 13.8215L5.39101 15.289C6.20992 16.0904 7.2394 17.0908 8.4791 18.2898C8.7698 18.571 9.231 18.571 9.5218 18.2899L12.9167 14.9884C13.3856 14.5281 13.779 14.1392 14.0966 13.8215C16.9112 11.0069 16.9112 6.44354 14.0966 3.62891ZM9.0003 5.99891C10.658 5.99891 12.0018 7.34275 12.0018 9.00044C12.0018 10.6581 10.658 12.002 9.0003 12.002C7.3426 12.002 5.99871 10.6581 5.99871 9.00044C5.99871 7.34275 7.3426 5.99891 9.0003 5.99891ZM9.0003 7.49891C8.171 7.49891 7.4987 8.17114 7.4987 9.00044C7.4987 9.82974 8.171 10.502 9.0003 10.502C9.8295 10.502 10.5018 9.82974 10.5018 9.00044C10.5018 8.17114 9.8295 7.49891 9.0003 7.49891Z"
                      fill="#727C7D"
                    />
                  </svg>
                </div>
                <span className={styles.customAddressSpan}>
                  {getDetailEstateRequest?.data?.data &&
                    `${getDetailEstateRequest?.data.data?.addressDistrict}, ${getDetailEstateRequest?.data.data?.addressCity} `}
                </span>
              </div>
              <div className="flex flex-wrap">
                <DetailContentDesciption
                  title={
                    getDetailEstateRequest?.data?.data &&
                    getDetailEstateRequest?.data.data?.type === 'sale_apartment'
                      ? 'Chung cư'
                      : 'Nhà mặt đất'
                  }
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12.8217 17.655C12.6643 17.655 12.5366 17.7826 12.5366 17.9401V18.5294C12.5366 18.6868 12.6642 18.8145 12.8217 18.8145C12.9792 18.8145 13.1069 18.6869 13.1069 18.5294V17.9401C13.1069 17.7827 12.9792 17.655 12.8217 17.655Z"
                        fill="#727C7D"
                      />
                      <path
                        d="M9.16232 15.374H7.26271C7.04221 15.374 6.86283 15.5534 6.86283 15.7739V18.1734H6.86279C6.86279 18.3939 7.04221 18.5733 7.26267 18.5733H9.16232C9.38282 18.5733 9.5622 18.3939 9.5622 18.1734V15.7739C9.5622 15.5534 9.38278 15.374 9.16232 15.374ZM8.992 18.0031H7.43303V15.9442H8.992V18.0031Z"
                        fill="#727C7D"
                      />
                      <path
                        d="M16.8806 15.374H14.9809C14.7604 15.374 14.5811 15.5534 14.5811 15.7739V18.1734C14.5811 18.3939 14.7604 18.5733 14.9809 18.5733H16.8806C17.101 18.5733 17.2804 18.3939 17.2804 18.1734V15.7739C17.2804 15.5534 17.101 15.374 16.8806 15.374ZM16.7102 18.0031H15.1513V15.9442H16.7102V18.0031Z"
                        fill="#727C7D"
                      />
                      <path
                        d="M9.16232 9.94873H7.26271C7.04221 9.94873 6.86283 10.1281 6.86283 10.3486V12.7481H6.86279C6.86279 12.9686 7.04221 13.148 7.26267 13.148H9.16232C9.38282 13.148 9.5622 12.9686 9.5622 12.7481V10.3486C9.5622 10.1281 9.38278 9.94873 9.16232 9.94873ZM8.992 12.5778H7.43303V10.5189H8.992V12.5778Z"
                        fill="#727C7D"
                      />
                      <path
                        d="M13.0214 9.94873H11.1218C10.9013 9.94873 10.7219 10.1281 10.7219 10.3486V12.7481C10.7219 12.9686 10.9013 13.148 11.1218 13.148H13.0214C13.242 13.148 13.4213 12.9686 13.4213 12.7481V10.3486C13.4213 10.1281 13.242 9.94873 13.0214 9.94873ZM12.8511 12.5778H11.2922V10.5189H12.8511V12.5778Z"
                        fill="#727C7D"
                      />
                      <path
                        d="M16.8806 9.94873H14.9809C14.7604 9.94873 14.5811 10.1281 14.5811 10.3486V12.7481C14.5811 12.9686 14.7604 13.148 14.9809 13.148H16.8806C17.101 13.148 17.2804 12.9686 17.2804 12.7481V10.3486C17.2804 10.1281 17.101 9.94873 16.8806 9.94873ZM16.7102 12.5778H15.1513V10.5189H16.7102V12.5778Z"
                        fill="#727C7D"
                      />
                      <path
                        d="M9.16232 4.96057H7.26267C7.04217 4.96057 6.86279 5.13995 6.86279 5.36045V7.75994C6.86275 7.98044 7.04217 8.15982 7.26267 8.15982H9.16232C9.38282 8.15982 9.5622 7.98044 9.5622 7.75994V5.36045C9.5622 5.13995 9.38278 4.96057 9.16232 4.96057ZM8.99196 7.58962H7.43299V5.53076H8.99196V7.58962Z"
                        fill="#727C7D"
                      />
                      <path
                        d="M13.0214 4.96057H11.1218C10.9013 4.96057 10.7219 5.13995 10.7219 5.36045V7.75994C10.7219 7.98044 10.9013 8.15982 11.1218 8.15982H13.0214C13.242 8.15982 13.4213 7.98044 13.4213 7.75994V5.36045C13.4213 5.13995 13.242 4.96057 13.0214 4.96057ZM12.8511 7.58962H11.2922V5.53076H12.8511V7.58962Z"
                        fill="#727C7D"
                      />
                      <path
                        d="M16.8806 4.96057H14.9809C14.7604 4.96057 14.5811 5.13995 14.5811 5.36045V7.75994C14.581 7.98044 14.7604 8.15982 14.9809 8.15982H16.8806C17.101 8.15982 17.2804 7.98044 17.2804 7.75994V5.36045C17.2804 5.13995 17.101 4.96057 16.8806 4.96057ZM16.7102 7.58962H15.1512V5.53076H16.7102V7.58962Z"
                        fill="#727C7D"
                      />
                      <path
                        d="M20.3641 20.4414H19.9213C19.8654 19.7053 19.3493 19.0961 18.6605 18.9017L18.651 3.71886H18.9968C19.2011 3.71886 19.3673 3.55265 19.3673 3.34835V2.37051C19.3673 2.16621 19.2011 2 18.9968 2H17.0124C16.8549 2 16.7273 2.12762 16.7273 2.28512C16.7273 2.44262 16.8549 2.57023 17.0124 2.57023H18.7971V3.14867H5.34632V2.57023H17.2363C17.3938 2.57023 17.8985 2.44262 17.8985 2.28512C17.8985 2.12762 17.4717 2 17.3143 2H5.14659C4.9423 2 4.77609 2.16621 4.77609 2.37051V3.34839C4.77609 3.55269 4.9423 3.7189 5.14659 3.7189H5.4814L5.48876 15.3361C5.49063 18.2524 5.57895 16 5.73633 16C5.89379 15.9999 6.05918 15.6575 6.0591 15.5L6.05163 3.71886H18.0807L18.0903 18.8389L18.0875 18.8392C18.0776 18.8397 18.0677 18.8409 18.0578 18.8416C18.0344 18.8434 18.0109 18.8451 17.9876 18.8478C17.9749 18.8492 17.9624 18.8513 17.9498 18.8531C17.9295 18.8558 17.9092 18.8585 17.8892 18.862C17.8755 18.8644 17.862 18.8674 17.8485 18.87C17.8297 18.8737 17.8109 18.8774 17.7923 18.8817C17.7783 18.885 17.7645 18.8887 17.7506 18.8923C17.7326 18.897 17.7147 18.9016 17.6971 18.9068C17.6831 18.9109 17.6692 18.9154 17.6554 18.9199C17.6381 18.9254 17.6208 18.931 17.6037 18.9371C17.5899 18.942 17.5762 18.9473 17.5625 18.9526C17.5457 18.9591 17.529 18.9656 17.5125 18.9726C17.4988 18.9784 17.4854 18.9843 17.4719 18.9904C17.4556 18.9978 17.4395 19.0054 17.4235 19.0132C17.4103 19.0197 17.3971 19.0264 17.384 19.0332C17.3681 19.0415 17.3525 19.0501 17.3369 19.0588C17.3241 19.0661 17.3113 19.0734 17.2987 19.0809C17.2833 19.0901 17.2681 19.0997 17.2529 19.1094C17.2406 19.1173 17.2284 19.1252 17.2163 19.1333C17.2012 19.1435 17.1865 19.1541 17.1717 19.1648C17.1601 19.1733 17.1483 19.1817 17.1369 19.1904C17.1222 19.2016 17.1078 19.2133 17.0935 19.225C17.0824 19.234 17.0714 19.2428 17.0606 19.2521C17.0461 19.2645 17.0321 19.2774 17.018 19.2902C17.0079 19.2995 16.9976 19.3086 16.9877 19.3182C16.9732 19.3321 16.9592 19.3466 16.9452 19.3611C16.9363 19.3703 16.9271 19.3792 16.9183 19.3887C16.9031 19.405 16.8886 19.422 16.874 19.4391C16.8669 19.4473 16.8596 19.4551 16.8527 19.4635C16.8315 19.4891 16.8108 19.5154 16.791 19.5424C16.7584 19.5492 16.7263 19.5573 16.6945 19.5663C16.684 19.5692 16.6739 19.5727 16.6635 19.5759C16.6423 19.5825 16.6212 19.5892 16.6005 19.5968C16.5886 19.6011 16.5769 19.6058 16.5651 19.6104C16.5462 19.6178 16.5275 19.6256 16.509 19.6338C16.4971 19.6391 16.4853 19.6445 16.4736 19.6501C16.4553 19.6588 16.4374 19.668 16.4196 19.6775C16.4085 19.6834 16.3974 19.6892 16.3865 19.6954C16.3676 19.7062 16.3491 19.7176 16.3308 19.7292C16.3217 19.7349 16.3124 19.7403 16.3035 19.7463C16.2767 19.764 16.2504 19.7825 16.2249 19.8021C16.2233 19.8034 16.2218 19.8048 16.2202 19.806C16.1963 19.8245 16.173 19.8438 16.1504 19.8638C16.1423 19.871 16.1345 19.8787 16.1265 19.8861C16.1107 19.9006 16.0951 19.9153 16.0801 19.9306C16.0713 19.9395 16.0628 19.9487 16.0543 19.9578C16.0406 19.9725 16.0271 19.9874 16.014 20.0026C16.0057 20.0123 15.9975 20.0221 15.9894 20.032C15.9767 20.0477 15.9644 20.0638 15.9523 20.08C15.9449 20.09 15.9375 20.0998 15.9304 20.1099C15.9177 20.128 15.9057 20.1465 15.8938 20.1652C15.8882 20.174 15.8824 20.1826 15.877 20.1915C15.8602 20.2192 15.8442 20.2475 15.8294 20.2766C15.8283 20.2786 15.8274 20.2808 15.8264 20.2829C15.8127 20.3099 15.7999 20.3375 15.788 20.3655C15.7837 20.3756 15.7799 20.386 15.7758 20.3962C15.7698 20.4112 15.7635 20.4261 15.758 20.4414H13.91V15.8588C13.91 15.5915 13.6925 15.374 13.4252 15.374H10.7182C10.4509 15.374 10.2334 15.5915 10.2334 15.8588V20.4414H8.38545C8.37994 20.4261 8.37357 20.4112 8.36756 20.3961C8.36349 20.3859 8.35974 20.3756 8.35545 20.3656C8.34365 20.3379 8.33099 20.3106 8.31748 20.2838C8.31627 20.2815 8.31525 20.279 8.31404 20.2765C8.29924 20.2476 8.28326 20.2193 8.26654 20.1916C8.26107 20.1825 8.2551 20.1738 8.24939 20.1649C8.23764 20.1463 8.22572 20.128 8.21318 20.1101C8.206 20.0999 8.19846 20.0899 8.191 20.0799C8.179 20.0638 8.16681 20.0479 8.15416 20.0323C8.14599 20.0222 8.13771 20.0123 8.12928 20.0025C8.11627 19.9874 8.10291 19.9726 8.08928 19.958C8.08068 19.9488 8.07213 19.9396 8.06326 19.9306C8.04826 19.9154 8.03279 19.9008 8.01713 19.8863C8.00904 19.8788 8.00119 19.8711 7.99295 19.8638C7.97029 19.8438 7.94705 19.8245 7.92314 19.8061C7.92154 19.8048 7.92006 19.8034 7.91842 19.8022C7.89291 19.7826 7.86662 19.7641 7.83979 19.7463C7.83092 19.7404 7.82174 19.735 7.81275 19.7293C7.79432 19.7177 7.77576 19.7063 7.75678 19.6955C7.74592 19.6893 7.7349 19.6835 7.72389 19.6777C7.706 19.6681 7.68799 19.6589 7.66967 19.6501C7.65803 19.6446 7.64635 19.6392 7.63455 19.6339C7.61592 19.6256 7.59705 19.6179 7.57803 19.6104C7.56639 19.6058 7.55479 19.6011 7.54299 19.5969C7.52213 19.5893 7.50096 19.5825 7.47967 19.5759C7.4694 19.5728 7.45928 19.5693 7.44889 19.5663C7.41713 19.5574 7.38502 19.5492 7.3524 19.5424C7.33256 19.5155 7.31201 19.4893 7.29084 19.4637C7.28389 19.4553 7.27655 19.4474 7.26948 19.4392C7.25498 19.4223 7.24049 19.4054 7.22541 19.3892C7.21655 19.3796 7.20725 19.3705 7.19819 19.3612C7.18432 19.3469 7.17053 19.3326 7.15623 19.3188C7.14623 19.3092 7.13592 19.3001 7.12573 19.2907C7.11178 19.2779 7.09784 19.2651 7.0835 19.2528C7.07268 19.2435 7.06158 19.2346 7.05053 19.2256C7.03627 19.214 7.02202 19.2024 7.00744 19.1912C6.99592 19.1824 6.9842 19.174 6.97252 19.1654C6.95787 19.1548 6.94315 19.1443 6.92819 19.1342C6.91612 19.1259 6.90389 19.1181 6.89162 19.1102C6.87651 19.1005 6.86131 19.0909 6.84592 19.0817C6.83334 19.0742 6.82073 19.0669 6.80795 19.0597C6.79237 19.0509 6.77666 19.0424 6.76081 19.0341C6.74784 19.0273 6.73483 19.0206 6.72166 19.0141C6.70557 19.0062 6.68932 18.9986 6.67299 18.9912C6.65971 18.9852 6.64639 18.9792 6.63295 18.9735C6.61627 18.9664 6.59944 18.9598 6.58252 18.9533C6.56905 18.9481 6.55561 18.9428 6.54202 18.938C6.52467 18.9318 6.5071 18.9261 6.48952 18.9204C6.476 18.9161 6.46256 18.9116 6.44893 18.9076C6.43073 18.9022 6.41229 18.8975 6.39385 18.8927C6.38053 18.8892 6.36733 18.8855 6.35393 18.8824C6.33424 18.8778 6.31428 18.8739 6.2944 18.87C6.28202 18.8676 6.26975 18.8648 6.25733 18.8626C6.23374 18.8584 6.20987 18.8552 6.186 18.852C6.17702 18.8509 6.16815 18.8492 6.15913 18.8482C6.12667 18.8444 6.09405 18.8415 6.0612 18.8395L6.05885 15.1144C6.05878 14.957 5.93112 14.8295 5.77374 14.8295C5.61628 14.8296 5.48854 14.9573 5.48862 15.1148L5.49101 18.8995C4.79812 19.0914 4.27812 19.7025 4.2221 20.4415H3.77925C3.34957 20.4415 3 20.7911 3 21.2207C3 21.6505 3.34957 22 3.77925 22H20.3641C20.7939 22 21.1434 21.6504 21.1434 21.2207C21.1434 20.7909 20.7938 20.4414 20.3641 20.4414ZM16.4176 20.4083L16.4191 20.4063C16.431 20.3909 16.4437 20.3759 16.4567 20.3614C16.46 20.3577 16.4633 20.354 16.4667 20.3504C16.4794 20.3366 16.4924 20.3232 16.506 20.3103L16.5081 20.3083C16.5222 20.295 16.537 20.2824 16.552 20.2701C16.556 20.2669 16.5599 20.2637 16.5639 20.2606C16.5786 20.249 16.5936 20.2378 16.609 20.2273L16.6114 20.2256C16.6274 20.2147 16.644 20.2046 16.6609 20.1949C16.6653 20.1923 16.6698 20.1898 16.6743 20.1873C16.6908 20.1781 16.7077 20.1692 16.7249 20.1612L16.7269 20.1602C16.7447 20.1519 16.7629 20.1445 16.7813 20.1375C16.7861 20.1357 16.791 20.1339 16.7958 20.1322C16.8142 20.1256 16.8327 20.1194 16.8516 20.1141L16.8528 20.1138C16.8721 20.1084 16.8917 20.104 16.9114 20.1C16.9164 20.099 16.9214 20.0981 16.9265 20.0972C16.9464 20.0935 16.9666 20.0904 16.987 20.0882C17.0742 20.079 17.1524 20.0302 17.1989 19.9559C17.4141 19.6118 17.7843 19.4065 18.1892 19.4065C18.2126 19.4065 18.2367 19.4073 18.2611 19.4089L18.2649 19.4092C18.2893 19.4109 18.3141 19.4133 18.3393 19.4165L18.3425 19.4167C18.8707 19.4864 19.2888 19.9104 19.3491 20.4415H16.3941C16.4019 20.4302 16.4094 20.419 16.4176 20.4083ZM13.3398 15.9442V20.4414H10.8036V15.9442H13.3398ZM5.8096 19.4156L5.81085 19.4156C5.83514 19.4126 5.85854 19.4104 5.88155 19.409L5.88569 19.4086C5.90893 19.4072 5.93171 19.4064 5.95425 19.4064C6.35905 19.4064 6.72928 19.6118 6.94455 19.9559C6.97506 20.0047 7.01936 20.0421 7.07077 20.0649C7.09768 20.0769 7.12643 20.085 7.15643 20.0882C7.17678 20.0903 7.19705 20.0935 7.21694 20.0971C7.22201 20.098 7.22705 20.099 7.23209 20.1C7.25182 20.104 7.27143 20.1084 7.29065 20.1137L7.2919 20.1141C7.3108 20.1194 7.32936 20.1256 7.34768 20.1322C7.35248 20.1339 7.35729 20.1356 7.36205 20.1375C7.38049 20.1445 7.39877 20.1519 7.41654 20.1602L7.41815 20.161C7.43557 20.1691 7.45252 20.178 7.46924 20.1873C7.47365 20.1897 7.47803 20.1922 7.48236 20.1947C7.49928 20.2045 7.51596 20.2147 7.53213 20.2256L7.53393 20.2269C7.54959 20.2376 7.56475 20.249 7.57963 20.2606C7.58354 20.2637 7.58744 20.2668 7.59127 20.27C7.60639 20.2823 7.62119 20.2949 7.63537 20.3083L7.63717 20.31C7.65084 20.3229 7.66393 20.3365 7.67666 20.3503C7.68006 20.354 7.68342 20.3576 7.68674 20.3613C7.69971 20.3759 7.71233 20.3907 7.72424 20.4061L7.72607 20.4086C7.7342 20.4192 7.74166 20.4303 7.74928 20.4413H4.79421C4.8548 19.9074 5.27722 19.4817 5.8096 19.4156ZM20.3641 21.4297H3.77925C3.66398 21.4297 3.57019 21.3359 3.57019 21.2207C3.57019 21.1054 3.66398 21.0116 3.77925 21.0116H20.3641C20.4794 21.0116 20.5732 21.1054 20.5732 21.2207C20.5732 21.3359 20.4794 21.4297 20.3641 21.4297Z"
                        fill="#727C7D"
                        stroke="#727C7D"
                        strokeWidth="0.4"
                      />
                      <rect x="11" y="10" width="2" height="3" fill="#727C7D" />
                      <rect x="7" y="10" width="2" height="3" fill="#727C7D" />
                      <path d="M7 15.7734H9V18H7V15.7734Z" fill="#727C7D" />
                      <path d="M15 15.5H17V18H15V15.5Z" fill="#727C7D" />
                      <rect x="15" y="10" width="2" height="3" fill="#727C7D" />
                      <rect x="15" y="5" width="2" height="3" fill="#727C7D" />
                      <rect x="11" y="5" width="2" height="3" fill="#727C7D" />
                      <rect x="7" y="5" width="2" height="3" fill="#727C7D" />
                    </svg>
                  }
                />
                {getDetailEstateRequest?.data?.data &&
                  getDetailEstateRequest?.data.data?.numBedroom && (
                    <DetailContentDesciption
                      title={`${getDetailEstateRequest?.data.data.numBedroom} phòng ngủ`}
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M6.75 4H17.25C18.7125 4 19.9084 5.1417 19.995 6.58248L20 6.75L20.0006 10.1037C21.0968 10.414 21.9147 11.3872 21.9937 12.5628L22 12.75V20.25C22 20.6642 21.6642 21 21.25 21C20.8703 21 20.5565 20.7178 20.5068 20.3518L20.5 20.25V18H3.5V20.25C3.5 20.6297 3.21785 20.9435 2.85177 20.9932L2.75 21C2.3703 21 2.05651 20.7178 2.00685 20.3518L2 20.25V12.75C2 11.4911 2.84596 10.4297 4.00044 10.1034L4 6.75C4 5.28747 5.1417 4.0916 6.58248 4.00502L6.75 4ZM19.25 11.5H4.75C4.10279 11.5 3.57047 11.9919 3.50645 12.6222L3.5 12.75V16.5H20.5V12.75C20.5 12.1028 20.0081 11.5705 19.3778 11.5065L19.25 11.5ZM17.25 5.5H6.75C6.10279 5.5 5.57047 5.99187 5.50645 6.62219L5.5 6.75V10H7C7 9.44772 7.44772 9 8 9H10C10.5128 9 10.9355 9.38604 10.9933 9.88338L11 10H13C13 9.44772 13.4477 9 14 9H16C16.5128 9 16.9355 9.38604 16.9933 9.88338L17 10H18.5V6.75C18.5 6.10279 18.0081 5.57047 17.3778 5.50645L17.25 5.5Z"
                            fill="#727C7D"
                          />
                        </svg>
                      }
                    />
                  )}
                {getDetailEstateRequest?.data?.data &&
                  getDetailEstateRequest?.data.data?.direction && (
                    <DetailContentDesciption
                      title={`${convertDerectionText(getDetailEstateRequest?.data.data.direction)}`}
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={18}
                          height={20}
                          viewBox="0 0 18 20"
                          fill="none"
                        >
                          <path
                            d="M10 18C10 18 10.8934 18.0858 11.3934 18.5858C11.8934 19.0858 12 20 12 20H6C6 19.4696 6.21071 18.9609 6.58579 18.5858C6.96086 18.2107 7.46957 18 8 18V10H0.5L3 7.5L0.5 5H8V1L9 0L10 1V5H15L17.5 7.5L15 10H10V18Z"
                            fill="#807E7E"
                          />
                        </svg>
                      }
                    />
                  )}
                {getDetailEstateRequest?.data?.data && getDetailEstateRequest?.data.data?.size && (
                  <DetailContentDesciption
                    title={`${getDetailEstateRequest?.data.data.size} m²`}
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M21.428 17.6892C22.1896 18.4508 22.1896 19.6898 21.428 20.4514C21.4269 20.4526 21.4257 20.4537 21.4245 20.4549L20.0881 21.7746C19.9358 21.9249 19.7375 22 19.5393 22C19.3375 22 19.1361 21.9225 18.9832 21.7678C18.6802 21.4608 18.6832 20.9661 18.9902 20.6629L19.7721 19.8906H7.23441C5.51124 19.8906 4.10941 18.4888 4.10941 16.7656V4.20901L3.32999 4.97806C3.02283 5.2811 2.52814 5.27774 2.2251 4.97058C1.92206 4.66342 1.92542 4.16873 2.23258 3.86569L3.55247 2.56366C4.3119 1.81445 5.54755 1.81445 6.30698 2.56366L7.62687 3.86569C7.93403 4.16873 7.93738 4.66342 7.63435 4.97058C7.48145 5.12546 7.27988 5.20312 7.07816 5.20312C6.87995 5.20312 6.68174 5.1282 6.52946 4.97806L5.67191 4.13196V16.7656C5.67191 17.6271 6.3729 18.3281 7.23441 18.3281H19.8513L18.9902 17.4778C18.6832 17.1746 18.68 16.6799 18.9832 16.3729C19.2864 16.066 19.7811 16.0628 20.0881 16.366L21.4245 17.6857C21.4257 17.687 21.4269 17.688 21.428 17.6892ZM19.6563 2H9.5391C9.10651 2 8.75632 2.35156 8.75785 2.78415C8.75953 3.21445 9.1088 3.5625 9.5391 3.5625H19.6563C20.0878 3.5625 20.4375 3.91223 20.4375 4.34375V14.5C20.4375 14.9303 20.7856 15.2797 21.2159 15.2812C21.6485 15.2828 22 14.9326 22 14.5V4.34375C22 3.04935 20.9507 2 19.6563 2ZM13.4844 15.3942C13.9159 15.3942 14.2657 15.0444 14.2657 14.6129V11.1357C14.2657 9.95105 13.3019 8.9873 12.1172 8.9873C11.5983 8.9873 11.1217 9.17224 10.75 9.47971C10.3783 9.17224 9.9018 8.9873 9.38285 8.9873C9.08485 8.9873 8.80073 9.04849 8.54255 9.15866C8.40354 9.0314 8.21891 8.95312 8.01566 8.95312C7.58414 8.95312 7.23441 9.30286 7.23441 9.73438V14.6172C7.23441 15.0487 7.58414 15.3984 8.01566 15.3984C8.44718 15.3984 8.79691 15.0487 8.79691 14.6172V11.1357C8.79691 10.8127 9.05982 10.5498 9.38285 10.5498C9.70588 10.5498 9.96879 10.8127 9.96879 11.1357V14.6172C9.96879 15.0487 10.3185 15.3984 10.75 15.3984C11.1816 15.3984 11.5313 15.0487 11.5313 14.6172V11.1357C11.5313 10.8127 11.7942 10.5498 12.1172 10.5498C12.4403 10.5498 12.7032 10.8127 12.7032 11.1357V14.6129C12.7032 15.0444 13.0529 15.3942 13.4844 15.3942ZM17.0293 6.21875C17.0252 6.21875 17.0212 6.21936 17.0171 6.21936C17.0132 6.21936 17.0092 6.21875 17.0051 6.21875C16.0116 6.21875 15.2032 7.02808 15.2032 8.0228C15.2032 8.45416 15.5529 8.80405 15.9844 8.80405C16.4159 8.80405 16.7657 8.45416 16.7657 8.0228C16.7657 7.89188 16.8754 7.78125 17.0051 7.78125C17.0092 7.78125 17.0132 7.78064 17.0173 7.78064C17.0212 7.78064 17.0252 7.78125 17.0293 7.78125C17.1537 7.78125 17.2596 7.88287 17.2681 8.00662C17.2527 8.06384 17.1329 8.41769 16.3843 9.24121C15.92 9.75177 15.4638 10.1676 15.4594 10.1715C15.2203 10.3885 15.1394 10.7303 15.2557 11.0314C15.3719 11.3326 15.6615 11.5312 15.9844 11.5312H18.0938C18.5253 11.5312 18.875 11.1815 18.875 10.75C18.875 10.3185 18.5253 9.96875 18.0938 9.96875H17.8251C18.5187 9.1521 18.8312 8.54434 18.8312 8.0228C18.8312 7.02808 18.0228 6.21875 17.0293 6.21875Z"
                          fill="#727C7D"
                        />
                      </svg>
                    }
                  />
                )}
                {getDetailEstateRequest?.data?.data && getDetailEstateRequest?.data.data?.price && (
                  <DetailContentDesciption
                    title={`${getDetailEstateRequest?.data.data.price}`}
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M21.7221 9.82009L12.8136 3.77589C12.3117 3.43538 11.6883 3.43538 11.1864 3.77589L9.70828 4.77868V3.35117C9.70828 2.60603 9.1553 2 8.47552 2H7.63385C6.95422 2 6.40124 2.60619 6.40124 3.35117V7.02249L2.27786 9.82009C2.00259 10.0068 1.91744 10.4028 2.08773 10.7049C2.25787 11.0069 2.61904 11.1003 2.89416 10.9136L4.4768 9.83984V18.7143H4.28256C3.95892 18.7143 3.69662 19.0021 3.69662 19.3571C3.69662 19.7122 3.95892 20 4.28256 20H19.7174C20.0411 20 20.3034 19.7122 20.3034 19.3571C20.3034 19.0021 20.0411 18.7143 19.7174 18.7143H19.5232V9.83984L21.1057 10.9134C21.2018 10.9786 21.3082 11.0097 21.4133 11.0097C21.6097 11.0097 21.8015 10.9014 21.9123 10.7049C22.0826 10.4028 21.9974 10.0068 21.7221 9.82009ZM7.57296 3.35117C7.57296 3.31501 7.60028 3.28571 7.63385 3.28571H8.47552C8.50909 3.28571 8.53656 3.31501 8.53656 3.35117V5.57372L7.57312 6.22746V3.35117H7.57296ZM18.3513 18.7143H5.64868V9.04464L11.8027 4.86942C11.9245 4.78689 12.0755 4.78689 12.1973 4.86942L18.3513 9.04464V18.7143Z"
                          fill="#727C7D"
                        />
                        <path
                          d="M11.3312 9.55309V10.3397C10.5564 10.5677 10 11.1805 10 11.8989C10 12.811 10.8971 13.5531 11.9999 13.5531C12.3654 13.5531 12.6627 13.799 12.6627 14.1013C12.6627 14.4035 12.3654 14.6493 11.9999 14.6493H10.6687C10.2993 14.6493 10 14.8969 10 15.2024C10 15.5079 10.2993 15.7555 10.6687 15.7555H11.3312V16.4469C11.3312 16.7524 11.6308 17 11.9999 17C12.3692 17 12.6686 16.7524 12.6686 16.4469V15.6605C13.4436 15.4325 14 14.8196 14 14.1013C14 13.1891 13.1029 12.4469 11.9999 12.4469C11.6346 12.4469 11.3373 12.201 11.3373 11.8989C11.3373 11.5965 11.6346 11.3507 11.9999 11.3507H13.3313C13.7007 11.3507 14 11.1031 14 10.7976C14 10.4921 13.7007 10.2445 13.3313 10.2445H12.6686V9.55309C12.6686 9.2476 12.3692 9 11.9999 9C11.6308 9 11.3312 9.24774 11.3312 9.55309Z"
                          fill="#727C7D"
                        />
                      </svg>
                    }
                  />
                )}
                {getDetailEstateRequest?.data?.data && getDetailEstateRequest?.data.data?.size && (
                  <DetailContentDesciption
                    title={<a href={`${getDetailEstateRequest?.data.data.url}`}>Bài gốc</a>}
                    icon={<LinkOutlined />}
                  />
                )}
              </div>
            </div>
          </div>
          <div className={cls(styles.detailOverviewDescribe)} id="detailOverviewDescribe">
            <div className="mb-5">
              <h2>
                {' '}
                {getDetailEstateRequest?.data?.data && getDetailEstateRequest?.data.data?.title}
              </h2>
            </div>
            <div className="mb-4">
              <span className={styles.detailOverviewDescribe_OverviewSpan}>
                {getDetailEstateRequest?.data?.data &&
                  getDetailEstateRequest?.data.data?.description}
              </span>
            </div>
            <div>
              <div>
                <span className={styles.detailOverviewDescribe_OverviewDetailSpan}>
                  Diện tích:{' '}
                  {getDetailEstateRequest?.data?.data && getDetailEstateRequest?.data.data?.size} m²
                </span>
              </div>
              <div>
                <span className={styles.detailOverviewDescribe_OverviewDetailSpan}>
                  Giá:{' '}
                  {getDetailEstateRequest?.data?.data && getDetailEstateRequest?.data.data?.price}
                </span>
              </div>
              <div>
                <span className={styles.detailOverviewDescribe_OverviewDetailSpan}>
                  Hướng:{' '}
                  {getDetailEstateRequest?.data?.data &&
                    getDetailEstateRequest?.data.data?.direction}
                </span>
              </div>
              <div>
                <span className={styles.detailOverviewDescribe_OverviewDetailSpan}>
                  Số phòng ngủ:{' '}
                  {getDetailEstateRequest?.data?.data &&
                    getDetailEstateRequest?.data.data?.numBedroom}
                </span>
              </div>
              <div>
                <span className={styles.detailOverviewDescribe_OverviewDetailSpan}>
                  Ngày bắt đầu:{' '}
                  {getDetailEstateRequest?.data?.data &&
                    getDetailEstateRequest?.data.data?.startDate}
                </span>
              </div>
              <div>
                <span className={styles.detailOverviewDescribe_OverviewDetailSpan}>
                  Ngày kết thúc:{' '}
                  {getDetailEstateRequest?.data?.data && getDetailEstateRequest?.data.data?.endDate}
                </span>
              </div>
            </div>
          </div>
          <div className={cls(styles.commonSection, 'mb-5 mt-10')}>
            <div className="mb-5">
              <h2>Dự đoán giá</h2>
            </div>
            <PriceRangeSlider
              under1={
                getDetailEstateRequest?.data?.data && getDetailEstateRequest?.data.data?.under1
              }
              under2={
                getDetailEstateRequest?.data?.data && getDetailEstateRequest?.data.data?.under2
              }
              mean={getDetailEstateRequest?.data?.data && getDetailEstateRequest?.data.data?.mean}
              over1={getDetailEstateRequest?.data?.data && getDetailEstateRequest?.data.data?.over1}
              over2={getDetailEstateRequest?.data?.data && getDetailEstateRequest?.data.data?.over2}
              pricePerM2={
                getDetailEstateRequest?.data?.data && getDetailEstateRequest?.data.data?.pricePerM2
              }
            />
          </div>
          <div className={cls(styles.commonSection, 'mb-5 mt-10')}>
            <AgileChar
              mode="detail"
              zoom={map?.getZoom()}
              data={getChartRequest?.data?.data}
              loading={getChartRequest?.loading}
            />
          </div>
          <Tooltip title="Đang phát triển">
            <div
              style={{
                color: '#cbd5e0',
              }}
              className={cls(styles.commonSection, 'mb-5 mt-10 cursor-not-allowed')}
            >
              <div className="mb-5">
                <h2>Thông tin nâng cao</h2>
              </div>
              <PriceRangeSliderAdvanced
                under1={
                  getDetailEstateRequest?.data?.data && getDetailEstateRequest?.data.data?.under1
                }
                under2={
                  getDetailEstateRequest?.data?.data && getDetailEstateRequest?.data.data?.under2
                }
                mean={getDetailEstateRequest?.data?.data && getDetailEstateRequest?.data.data?.mean}
                over1={
                  getDetailEstateRequest?.data?.data && getDetailEstateRequest?.data.data?.over1
                }
                over2={
                  getDetailEstateRequest?.data?.data && getDetailEstateRequest?.data.data?.over2
                }
                pricePerM2={
                  getDetailEstateRequest?.data?.data &&
                  getDetailEstateRequest?.data.data?.pricePerM2
                }
              />
            </div>
          </Tooltip>
          <div className={styles.sellerContact} id="sellerContact">
            <div className="mb-2">
              <span className={styles.customDetailPrice}>
                {getDetailEstateRequest?.data?.data && getDetailEstateRequest?.data.data?.price}
              </span>
            </div>
            <div className="mb-2">
              <span className={styles.customDetailAdress}>
                {getDetailEstateRequest?.data?.data && getDetailEstateRequest?.data.data?.address}
              </span>
            </div>
            <div className={styles.sellerContact_Button} onClick={handleContactModalOpen}>
              Liên hệ người bán
            </div>
          </div>
          <div className={cls(styles.commonSection, 'mb-5 mt-10')} id="similarEstate">
            <div className="mb-5">
              <h2>Các bất động sản tương tự</h2>
            </div>
            <SimilarEstate id={filters?.where?.id} />
          </div>
        </div>

        <BreadCrumbDetailFooter />
      </div>
      <ContactModal
        contactName={
          getDetailEstateRequest?.data?.data && getDetailEstateRequest?.data.data?.contactName
        }
        contactMobile={
          getDetailEstateRequest?.data?.data && getDetailEstateRequest?.data.data?.contactMobile
        }
        contactEmail={
          getDetailEstateRequest?.data?.data && getDetailEstateRequest?.data.data?.contactEmail
        }
        visible={isContactModalVisible}
        onClose={handleContactModalClose}
      />
    </>
  );
};

export default connect(({ login }) => ({
  loggedIn: login.loggedIn,
}))(MapLeftContent);
