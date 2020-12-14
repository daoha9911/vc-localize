import React, { useEffect } from 'react';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { connect } from 'dva';
import styles from '../index.less';

const FormSuccessPassword = ({ dispatch }) => {
  useEffect(() => {
    const disappear = setTimeout(() => {
      dispatch({
        type: 'formregister/closeForm',
      });
    }, 2000);
    return () => {
      clearTimeout(disappear);
    };
  }, []);
  return (
    <>
      <div className={styles.flexCol}>
        <CheckCircleTwoTone
          twoToneColor="#52c41a"
          style={{
            fontSize: '45px',
          }}
        />
        <p
          style={{
            textAlign: 'center',
            width: '340px',
            marginTop: '20px',
            fontWeight: 'bold',
            fontSize: '18px',
            lineHeight: '24px',
          }}
        >
          Chúc mừng bạn đã đổi mật khẩu thành công. Hãy tiếp tục đăng nhập.
        </p>
      </div>
    </>
  );
};

export default connect()(FormSuccessPassword);
