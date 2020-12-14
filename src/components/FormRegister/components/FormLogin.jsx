import React, { useCallback } from 'react';
import { Form, Button, Input } from 'antd';
import { connect } from 'dva';
import { manifestValidationErr } from '@/helpers/dvaForm';
import styles from '../index.less';
import RegisterActions from './RegisterActions';
// import OtherLogin from './OtherLogin';

const FormLogin = ({ dispatch, handleChangeScenario }) => {
  const [form] = Form.useForm();
  const loginBasic = (values) => {
    dispatch({
      type: 'login/login',
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
        <h2 className={styles.customH2}>Chào mừng bạn đến với chúng tôi!</h2>
        <Form name="basic" onFinish={loginBasic} onFinishFailed={onFinishFailed} form={form}>
          <Form.Item
            name="username"
            style={{ marginBottom: '14px' }}
            rules={[
              { required: true, message: 'Xin mời nhập SĐT' },
              {
                pattern: /^[^`~!#$%^&*()_+={}\]|\\:;“’<,>.?๐฿]*$/gm,
                message: 'SĐT không hợp lệ',
              },
            ]}
          >
            <Input className={styles.customInput} placeholder="Số điện thoại" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Xin mời nhập mật khẩu' },
              {
                pattern: /^.{6,32}$/gm,
                message: 'Mật khẩu từ 6-32 kí tự',
              },
            ]}
            style={{ marginBottom: '22px' }}
          >
            <Input.Password className={styles.customInput} placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item>
            <Button className={styles.customButton} type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <div className={styles.customRegisterActions}>
          <RegisterActions handleChangeScenario={handleChangeScenario} />
        </div>
        {/* <div className={styles.otherLogin}><OtherLogin /></div> */}
      </div>
    </>
  );
};
export default connect()(FormLogin);
