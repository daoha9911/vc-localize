/* eslint-disable */
import React, { useState } from 'react';
import { Radio, Button } from 'antd';
import { DIRECTION_PICKER } from '../constants';
import styles from './index.less';

const DirectionPicker = ({ initialValue, callback }) => {
  const onSizeChange = (e) => {
    const value = e.target.value || null;
    callback(value);
  };

  return (
    <>
      <div className={styles.customChildrenPopup}>
        <div className={styles.directionPickerPopup}>
          <div className={styles.customRadio}>
            <Radio.Group onChange={onSizeChange} value={initialValue} className="flex flex-col">
              {DIRECTION_PICKER.map((d) => (
                <Radio key={d.value} value={d.value}>
                  {d.name}
                </Radio>
              ))}
            </Radio.Group>
          </div>
        </div>
      </div>
    </>
  );
};

export default DirectionPicker;
