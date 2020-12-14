/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import { Radio, Button } from 'antd';
import { useQueryLocation } from '@/hooks/useQueryLocation';
import { SIZE_RANGE } from './constants';

import styles from './index.less';

const SizePicker = ({ onClosePopup }) => {
  const { filters, setFilter } = useQueryLocation();

  const [sizeRangeValue, setSizeRangeValue] = useState(null);
  const [minSize, setMinSize] = useState(filters?.where?.minSize ? filters?.where?.minSize : 0);
  const [maxSize, setMaxSize] = useState(filters?.where?.maxSize ? filters?.where?.maxSize : 100);

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

  const onApplyClick = () => {
    setFilter({
      minSize,
      maxSize,
    });
    onClosePopup(false);
  };

  const onClearClick = () => {
    setFilter({
      minSize: null,
      maxSize: null,
    });
    onClosePopup(false);
  };
  return (
    <>
      <div className={styles.customChildrenPopup}>
        <div className={styles.sizePickerPopup}>
          <h2 className={styles.customPopupLabelTag}>Diện tích</h2>
          <div className={styles.customRadio}>
            <Radio.Group onChange={onSizeChange} value={sizeRangeValue} className="flex flex-col">
              <Radio value={1}>Dưới 50m2</Radio>
              <Radio value={2}>50-100 m2</Radio>
              <Radio value={3}>100-150 m2</Radio>
              <Radio value={4}>Trên 300 m2</Radio>
            </Radio.Group>
          </div>
        </div>
        <div className={styles.popUpButtonAction}>
          <span onClick={onClearClick} className={styles.popUpButtonActionSpan}>
            Xoá
          </span>
          <Button onClick={onApplyClick} className={styles.popUpButtonActionButton}>
            Áp dụng
          </Button>
        </div>
      </div>
    </>
  );
};

export default SizePicker;
