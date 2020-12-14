/* eslint-disable */
import React, { useState } from 'react';
import { Button } from 'antd';
import NumberInput from '@/components/NumberInput';
import styles from './index.less';

const NumBedPicker = ({ initialValue, callback }) => {
  const onNumChange = (value) => {
    callback(value);
  };

  return (
    <>
      <div className={styles.customChildrenPopup}>
        <div className={styles.numBedPickerPopup}>
          <div className="flex justify-between items-center ">
            <h2 className={styles.customPopupLabelTag}>Số phòng ngủ</h2>
            <div className={styles.customNumBedPicker}>
              <NumberInput onChange={onNumChange} value={initialValue} min={1} max={9} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NumBedPicker;
