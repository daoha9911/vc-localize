/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable */
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Slider, Input, Button } from 'antd';
import { convertRangeToCurrency, formattedNumber } from '@/utils/utils';
import { useQueryLocation } from '@/hooks/useQueryLocation';

import cls from 'classnames';
import styles from './index.less';

const PriceRangePicker = ({ initialMin, initialMax, setMinPrice, setMaxPrice }) => {
  const [minCurrency, setMinCurrency] = useState('Triệu');
  const [maxCurrency, setMaxCurrency] = useState('Tỷ');

  const [minRangeFocusMode, setMinRangeFocusMode] = useState(true);
  const [maxRangeFocusMode, setMaxRangeFocusMode] = useState(true);

  useEffect(() => {
    if (initialMin?.length > 3 && minRangeFocusMode) {
      setMinCurrency('Tỷ');
    } else {
      setMinCurrency('Triệu');
    }
  }, [initialMin, minRangeFocusMode]);

  useEffect(() => {
    if (initialMax?.length > 3 && maxRangeFocusMode) {
      setMaxCurrency('Tỷ');
    } else {
      setMaxCurrency('Triệu');
    }
  }, [initialMax, maxRangeFocusMode]);

  const onSliderChange = useCallback((value) => {
    if (value && Array.isArray(value)) {
      setMinPrice(value[0]?.toString().replace(/\./g, ''));
      setMaxPrice(value[1]?.toString().replace(/\./g, ''));
    }
  }, []);

  const onMinRangeChange = useCallback((e) => {
    const { value } = e.target;
    setMinPrice(value.replace(/\./g, ''));
  }, []);

  const onMaxRangeChange = useCallback((e) => {
    const { value } = e.target;
    setMaxPrice(value.replace(/\./g, ''));
  }, []);

  const handleMinInputFocus = (price) => {
    setMinRangeFocusMode(false);
    setMinCurrency('Triệu');
  };

  const handleMinInputBlur = (price) => {
    setMinRangeFocusMode(true);
    if (initialMin?.length > 3) {
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
    if (initialMax?.length > 3) {
      setMaxCurrency('Tỷ');
    } else {
      setMaxCurrency('Triệu');
    }
  };

  return (
    <>
      <div className={styles.customChildrenPopup}>
        <div className={styles.rangePickerPopup}>
          <h2 className={`${styles.customPopupLabelTag} mb-5`}>Khoảng giá</h2>
          <Slider
            onChange={onSliderChange}
            max={10 ** 5}
            range
            defaultValue={[initialMin, initialMax]}
            value={[initialMin, initialMax]}
            step={10 ** 2}
          />
          <div className={styles.customInputControl}>
            <div className={cls('flex flex-col items-center')}>
              <span className={styles.customRangeSpan}>Thấp nhất</span>
              <Input
                onChange={onMinRangeChange}
                className={styles.customRangeInput}
                value={minRangeFocusMode ? formattedNumber(initialMin) : initialMin}
                onFocus={() => {
                  handleMinInputFocus(initialMin);
                }}
                onBlur={() => {
                  handleMinInputBlur(initialMin);
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
                value={maxRangeFocusMode ? formattedNumber(initialMax) : initialMax}
                onFocus={() => {
                  handleMaxInputFocus(initialMax);
                }}
                onBlur={() => {
                  handleMaxInputBlur(initialMax);
                }}
                suffix={<span>{maxCurrency}</span>}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PriceRangePicker;
