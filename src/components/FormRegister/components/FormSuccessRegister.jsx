import React, { useEffect } from 'react';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { connect } from 'dva';
import styles from '../index.less';

const FormSuccessRegister = ({ dispatch }) => {
  useEffect(() => {
    const disappear = setTimeout(() => {
      dispatch({
        type: 'formregister/closeForm',
      });
      window.location.href = '/';
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
          Chúc mừng bạn đã đăng ký tài khoản thành công
        </p>
      </div>
    </>
  );
};

export default connect()(FormSuccessRegister);
