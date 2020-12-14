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
import SwiperImage from './CompareSwiperImage';
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
          <div className="cursor-pointer">
            <SwiperImage data={data} images={data?.images?.split(',')?.slice(0, 4)} />
            <div className="mt-3">
              <span className={styles.spanAdress}>{data?.address}</span>
            </div>
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
