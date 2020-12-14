/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback } from 'react';
import { useRequest, usePagination } from '@umijs/hooks';
import { Row, Col, Pagination } from 'antd';
import { useQueryLocation } from '@/hooks/useQueryLocation';
import LeftArrow from '@/components/Icons/LeftArrow';
import EstateComponent from '@/components/EstatesComponent';
import SkeletonLoading from '@/pageModules/Map/components/MapLeft/SkeletonLoading';
import { getAllEstatesFromId } from '../../services/getFilterEstates';
import styles from './index.less';

const BuildingListAppartment = ({ id }) => {
  const { setFilter } = useQueryLocation();
  const getList = useCallback(({ current, pageSize }) => {
    return getAllEstatesFromId({ id, current, pageSize });
  });
  const { data, loading, pagination } = usePagination(getList, [id], {
    defaultPageSize: 6,
    formatResult: (res) => ({
      data: res?.data?.data,
      total: res?.data?.totalRecords,
    }),
  });

  const onHistoryBack = useCallback(() => {
    console.log('history-back')
    // history.goBack();
    setFilter({
      id: null,
      buildingId: null,
    });
  }, []);
  return (
    <div className={styles.BuildingListAppartment_Wrapper}>
      {loading && <SkeletonLoading />}
      {!loading && (
        <>
          <div className="mb-4 flex items-center">
            <div className="mr-2 cursor-pointer" onClick={onHistoryBack}>
              <LeftArrow />
            </div>
            <h2 className={styles.customHeaderH2}>
              Chung cư đang bán tại{' '}
              {Array.isArray(data?.data) ? `${data?.data[0]?.address}` : 'đây'}
            </h2>
          </div>
          <Row gutter={[32, 32]}>
            {(data || []).map((d) => (
              <Col
                key={d._id}
                className={`${styles.customEstateComponent}, ${styles.customEstateComponentEffect}`}
                lg={{ span: 12 }}
                xxl={{ span: 12 }}
              >
                <div
                  className={styles.estateComponent}
                  onClick={() => {
                    setFilter({
                      id: d._id,
                    });
                  }}
                >
                  <EstateComponent data={d} />
                </div>
              </Col>
            ))}
          </Row>
          <div>
            {data?.length >= 1 && (
              <Pagination
                {...pagination}
                total={pagination.totalPage * pagination.pageSize || null}
                pageSize={pagination.pageSize}
                className={styles.customPagination}
                showSizeChanger={false}
                size="small"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BuildingListAppartment;
