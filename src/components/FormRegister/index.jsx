import React from 'react';
import { Modal } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { closeForm } from '@/models/formRegister';
import RegisterContent from './RegisterContent';
import styles from './index.less';

const FormRegister = () => {
  const formregister = useSelector((state) => state.formregister);
  const dispatch = useDispatch();
  const onCancel = () => {
    dispatch(closeForm());
  };

  return (
    <>
      <Modal
        visible={formregister.isOpen}
        onCancel={onCancel}
        footer={null}
        width="auto"
        className={`dinhgia-bds_register ${styles.customModal}`}
        centered
      >
        <RegisterContent visible={formregister.isOpen} scenario={formregister.scenario} />
      </Modal>
    </>
  );
};

export default FormRegister;
