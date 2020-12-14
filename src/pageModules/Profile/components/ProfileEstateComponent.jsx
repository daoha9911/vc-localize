/* eslint-disable no-underscore-dangle */
/* eslint-disable no-lonely-if */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import cls from 'classnames';
import { Modal } from 'antd';
import { useQueryLocation } from '@/hooks/useQueryLocation';
import { connect } from 'dva';
import { addFavoriteEstate, deleteFavoriteEstate } from '@/services/estate';
import { useRequest } from '@umijs/hooks';
import { convertTimeDiffToDay } from '@/utils/utils';
import { history } from 'umi';

import SwiperImage from './SwiperImage';

import styles from '../index.less';

const EstateComponent = ({
  data,
  currentUser,
  loggedIn,
  compareEstate,
  dispatch,
  favorEstates,
}) => {
  const { confirm } = Modal;

  const [active, setActive] = useState(false);

  const [favorActive, setFavorActive] = useState(false);

  const { setFilter } = useQueryLocation();

  const {
    data: dataAddFavorEstate,
    run: runAddFavorEstate,
    loading: loadingAddFavorEstate,
  } = useRequest(addFavoriteEstate, {
    manual: true,
    onSuccess: () => {
      setFavorActive(true);
    },
  });

  const {
    data: dataRemoveFavorEstate,
    run: runRemoveFavorEstate,
    loading: loadingRemoveFavorEstate,
  } = useRequest(deleteFavoriteEstate, {
    manual: true,
    onSuccess: () => {
      setFavorActive(false);
    },
  });

  const renderFavorEstates = useMemo(() => {
    if (Array.isArray(favorEstates)) {
      return favorEstates?.map((favorEstate) => favorEstate?.idEstate);
    }
    return [];
  }, [favorEstates]);

  useEffect(() => {
    if (compareEstate?.includes(data?._id)) {
      setActive(true);
    }
  }, [compareEstate]);

  useEffect(() => {
    if (renderFavorEstates?.includes(data?._id)) {
      setFavorActive(true);
    }
  }, [favorEstates, data]);

  const renderActiveClass = useCallback(() => {
    return cls('flex mt-2 items-center cursor-pointer', { [styles.activeCompare]: active });
  }, [active]);

  const handleCompareClick = useCallback(
    (id, type) => {
      if (!loggedIn) {
        dispatch({
          type: 'formregister/openForm',
        });
      }
      if (loggedIn && !active) {
        setActive(true);
        dispatch({
          type: 'compare/addEstate',
          payload: {
            id,
            type,
          },
        });
      }

      if (loggedIn && active) {
        setActive(false);
        dispatch({
          type: 'compare/removeEstate',
          payload: {
            id,
          },
        });
      }
    },
    [currentUser, active],
  );

  const handleFavorEstateClick = useCallback(
    (id, type) => {
      if (!loggedIn) {
        dispatch({
          type: 'formregister/openForm',
        });
      } else {
        if (!favorActive) {
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
    [favorActive, loggedIn],
  );

  return (
    <>
      {data && (
        <div className={cls('flex-col relative')}>
          <div
            className="cursor-pointer"
            onClick={() => {
              history.push('/map');
              setFilter({
                id: data._id,
              });
            }}
          >
            <SwiperImage data={data} images={data?.images?.split(',')?.slice(0, 4)} />
            <div className="mt-2 mb-1">
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
          <div className={renderActiveClass()}>
            <div className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M0 4C0 1.79086 1.79086 0 4 0H12C14.2091 0 16 1.79086 16 4V12C16 14.2091 14.2091 16 12 16H4C1.79086 16 0 14.2091 0 12V4Z"
                  fill={active ? '#00AEAC' : 'white'}
                />
                <path
                  d="M9.4827 2.78382L11.8777 5.18102C12.0194 5.32292 12.0324 5.54494 11.9166 5.70154L11.878 5.7464L9.48302 8.14901C9.32712 8.30538 9.07409 8.30565 8.91787 8.1496C8.77588 8.00773 8.76272 7.78554 8.8786 7.62885L8.91729 7.58394L10.6312 5.86507L4.39961 5.86542C4.1973 5.86542 4.03011 5.71494 4.00364 5.5197L4 5.46542C4 5.26292 4.15033 5.09556 4.34538 5.06907L4.39961 5.06542L10.6323 5.06507L8.91761 3.34952C8.77572 3.20752 8.76283 2.9853 8.87887 2.8287L8.91755 2.78384C9.05944 2.64182 9.28141 2.6289 9.43789 2.74509L9.4827 2.78382L11.8777 5.18102L9.4827 2.78382ZM11.9964 10.4795L12 10.5338C12 10.7363 11.8497 10.9037 11.6546 10.9301L11.6004 10.9338L5.36869 10.9333L7.08496 12.6503C7.2269 12.7923 7.23985 13.0146 7.12386 13.1712L7.08518 13.216C6.9434 13.3581 6.72138 13.3711 6.5649 13.255L6.52006 13.2163L4.12243 10.8183C3.9805 10.6764 3.96751 10.4541 4.08352 10.2975L4.12219 10.2526L6.51983 7.85061C6.67582 7.69434 6.92883 7.69424 7.08496 7.85035C7.2269 7.99232 7.23985 8.21456 7.12386 8.3712L7.08518 8.41605L5.37082 10.1333L11.6004 10.1338C11.8027 10.1338 11.9699 10.2843 11.9964 10.4795L12 10.5338L11.9964 10.4795Z"
                  fill={active ? 'white' : '#727C7D'}
                />
                <path
                  d="M4 1H12V-1H4V1ZM15 4V12H17V4H15ZM12 15H4V17H12V15ZM1 12V4H-1V12H1ZM4 15C2.34315 15 1 13.6569 1 12H-1C-1 14.7614 1.23858 17 4 17V15ZM15 12C15 13.6569 13.6569 15 12 15V17C14.7614 17 17 14.7614 17 12H15ZM12 1C13.6569 1 15 2.34315 15 4H17C17 1.23858 14.7614 -1 12 -1V1ZM4 -1C1.23858 -1 -1 1.23858 -1 4H1C1 2.34315 2.34315 1 4 1V-1Z"
                  fill={active ? '#00AEAC' : '#727C7D'}
                />
              </svg>
            </div>
            <span
              className={styles.spanComparePrice}
              onClick={(e) => {
                e.stopPropagation();
                handleCompareClick(data?._id, data?.type);
              }}
            >
              So sánh giá
            </span>
          </div>
          <div className={cls('absolute', styles.customInto)}>
            <div className={cls('flex justify-between items-center')}>
              <div className={styles.introDay}>
                <span>{convertTimeDiffToDay(data?.startDate) || 'Mới'}</span>
              </div>
              <div
                className={cls('cursor-pointer', { [styles.customInto_favor]: favorActive })}
                onClick={() => handleFavorEstateClick(data?._id, data?.type)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="21"
                  viewBox="0 0 16 21"
                  fill="none"
                >
                  <path
                    d="M1.5 3C1.5 1.89543 2.39543 1 3.5 1H12.5C13.6046 1 14.5 1.89543 14.5 3V18.4535C14.5 19.3623 13.3856 19.7999 12.7672 19.1339L8.73279 14.7892C8.33716 14.3631 7.66284 14.3631 7.26721 14.7892L3.23279 19.1339C2.61435 19.7999 1.5 19.3623 1.5 18.4535V3Z"
                    fill="white"
                    stroke="#ED411C"
                    strokeWidth="1.2"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default connect(({ user, login, compare }) => ({
  currentUser: user.currentUser,
  loggedIn: login.loggedIn,
  compareEstate: compare.estates,
}))(EstateComponent);
