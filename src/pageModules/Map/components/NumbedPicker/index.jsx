import React, { useState } from 'react';
import { Button } from 'antd';
import NumberInput from '@/components/NumberInput';
import { useQueryLocation } from '@/hooks/useQueryLocation';
import styles from './index.less';

const NumBedPicker = ({ onClosePopup }) => {
  const { filters, setFilter } = useQueryLocation();

  const [numBedPicker, setNumBedPicker] = useState(
    filters?.where?.numBedroom ? filters?.where?.numBedroom : 1,
  );

  const onNumChange = (value) => {
    setNumBedPicker(value);
  };

  const onApplyClick = () => {
    setFilter({
      numBedroom: numBedPicker,
    });
    onClosePopup(false);
  };

  const onClearClick = () => {
    setFilter({
      numBedroom: null,
    });
    onClosePopup(false);
  };
  return (
    <>
      <div className={styles.customChildrenPopup}>
        <div className={styles.numBedPickerPopup}>
          <div className="flex justify-between items-center ">
            <h2 className={styles.customPopupLabelTag}>Số phòng ngủ</h2>
            <div className={styles.customNumBedPicker}>
              <NumberInput onChange={onNumChange} value={numBedPicker} min={1} max={9} />
            </div>
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

export default NumBedPicker;
