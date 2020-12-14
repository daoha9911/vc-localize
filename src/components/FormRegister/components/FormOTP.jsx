/* eslint-disable */
import React, { useState, useCallback, useRef } from 'react';
import { connect } from 'dva';
import { Form, Button, Input, notification } from 'antd';
import cls from 'classnames';
import _ from 'lodash';

import ReactCodeInput from 'react-code-input';

import styles from '../index.less';
import { useMount } from '@umijs/hooks';

const FormOTP = ({ dispatch, handleChangeScenario, loginStatus, user }) => {
  const [activeDigit, setActiveDigit] = useState([]);
  const [active, setActive] = useState(true);

  // handle post form to api
  const finishForm = (values) => {
    dispatch({
      type: 'login/active',
      payload: {
        code: values,
        userId: user.id,
        onSuccess: () => {
          !loginStatus
            ? handleChangeScenario('successRegister')
            : handleChangeScenario('newPassword');
        },
      },
    });
  };
  
  const resendOtp = () => {
    dispatch({
      type: 'login/resendOtp',
    });
    setActive(false);
    let x = 10;
    setInterval(() => {
      x--;
      if (x < 0) {
        clearInterval();
        setActive(true);
      }
    }, 1000);
  };
  return (
    <>
      <div>
        <h2 className={styles.customH2}>Nhập mã xác thực</h2>
        <p
          style={{
            textAlign: 'center',
            width: '340px',
            marginBottom: '50px',
          }}
        >
          Mã xác thực tài khoản đã được gửi tới Email của bạn. Mã OTP sẽ hết hiệu lực trong 3 phút.
        </p>
        <Form name="basic" onFinish={finishForm}>
          <div className="flex justify-between flex-col">
            <Form.Item name="code" className={styles.customOtpFormItemInput}>
              <ReactCodeInput className={styles.customCodeInput} autoFocus type="text" fields={6} />
            </Form.Item>
            <Form.Item>
              <Button className={styles.customButton} type="primary" htmlType="submit">
                Xác thực
              </Button>
            </Form.Item>
          </div>
        </Form>
        <div className={styles.flexRowBetween}>
          <span className={styles.registerActionsSpan}>Bạn chưa nhận mã OTP? </span>
          <span
            style={{
              cursor: active ? 'pointer' : 'not-allowed',
            }}
            className={styles.registerSpan}
            onClick={() => {
              resendOtp();
            }}
          >
            Gửi lại
          </span>
        </div>
      </div>
    </>
  );
};
export default connect(({ user, login }) => ({
  user: user.currentUser,
  loginStatus: login.loggedIn,
}))(FormOTP);
