import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Row, Col, Select } from 'antd';
import { useQueryLocation } from '@/hooks/useQueryLocation';
import cls from 'classnames';
import { getGeocoding } from '@/services/search';
import useSearchLocation from '@/hooks/useSearchLocation';
import useHandleDataLoading from '@/pageModules/Map/components/Map/hooks/useHandleDataLoading';

import styles from './index.less';

const LocationSearchInput = ({ initialValue, locatePoint }) => {
  const { filters, setFilter } = useQueryLocation();

  const { onLoading, onLoadDone} = useHandleDataLoading();

  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const locatePointRef = useRef(locatePoint);

  useEffect(() => {
    locatePointRef.current = locatePoint;
  }, [locatePoint]);

  const onInputSelect = async (value) => {
    onLoading();
    const result = await getGeocoding(value);
    setCoordinates({ lat: result?.data?.lat, lng: result?.data?.long });
    if (
      parseFloat(filters?.where?.lng) !== result?.data?.long ||
      parseFloat(filters?.where?.lat) !== result?.data?.lat
    ) {
      setFilter({
        lat: result.data.lat,
        lng: result.data.long,
        locationName: result?.data?.address,
      });
    } else if (locatePointRef.current) {
      locatePointRef.current({ lat: result?.data?.lat, lng: result?.data?.long }, 'subDis');
    }
  };

  const { suggestions, handleInputChange, handleInputSelect, inputValue } = useSearchLocation(
    onInputSelect,
    initialValue,
  );
  return (
    <>
      <div
        className={`dinhgia-dbs-submenu_searchLocation relative ${styles.customDisplay}`}
        style={{ width: '100%' }}
      >
        <Select
          showSearch
          value={inputValue}
          onSearch={handleInputChange}
          onChange={handleInputSelect}
          filterOption={() => true}
          allowClear
          style={{
            outline: 'none',
            padding: 0,
            width: '100%'
          }}
          className={styles.searchLocation}
          placeholder="Khu vực, địa chỉ, v.v...."
          options={suggestions.map((s) => ({ value: s, label: s }))}
        />
      </div>
    </>
  );
};

export default LocationSearchInput;
