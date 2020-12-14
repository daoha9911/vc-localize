import React from 'react';
import styles from '../../index.less';

const CloseMapButton = ({ closeMobileMap }) => {
  return (
    <>
      <div className={styles.closeMapButton_Svg} onClick={closeMobileMap}>
        <svg width={16} height={16} viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M31.7832972,107.601479 L37.6923882,107.601479 L37.6923882,108.783297 L31.7832972,108.783297 L31.7832972,114.692388 L30.6014791,114.692388 L30.6014791,108.783297 L24.6923882,108.783297 L24.6923882,107.601479 L30.6014791,107.601479 L30.6014791,101.692388 L31.7832972,101.692388 L31.7832972,107.601479 Z"
            transform="rotate(45 142.524 25.308)"
            fill="#FFFFFF"
            fillRule="evenodd"
          />
        </svg>
      </div>
    </>
  );
};

export default CloseMapButton;
