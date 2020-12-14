/* eslint-disable */
import React from 'react';
import { Form, Button, Input } from 'antd';
import { connect } from 'dva';
import styles from '../../index.less';
import { manifestValidationErr } from '@/helpers/dvaForm';

const FormForgotPassword = ({ dispatch, handleChangeScenario }) => {
  const [form] = Form.useForm();
  const finishForm = (values) => {
    console.log(values);
    dispatch({
      type: 'login/forgotPassword',
      payload: {
        data: values,
        onValidation: (validations) => {
          manifestValidationErr(form)(validations);
        },
        onSuccess: () => {
          handleChangeScenario('forgotPasswordOTP');
        },
      },
    });
  };

  return (
    <>
      <div>
        <h2 className={styles.customH2}>Quên mật khẩu</h2>
        <Form name="basic" onFinish={finishForm} form={form}>
          <Form.Item
            name="email"
            style={{ marginBottom: '14px' }}
            rules={[
              { required: true, message: 'Mời nhập email' },
              {
                pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                message: 'Email không phù hợp',
              },
            ]}
          >
            <Input className={styles.customInput} placeholder="Email" />
          </Form.Item>

          <Form.Item>
            <Button className={styles.customButton} type="primary" htmlType="submit">
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default connect(({ user }) => ({
  user: user.currentUser,
}))(FormForgotPassword);
