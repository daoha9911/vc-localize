/* eslint-disable */
import React, { useState, useCallback, useRef } from 'react';
import { connect } from 'dva';
import { Form, Button, Input, notification } from 'antd';
import cls from 'classnames';
import _ from 'lodash';
import styles from '../../index.less';
import { useMount } from '@umijs/hooks';

const FormOTP = ({ dispatch, handleChangeScenario }) => {
  const [activeDigit, setActiveDigit] = useState([]);
  const Digit1 = useRef();
  const Digit2 = useRef();
  const Digit3 = useRef();
  const Digit4 = useRef();
  const Digit5 = useRef();
  const Digit6 = useRef();

  useMount(() => {
    Digit1?.current?.focus();
  });

  const agileClassName = useCallback(
    (name) =>
      cls(styles.customOtpInput, { [styles.customOtpInputActive]: activeDigit.includes(name) }),
    [activeDigit],
  );

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    const name = e?.target?.name;
    if (value && !activeDigit.includes(name)) {
      setActiveDigit([...activeDigit, name]);
    }
    if (!value) {
      const delActiveDigit = [...activeDigit];
      if (activeDigit.includes(name)) {
        _.remove(delActiveDigit, (item) => item === name);
      }
      setActiveDigit(delActiveDigit);
    }
  };

  const handleInputKeyUp = (e) => {
    const target = e?.target;
    if (e?.keyCode === 8 || e?.keyCode === 37) {
      const prev = target?.dataset?.previous;
      if (prev) {
        switch (prev) {
          case '1':
            Digit1?.current?.focus();
            break;
          case '2':
            Digit2?.current?.focus();
            break;
          case '3':
            Digit3?.current?.focus();
            break;
          case '4':
            Digit4?.current?.focus();
            break;
          case '5':
            Digit5?.current?.focus();
            break;
          default:
            break;
        }
      }
    } else if (
      (e.keyCode >= 48 && e.keyCode <= 57) ||
      (e.keyCode >= 65 && e.keyCode <= 90) ||
      (e.keyCode >= 96 && e.keyCode <= 105) ||
      e.keyCode === 39
    ) {
      const next = target?.dataset?.next;
      if (next) {
        switch (next) {
          case '2':
            Digit2?.current?.focus();
            break;
          case '3':
            Digit3?.current?.focus();
            break;
          case '4':
            Digit4?.current?.focus();
            break;
          case '5':
            Digit5?.current?.focus();
            break;
          case '6':
            Digit6?.current?.focus();
            break;
          default:
            break;
        }
      }
    }
  };

  // handle post form to api
  const finishForm = (values) => {
    let codeActive = '';
    _.forOwn(values, (value, key) => {
      codeActive += value;
    });
    dispatch({
      type: 'login/forgotPasswordVerify',
      payload: {
        data: {
          token: codeActive,
        },
        onSuccess: () => {
          handleChangeScenario('forgotPasswordNewPassword');
        },
      },
    });
  };
  const resendOtp = () => {
    dispatch({
      type: 'login/resendOtpForgotPassword',
    });
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
          <div className="flex justify-between">
            <Form.Item name="digit1" className={styles.customOtpFormItemInput}>
              <Input
                name="digit-1"
                onKeyUp={handleInputKeyUp}
                onChange={handleInputChange}
                maxLength={1}
                data-next="2"
                ref={Digit1}
                className={agileClassName('digit-1')}
              />
            </Form.Item>
            <Form.Item name="digit2" className={styles.customOtpFormItemInput}>
              <Input
                name="digit-2"
                data-next="3"
                onKeyUp={handleInputKeyUp}
                onChange={handleInputChange}
                maxLength={1}
                data-previous="1"
                ref={Digit2}
                className={agileClassName('digit-2')}
              />
            </Form.Item>
            <Form.Item name="digit3" className={styles.customOtpFormItemInput}>
              <Input
                name="digit-3"
                data-next="4"
                maxLength={1}
                onKeyUp={handleInputKeyUp}
                onChange={handleInputChange}
                data-previous="2"
                ref={Digit3}
                className={agileClassName('digit-3')}
              />
            </Form.Item>
            <Form.Item name="digit4" className={styles.customOtpFormItemInput}>
              <Input
                name="digit-4"
                data-next="5"
                maxLength={1}
                onKeyUp={handleInputKeyUp}
                onChange={handleInputChange}
                data-previous="3"
                ref={Digit4}
                className={agileClassName('digit-4')}
              />
            </Form.Item>
            <Form.Item name="digit5" className={styles.customOtpFormItemInput}>
              <Input
                name="digit-5"
                data-next="6"
                maxLength={1}
                data-previous="4"
                onKeyUp={handleInputKeyUp}
                onChange={handleInputChange}
                ref={Digit5}
                className={agileClassName('digit-5')}
              />
            </Form.Item>
            <Form.Item name="digit6" className={styles.customOtpFormItemInput}>
              <Input
                name="digit-6"
                maxLength={1}
                data-previous="5"
                onKeyUp={handleInputKeyUp}
                onChange={handleInputChange}
                ref={Digit6}
                className={agileClassName('digit-6')}
              />
            </Form.Item>
          </div>
          <Form.Item>
            <Button className={styles.customButton} type="primary" htmlType="submit">
              Xác thực
            </Button>
          </Form.Item>
        </Form>
        <div className={styles.flexRowBetween}>
          <span className={styles.registerActionsSpan}>Bạn chưa nhận mã OTP? </span>
          <span
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
export default connect()(FormOTP);
