/* eslint-disable */
import React, { useState, useCallback } from 'react';
import { Button, Collapse } from 'antd';
import cls from 'classnames';

import { useQueryLocation } from '@/hooks/useQueryLocation';

import MobPriceRangePicker from './MobPriceRangePicker';
import MobNumBedPicker from './MobNumBedPicker';
import MobSizePicker from './MobSizePicker';
import MobDirectionPicker from './MobDirectionPicker';
import MobContactTypePicker from './MobContactTypePicker';

import styles from './index.less';

const MobileFilterContent = ({ onClose }) => {
  const { Panel } = Collapse;
  const { filters, setFilter } = useQueryLocation();

  const [minPrice, setMinPrice] = useState(
    filters?.where?.minPrice ? filters?.where?.minPrice : `${10 ** 2}`,
  );

  const [maxPrice, setMaxPrice] = useState(
    filters?.where?.maxPrice ? filters?.where?.maxPrice : `${10 ** 5}`,
  );

  const [numBedroom, setNumBedroom] = useState(
    filters?.where?.numBedroom ? filters?.where?.numBedroom : 1,
  );

  const [minSize, setMinSize] = useState(filters?.where?.minSize ? filters?.where?.minSize : 0);
  const [maxSize, setMaxSize] = useState(filters?.where?.maxSize ? filters?.where?.maxSize : 100);

  const [direction, setDirection] = useState(
    filters?.where?.direction ? filters?.where?.direction : null,
  );

  const [contactType, setContactType] = useState(
    filters?.where?.contactType ? filters?.where?.contactType : null,
  );

  const handleSubmit = useCallback(() => {
    setFilter({
      minPrice,
      maxPrice,
      numBedroom,
      minSize,
      maxSize,
      direction,
      contactType,
    });
    if (onClose) {
      onClose();
    }
  }, []);

  return (
    <>
      <div className={styles.Muna_MobileFilter_Wrapper}>
        <div className={styles.Muna_MobileFilter_Quote}>
          <h2>Bộ lọc tìm kiếm</h2>
        </div>
        <div className={styles.Muna_MobileFilter_Buttons}>
          <div className={styles.Muna_MobileFilter_Button_Wrapper}>
            <Button className={cls(styles.customButton, 'mr-4', { [styles.buttonActive]: true })}>
              <span>Mua nhà</span>
            </Button>
            <Button className={styles.customButton}>
              <span>Thuê nhà</span>
            </Button>
          </div>
        </div>
        <div className={styles.Muna_MobileFilter_PriceRangePicker}>
          <div className={styles.Muna_MobileFilter_PriceRangePicker_Wrapper}>
            <MobPriceRangePicker
              initialMin={minPrice}
              initialMax={maxPrice}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
            />
          </div>
        </div>
        <div className={styles.Muna_MobileFilter_NumBedPicker}>
          <div className={styles.Muna_MobileFilter_NumBedPicker_Wrapper}>
            <MobNumBedPicker callback={setNumBedroom} initialValue={numBedroom} />
          </div>
        </div>
        <Collapse className={styles.customCollapse}>
          <Panel header={<span className={styles.customCollapseHeader}>Diện tích</span>} key="1">
            <div className={styles.Muna_MobileFilter_SizePicker}>
              <div className={styles.Muna_MobileFilter_SizePicker_Wrapper}>
                <MobSizePicker
                  minSize={minSize}
                  maxSize={maxSize}
                  setMinSize={setMinSize}
                  setMaxSize={setMaxSize}
                />
              </div>
            </div>
          </Panel>
          <Panel header={<span className={styles.customCollapseHeader}>Hướng nhà</span>} key="2">
            <div className={styles.Muna_MobileFilter_DirectionPicker}>
              <div className={styles.Muna_MobileFilter_DirectionPicker_Wrapper}>
                <MobDirectionPicker initialValue={direction} callback={setDirection} />
              </div>
            </div>
          </Panel>
          <Panel header={<span className={styles.customCollapseHeader}>Loại liên hệ</span>} key="3">
            <div className={styles.Muna_MobileFilter_ContactTypePicker}>
              <div className={styles.Muna_MobileFilter_ContacTypePicker_Wrapper}>
                <MobContactTypePicker initialValue={contactType} callback={setContactType} />
              </div>
            </div>
          </Panel>
        </Collapse>
        <div className={styles.Muna_MobileFilter_ButtonSubmit}>
          <div className={styles.Muna_MobileFilter_ButtonSubmit_Wrapper} onClick={handleSubmit}>
            <Button className={styles.customButtonSubmit}>Tìm kiếm</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileFilterContent;
