import React, { useCallback } from 'react';
import styles from './index.less';

const NumberInput = ({ min, max, value, onChange }) => {
  const handleIncrease = useCallback(() => {
    onChange(value < max ? value + 1 : max);
  }, [value, onChange]);

  const handleDecrease = useCallback(() => {
    onChange(value > min ? value - 1 : min);
  }, [value, onChange]);
  return (
    <>
      <div className={styles.NumberInput_Wrapper}>
        <div className={styles.NumberInput_Minus} onClick={handleDecrease}>
          <svg
            width="11"
            height="2"
            viewBox="0 0 11 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="10.5" height="1.5" rx="0.75" fill="#727C7D" />
          </svg>
        </div>
        <input type="text" className={styles.NumberInput_Input} value={value} disabled />
        <div className={styles.NumberInput_Plus} onClick={handleIncrease}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5938 5.34375H6.65625V1.40625C6.65625 1.0125 6.39375 0.75 6 0.75C5.60625 0.75 5.34375 1.0125 5.34375 1.40625V5.34375H1.40625C1.0125 5.34375 0.75 5.60625 0.75 6C0.75 6.39375 1.0125 6.65625 1.40625 6.65625H5.34375V10.5938C5.34375 10.9875 5.60625 11.25 6 11.25C6.39375 11.25 6.65625 10.9875 6.65625 10.5938V6.65625H10.5938C10.9875 6.65625 11.25 6.39375 11.25 6C11.25 5.60625 10.9875 5.34375 10.5938 5.34375Z"
              fill="#727C7D"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default NumberInput;
