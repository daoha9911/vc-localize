/* eslint-disable */
import React, { useCallback } from 'react';
import { Form, Button, Input } from 'antd';
import styles from '../../index.less';
import { connect } from 'dva';

const FormNewPassword = ({ dispatch, handleChangeScenario }) => {
  const [form] = Form.useForm();
  const finishForm = (values) => {
    dispatch({
      type: 'login/newPassword',
      payload: {
        data: values,
        onSuccess: () => {
          handleChangeScenario('successPassword');
        },
      },
    });
  };
  const onFinishFailed = useCallback(({ values, errorFields }) => {
    console.log('login form not good ', errorFields, values);
  });
  return (
    <>
      <div>
        <h2 className={styles.customH2}>Thay đổi mật khẩu</h2>
        <Form name="basic" onFinish={finishForm} onFinishFailed={onFinishFailed} form={form}>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Xin mời nhập mật khẩu' }]}
            style={{ marginBottom: '22px' }}
          >
            <Input.Password className={styles.customInput} placeholder="Mật khẩu mới" />
          </Form.Item>
          <Form.Item
            name="newPassword"
            rules={[
              {
                required: true,
                message: 'Xin mời nhập mật khẩu',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Mật khẩu không trùng khớp');
                },
              }),
            ]}
            style={{ marginBottom: '22px' }}
          >
            <Input.Password className={styles.customInput} placeholder="Nhập mật khẩu mới" />
          </Form.Item>

          <Form.Item>
            <Button className={styles.customButton} type="primary" htmlType="submit">
              Đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default connect()(FormNewPassword);
