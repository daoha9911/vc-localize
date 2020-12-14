import React from 'react';
import styles from '../index.less';

const RegisterActions = ({ handleChangeScenario }) => {
  return (
    <>
      <div className={styles.flexRowBetween}>
        <div>
          <span className={styles.forgetPasswordSpan}>
            <span
              onClick={() => {
                handleChangeScenario('forgotPassword');
              }}
              className={styles.registerSpan}
            >
              Quên mật khẩu
            </span>
          </span>
        </div>
        <div>
          <span className={styles.registerActionsSpan}>
            Bạn chưa có tài khoản?{' '}
            <span
              onClick={() => {
                handleChangeScenario('register');
              }}
              className={styles.registerSpan}
            >
              Đăng ký
            </span>
          </span>
        </div>
      </div>
    </>
  );
};

export default RegisterActions;
