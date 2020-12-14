import React, { useState } from 'react';
import { Button } from 'antd';
import OutSideClick from '@/components/OutSideClick';
import styles from './index.less';

const ButtonPopUp = ({ label, icon, children }) => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <OutSideClick
      onOutsideClick={() => {
        setVisible(false);
      }}
    >
      <div className={styles.customParentPopUp}>
        <Button onClick={handleClick} className={styles.customButtonPopUp}>
          <div className={styles.customDisplay}>
            <div className={styles.customIcon}>{icon || null}</div>
            <span className={styles.customButtonPopUpSpan}>{label || ''}</span>
          </div>
        </Button>
        {visible && children && React.cloneElement(children, { onClosePopup: handleClick })}
      </div>
    </OutSideClick>
  );
};

export default ButtonPopUp;
