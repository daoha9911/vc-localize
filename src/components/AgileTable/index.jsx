import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Table } from 'antd';
import { useRequest } from '@umijs/hooks';
import getGeoPrice from '@/pageModules/Map/services/getGeoPrice';
import { useQueryLocation } from '@/hooks/useQueryLocation';
import { debounce } from 'lodash';
import styles from './index.less';

const AgileTable = ({ zoom, currentProvince, currentDis }) => {
  const { filters } = useQueryLocation();
  const [currentNameType, setCurrentNameType] = useState();

  const { loading, run, data } = useRequest(getGeoPrice, {
    manual: true,
    onSuccess: (d) => {
      setCurrentNameType(d?.data[0]?.administrative_type);
    },
  });

  const zPrev = useRef(null);

  const getPrice = useCallback(
    (z, fn, province, district, recordType) => {
      if (z <= 10.5 && (!zPrev.current || zPrev.current > 10.5) && province) {
        zPrev.current = z;
        fn(province, 'city', recordType || 'apartment');
      }
      if (z > 10.5 && (!zPrev.current || zPrev.current <= 10.5) && district) {
        zPrev.current = z;
        fn(district, 'district', recordType || 'apartment');
      }
    },
    [currentProvince, currentDis, zoom, run, filters?.where?.recordType ],
  );

  useEffect(() => {
    getPrice(zoom, run, currentProvince, currentDis, filters?.where?.recordType);
  }, [zoom, currentProvince, currentDis, run, filters?.where?.recordType]);

  const columns = [
    {
      title: currentNameType === 'district' ? 'Quận' : 'Huyện',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá thấp nhất (triệu/m2)',
      dataIndex: 'min',
      render: (min) => (min && parseFloat(min).toFixed(2)) || 'Chưa có thông tin',
    },
    {
      title: 'Giá cao nhất (triệu/m2)',
      dataIndex: 'max',
      render: (max) => (max && parseFloat(max).toFixed(2)) || 'Chưa có thông tin',
    },
  ];

  return (
    <>
      <div className={styles.customAgileTable}>
        <div className="mb-5" style={{ marginTop: '50px' }}>
          <h2 className={styles.customH2}>
            Giá bất động sản ở {data?.data?.length > 1 ? data?.data[0]?.parent_name : 'Hà nội'}
          </h2>{' '}
        </div>{' '}
        <Table dataSource={data?.data} columns={columns} bordered loading={loading} />
      </div>
    </>
  );
};

export default AgileTable;
