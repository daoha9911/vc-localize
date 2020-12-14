/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useCallback } from 'react';
import cls from 'classnames';
import { useRequest } from '@umijs/hooks';
import { useDispatch } from 'dva';
import EstateCompare from './EstateCompare';
import { getOneEstates } from '../../Map/services/getFilterEstates';
import CompareDetailItem from './CompareDetailItem';
import styles from '../index.less';

const CompareDetail = ({ id, type }) => {
  const dispatch = useDispatch();

  const { run, loading, data } = useRequest(getOneEstates, { manual: true });

  useEffect(() => {
    if (type === 'sale_apartment') {
      run('apartment', id);
    }
    if (type === 'sale_house') {
      run('house', id);
    }
  }, [id, type]);

  const removeEstate = useCallback(
    (estateId) => {
      if (dispatch) {
        dispatch({
          type: 'compare/removeEstate',
          payload: {
            id: estateId,
          },
        });
      }
    },
    [data],
  );

  return (
    <>
      <div className={`flex flex-col ${styles.CompareDetail_Wrapper}`}>
        <CompareDetailItem>
          <div className={styles.CompareDetail_Estate}>
            <EstateCompare data={data?.data} />
            <div
              className={styles.CompareDetail_EstateDelete}
              onClick={() => {
                removeEstate(data?.data?._id);
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.39705 0.553791L0.46967 0.46967C0.73594 0.2034 1.1526 0.1792 1.44621 0.39705L1.53033 0.46967L8 6.939L14.4697 0.46967C14.7626 0.17678 15.2374 0.17678 15.5303 0.46967C15.8232 0.76256 15.8232 1.23744 15.5303 1.53033L9.061 8L15.5303 14.4697C15.7966 14.7359 15.8208 15.1526 15.6029 15.4462L15.5303 15.5303C15.2641 15.7966 14.8474 15.8208 14.5538 15.6029L14.4697 15.5303L8 9.061L1.53033 15.5303C1.23744 15.8232 0.76256 15.8232 0.46967 15.5303C0.17678 15.2374 0.17678 14.7626 0.46967 14.4697L6.939 8L0.46967 1.53033C0.2034 1.26406 0.1792 0.847401 0.39705 0.553791L0.46967 0.46967L0.39705 0.553791Z"
                  fill="#727C7D"
                />
              </svg>
            </div>
          </div>
        </CompareDetailItem>
        <CompareDetailItem>
          <div className={styles.customCell}>
            <span className={styles.customSpan}>{data && data?.data?.size}</span>
          </div>
        </CompareDetailItem>
        <CompareDetailItem>
          <div className={styles.customCell}>
            <span className={styles.customPriceSpan}>{data && data?.data?.price}</span>
          </div>
        </CompareDetailItem>
        <CompareDetailItem>
          <div className={styles.customCell}>
            <span className={styles.customSpan}>{data && data?.data?.numBedroom} phòng</span>
          </div>
        </CompareDetailItem>
        <CompareDetailItem>
          <div className={styles.customCell}>
            <span className={styles.customSpan}>{data && data?.data?.direction}</span>
          </div>
        </CompareDetailItem>
        <CompareDetailItem>
          <div className={styles.customCell}>
            <span className={styles.customSpan}>{data && data?.data?.numToilet}</span>
          </div>
        </CompareDetailItem>
        <CompareDetailItem>
          <div className={styles.CompareDetail_Services}>
            <div className="flex flex-col">
              <span className={cls(styles.customSpan, 'mb-2')}>Điều hoà</span>
              <span className={cls(styles.customSpan, 'mb-2')}>TV</span>
              <span className={cls(styles.customSpan, 'mb-2')}>Máy giặt</span>
              <span className={cls(styles.customSpan, 'mb-2')}>Tủ lạnh</span>
            </div>
          </div>
        </CompareDetailItem>
      </div>
    </>
  );
};

export default CompareDetail;
