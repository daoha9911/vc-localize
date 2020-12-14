/* eslint-disable */
import React, { useState, useCallback } from 'react';
import { connect } from 'dva';
import { Form, Button, Input, Checkbox } from 'antd';
import { manifestValidationErr } from '@/helpers/dvaForm';
import { regxName, normalizeString } from '@/utils/utils';
import _ from 'lodash';
import styles from '../index.less';

const FormRegister = ({ dispatch, handleChangeScenario }) => {
  const [form] = Form.useForm();
  const [checked, setChecked] = useState(false);
  const onChange = (e) => {
    setChecked(e.target.checked);
  };
  const createAccount = (values) => {
    if (checked === true) {
      const data = _.assign(
        {
          firstName: values.lastName,
          phoneNumber: values.username,
          passport: '037097001212',
          idCardOrTaxCode: '4300205943',
          ggReCaptCha: 'ggReCaptCha',
        },
        _.omit(values, ['confirm']),
      );
      dispatch({
        type: 'login/register',
        payload: {
          data,
          onSuccess: () => handleChangeScenario('otp'),
          onValidation: (validations) => {
            manifestValidationErr(form)(validations);
          },
        },
      });
    } else {
      setChecked(true);
    }
  };
  const onFinishFailed = useCallback(({ values, errorFields }) => {
    console.log('register form not good ', errorFields, values);
  }, []);
  return (
    <>
      <div>
        <h2 className={styles.customH2}>Đăng ký tham gia cùng chúng tôi!</h2>
        <Form name="basic" onFinish={createAccount} form={form} onFinishFailed={onFinishFailed}>
          <Form.Item
            name="lastName"
            style={{ marginBottom: '14px' }}
            rules={[
              { required: true, message: 'Mời nhập họ tên' },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || normalizeString(value).match(regxName)) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Họ tên không phù hợp');
                },
              }),
            ]}
          >
            <Input className={styles.customInput} placeholder="Họ tên" />
          </Form.Item>

          <Form.Item
            name="username"
            style={{ marginBottom: '14px' }}
            rules={[
              { required: true, message: 'Mời nhập số điện thoại' },
              {
                pattern: /(09|03|01[2|6|8|9])+([0-9]{8})\b/,
                message: 'Số điện thoại không phù hợp',
              },
            ]}
          >
            <Input className={styles.customInput} placeholder="Số điện thoại" />
          </Form.Item>

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

          <Form.Item
            name="address"
            style={{ marginBottom: '14px' }}
            rules={[
              { required: true, message: 'Mời nhập địa chỉ' },
              {
                pattern: /^[^`~!#$%^@&*()_+={}\]|\\:;“’<,>.?๐฿]*$/gm,
                message: 'Địa chỉ không phù hợp',
              },
            ]}
          >
            <Input className={styles.customInput} placeholder="Địa chỉ" />
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
            <Input.Password className={styles.customInput} placeholder="Mật khẩu " />
          </Form.Item>

          <Form.Item
            name="confirm"
            valuePropName="checked"
            style={{ marginBottom: '22px' }}
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject('Bạn chưa đồng ý với điều khoản sử dụng'),
              },
            ]}
          >
            <Checkbox onChange={onChange}>Tôi đồng ý với điều khoản sử dụng</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button className={styles.customButton} type="primary" htmlType="submit">
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
        <div className={styles.flexRowBetween}>
          <span className={styles.registerActionsSpan}>Bạn đã có tài khoản? </span>
          <span
            onClick={() => {
              handleChangeScenario('login');
            }}
            className={styles.registerSpan}
          >
            Đăng nhập ngay
          </span>
        </div>
      </div>
    </>
  );
};

export default connect()(FormRegister);
