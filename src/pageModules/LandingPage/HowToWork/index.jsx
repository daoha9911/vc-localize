import React from 'react';
import HTW_Icon1 from '@/static/web_images/HTW_Icon1.svg';
import HTW_Icon2 from '@/static/web_images/HTW_Icon2.svg';
import HTW_Icon3 from '@/static/web_images/HTW_Icon3.svg';
import HTW_Icon4 from '@/static/web_images/HTW_Icon4.svg';
import { Image } from 'antd';

import styles from './index.less';

const HowToWork = () => {
  return (
    <section className={`${styles.container} w1200`}>
      <h2 className={styles.title}>Làm sao để nó hoạt động</h2>
      <p className={styles.subtitle}>Mua bán nhanh, thanh toán đơn giản, dễ dàng sử dụng</p>
      <div className={styles.list}>
        <div className={styles.item}>
          <div className={styles.photo}>
            <Image alt="HTW_Icon1" src={HTW_Icon1} />
          </div>
          <div className={styles.text}>
            <h3 className={styles.name}>
              <a href="#" title="Mua nhà">
                Mô tả ngôi nhà lý tưởng của bạn
              </a>
            </h3>
            <div className={styles.desc}>
              Chia sẻ những gì bạn đang tìm kiếm. Cần gợi ý? Chỉ hỏi thôi.
            </div>
          </div>
        </div>
        <div className={`${styles.item}`}>
          <div className={styles.photo}>
            <Image alt="HTW_Icon2" src={HTW_Icon2} />
          </div>
          <div className={styles.text}>
            <h3 className={styles.name}>
              <a href="#" title="Thuê nhà">
                Nhận kết quả phù hợp và thông tin chi tiết
              </a>
            </h3>
            <div className={styles.desc}>
              Khởi động lại và nhận nhà mới mỗi ngày. Tôi sẽ chia sẻ thông tin nội bộ mà bạn cần để
              đưa ra quyết định đúng đắn.
            </div>
          </div>
        </div>
        <div className={`${styles.item}`}>
          <div className={styles.photo}>
            <Image alt="HTW_Icon3" src={HTW_Icon3} />
          </div>
          <div className={styles.text}>
            <h3 className={styles.name}>
              <a href="#" title="Định giá BĐS">
                Tìm chủ đầu tư phù hợp với bạn
              </a>
            </h3>
            <div className={styles.desc}>
              Tôi sẽ giới thiệu một đại lý đã được kiểm tra để có được quả bóng lăn.
            </div>
          </div>
        </div>
        <div className={`${styles.item}`}>
          <div className={styles.photo}>
            <Image alt="HTW_Icon4" src={HTW_Icon4} />
          </div>
          <div className={styles.text}>
            <h3 className={styles.name}>
              <a href="#" title="Định giá BĐS">
                Giữ liên lạc
              </a>
            </h3>
            <div className={styles.desc}>
              Nhận hỗ trợ từng bước cho đến khi kết thúc. Tôi chỉ cách một tin nhắn!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToWork;
