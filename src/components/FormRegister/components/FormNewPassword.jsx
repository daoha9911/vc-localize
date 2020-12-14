/* eslint-disable */
import React, { useCallback } from 'react';
import { Form, Button, Input } from 'antd';
import styles from '../index.less';
import { connect } from 'dva';
import { manifestValidationErr } from '@/helpers/dvaForm';

const FormNewPassword = ({ dispatch }) => {
  const [form] = Form.useForm();
  const finishForm = (values) => {
    dispatch({
      type: 'user/updatePassword',
      payload: {
        data: values,
        onValidation: (validations) => {
          manifestValidationErr(form)(validations);
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
            name="currentPassword"
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
              {
                pattern: /^.{6,32}$/gm,
                message: 'Mật khẩu từ 6-32 kí tự',
              },
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
