/*eslint-disable */
import React from 'react';
import { Card, Form, Input, Button } from 'antd';
import { connect } from 'dva';
import styles from '../index.less';
const EditInfo = ({ dispatch, user }) => {
  const [form] = Form.useForm();

  const updateInfo = () => {
    form
      .validateFields()
      .then((values) => {
        dispatch({
          type: 'user/updateCurrent',
          payload: {
            data: values,
          },
        });
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };
  const handleOpenForm = () => {
    dispatch({
      type: 'formregister/openForm',
      payload: {
        data: 'newPassword',
      },
    });
  };

  return (
    <>
      <Card className={styles.customCard}>
        <h4 className={[styles.customH4]}>Chỉnh sửa tài khoản</h4>
        <Form form={form} name="edit" layout="vertical">
          <Form.Item label="HỌ VÀ TÊN" name="lastName" initialValue={`${user.lastName}`}>
            <Input />
          </Form.Item>

          <Form.Item label="SỐ ĐIỆN THOẠI" name="phoneNumber" initialValue={`${user.phoneNumber}`}>
            <Input />
          </Form.Item>

          <Form.Item label="EMAIL" name="email" initialValue={`${user.email}`}>
            <Input disabled />
          </Form.Item>

          <Form.Item label="ĐỊA CHỈ" name="address" initialValue={`${user.address}`}>
            <Input />
          </Form.Item>
        </Form>
        <div>
          <span
            className={styles.customSpan}
            onClick={() => {
              handleOpenForm();
            }}
          >
            Thay đổi mật khẩu
          </span>
        </div>
        <div className={'flex justify-center mt-4 mb-10'} style={{ height: '40px' }}>
          <Button
            htmlType="submit"
            onClick={() => {
              updateInfo();
            }}
            className={['rounded', styles.customBtn]}
          >
            CẬP NHẬT
          </Button>
        </div>
      </Card>
    </>
  );
};
export default connect(({ user }) => ({
  user: user.currentUser,
}))(EditInfo);
