/* eslint-disable eqeqeq */
/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Radio, Button } from 'antd';
import { useQueryLocation } from '@/hooks/useQueryLocation';
import { SIZE_RANGE } from '../constants';

import styles from './index.less';

const SizePicker = ({ minSize, maxSize, setMinSize, setMaxSize }) => {
  const { filters } = useQueryLocation();

  const [sizeRangeValue, setSizeRangeValue] = useState(null);

  useEffect(() => {
    if (filters?.where?.minSize) {
      const SizeRangeValue = SIZE_RANGE.find((s) => s.minSize == filters?.where?.minSize);
      setSizeRangeValue(SizeRangeValue?.value);
    }
  }, [filters]);

  const onSizeChange = (e) => {
    const value = e.target.value || null;
    const SizeRangeValue = SIZE_RANGE.find((s) => s.value === value);
    setSizeRangeValue(value);
    setMinSize(SizeRangeValue?.minSize);
    setMaxSize(SizeRangeValue?.maxSize);
  };

  return (
    <>
      <div className={styles.customChildrenPopup}>
        <div className={styles.sizePickerPopup}>
          <div className={styles.customRadio}>
            <Radio.Group onChange={onSizeChange} value={sizeRangeValue} className="flex flex-col">
              <Radio value={1}>Dưới 50m2</Radio>
              <Radio value={2}>50-100 m2</Radio>
              <Radio value={3}>100-150 m2</Radio>
              <Radio value={4}>Trên 300 m2</Radio>
            </Radio.Group>
          </div>
        </div>
      </div>
    </>
  );
};

export default SizePicker;
