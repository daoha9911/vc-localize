import React from 'react';
import { Button } from 'antd'

import styles from './index.less';

const Register = () => {
  return (
    <section className={`${styles.container} w1200`}>
      <div className={styles.wrap}>
        <div className={styles.group}>
          <h2 className={styles.title}>
            Đăng ký để nhận tin <br /> mới nhất
          </h2>
          <div className="relative max-w-full">
            <input className={styles.input} placeholder="Email của bạn" />
            <Button className={styles.button}>Đăng ký</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
