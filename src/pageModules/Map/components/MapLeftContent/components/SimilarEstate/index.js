/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useCallback } from 'react';
import { Row, Col, Pagination } from 'antd';
import { useRequest, usePagination } from '@umijs/hooks';
import { useQueryLocation } from '@/hooks/useQueryLocation';
import EstateComponent from '@/components/EstatesComponent';
import SkeletonLoading from '@/pageModules/Map/components/MapLeft/SkeletonLoading';
import recordTypes from '@/modelDefs/recordTypes';
import styles from './index.less';
import { getSimilarEstate } from '../../../../../../services/estate';

const SimilarEstate = ({ id }) => {
  const { filters, setFilter } = useQueryLocation();
  const getList = useCallback(
    ({ current, pageSize }) =>
      getSimilarEstate({
        id,
        current,
        pageSize,
        recordType: filters?.where?.recordType || recordTypes.apartment,
      }),
    [filters?.where?.recordTypem, id],
  );

  const { data, loading, pagination } = usePagination(getList, [id], {
    defaultPageSize: 6,
    formatResult: (res) => ({
      data: res?.data?.data,
      total: res?.data?.totalPages,
    }),
  });

  return (
    <div>
      {loading && <SkeletonLoading />}
      <Row gutter={[32, 32]}>
        {(data || [])?.slice(0, 20).map((estate) => (
          <Col
            key={estate?._id}
            className={`${styles.customEstateComponent}, ${styles.customEstateComponentEffect}`}
            lg={{ span: 12 }}
            xxl={{ span: 12 }}
          >
            <div
              className={styles.estateComponent}
              onClick={() => {
                setFilter({
                  id: estate._id,
                });
              }}
            >
              <EstateComponent data={estate} />
            </div>
          </Col>
        ))}
      </Row>
      <div>
        {data?.length >= 1 && (
          <Pagination
            total={pagination.totalPage * pagination.pageSize || null}
            onChange={pagination.changeCurrent}
            pageSize={pagination.pageSize}
            className={styles.customPagination}
            showSizeChanger={false}
            size="small"
          />
        )}
      </div>
    </div>
  );
};

export default SimilarEstate;
