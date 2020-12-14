import React, { useState } from 'react';
import { Radio, Button } from 'antd';
import { useQueryLocation } from '@/hooks/useQueryLocation';
import { DIRECTION_PICKER } from './constants';
import styles from './index.less';

const DirectionPicker = ({ onClosePopup }) => {
  const { filters, setFilter } = useQueryLocation();

  const [directionPicker, setDirectionPicker] = useState(
    filters?.where?.direction ? filters?.where?.direction : null,
  );

  const onSizeChange = (e) => {
    const value = e.target.value || null;
    setDirectionPicker(value);
  };

  const onApplyClick = () => {
    setFilter({
      direction: directionPicker,
    });
    onClosePopup(false);
  };

  const onClearClick = () => {
    setFilter({
      direction: null,
    });
    onClosePopup(false);
  };
  return (
    <>
      <div className={styles.customChildrenPopup}>
        <div className={styles.directionPickerPopup}>
          <h2 className={styles.customPopupLabelTag}>Hướng nhà</h2>
          <div className={styles.customRadio}>
            <Radio.Group onChange={onSizeChange} value={directionPicker} className="flex flex-col">
              {DIRECTION_PICKER.map((d) => (
                <Radio key={d.value} value={d.value}>
                  {d.name}
                </Radio>
              ))}
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

export default DirectionPicker;
