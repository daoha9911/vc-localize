/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Slider, Input, Button } from 'antd';
import { convertRangeToCurrency, formattedNumber } from '@/utils/utils';
import { useQueryLocation } from '@/hooks/useQueryLocation';

import cls from 'classnames';
import styles from './index.less';

const PriceRangePicker = ({ onClosePopup }) => {
  const { filters, setFilter } = useQueryLocation();

  const [minCurrency, setMinCurrency] = useState('Triệu');
  const [maxCurrency, setMaxCurrency] = useState('Tỷ');

  const [minRangeFocusMode, setMinRangeFocusMode] = useState(true);
  const [maxRangeFocusMode, setMaxRangeFocusMode] = useState(true);

  const [minRange, setMinRange] = useState(
    filters?.where?.minPrice ? filters?.where?.minPrice : `${10 ** 2}`,
  );
  const [maxRange, setMaxRange] = useState(
    filters?.where?.maxPrice ? filters?.where?.maxPrice : `${10 ** 5}`,
  );

  useEffect(() => {
    if (minRange?.length > 3 && minRangeFocusMode) {
      setMinCurrency('Tỷ');
    } else {
      setMinCurrency('Triệu');
    }
  }, [minRange, minRangeFocusMode]);

  useEffect(() => {
    if (maxRange?.length > 3 && maxRangeFocusMode) {
      setMaxCurrency('Tỷ');
    } else {
      setMaxCurrency('Triệu');
    }
  }, [maxRange, maxRangeFocusMode]);

  const onSliderChange = useCallback((value) => {
    if (value && Array.isArray(value)) {
      setMinRange(value[0]?.toString().replace(/\./g, ''));
      setMaxRange(value[1]?.toString().replace(/\./g, ''));
    }
  }, []);

  const onMinRangeChange = useCallback((e) => {
    const { value } = e.target;
    setMinRange(value.replace(/\./g, ''));
  }, []);

  const onMaxRangeChange = useCallback((e) => {
    const { value } = e.target;
    setMaxRange(value.replace(/\./g, ''));
  }, []);

  const onApplyClick = () => {
    setFilter({
      minPrice: minRange,
      maxPrice: maxRange,
    });
    onClosePopup(false);
  };

  const onClearClick = () => {
    setFilter({
      minPrice: null,
      maxPrice: null,
    });
    onClosePopup(false);
  };

  const handleMinInputFocus = (price) => {
    setMinRangeFocusMode(false);
    setMinCurrency('Triệu');
  };

  const handleMinInputBlur = (price) => {
    setMinRangeFocusMode(true);
    if (minRange?.length > 3) {
      setMinCurrency('Tỷ');
    } else {
      setMinCurrency('Triệu');
    }
  };

  const handleMaxInputFocus = (price) => {
    setMaxRangeFocusMode(false);
    setMaxCurrency('Triệu');
  };

  const handleMaxInputBlur = (price) => {
    setMaxRangeFocusMode(true);
    if (maxRange?.length > 3) {
      setMaxCurrency('Tỷ');
    } else {
      setMaxCurrency('Triệu');
    }
  };

  return (
    <>
      <div className={styles.customChildrenPopup}>
        <div className={styles.rangePickerPopup}>
          <h2 className={styles.customPopupLabelTag}>Khoảng giá</h2>
          <Slider
            onChange={onSliderChange}
            max={10 ** 5}
            range
            defaultValue={[minRange, maxRange]}
            value={[minRange, maxRange]}
            step={10 ** 2}
          />
          <div className={styles.customInputControl}>
            <div className={cls('flex flex-col items-center')}>
              <span className={styles.customRangeSpan}>Thấp nhất</span>
              <Input
                onChange={onMinRangeChange}
                className={styles.customRangeInput}
                value={minRangeFocusMode ? formattedNumber(minRange) : minRange}
                onFocus={() => {
                  handleMinInputFocus(minRange);
                }}
                onBlur={() => {
                  handleMinInputBlur(minRange);
                }}
                suffix={<span>{minCurrency}</span>}
              />
            </div>
            <span className={styles.customRangeSpan} style={{ marginBottom: '7px' }}>
              đến
            </span>
            <div className={cls('flex flex-col items-center')}>
              <span className={styles.customRangeSpan}>Cao nhất</span>
              <Input
                onChange={onMaxRangeChange}
                className={styles.customRangeInput}
                value={maxRangeFocusMode ? formattedNumber(maxRange) : maxRange}
                onFocus={() => {
                  handleMaxInputFocus(maxRange);
                }}
                onBlur={() => {
                  handleMaxInputBlur(maxRange);
                }}
                suffix={<span>{maxCurrency}</span>}
              />
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

export default PriceRangePicker;
