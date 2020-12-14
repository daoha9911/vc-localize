import React, { useState } from 'react';
import images from '@/assets/images/index';
import { UserOutlined, CloseOutlined } from '@ant-design/icons';

import './index.css';

const Header = () => {
  const [active, setActive] = useState(false);

  return (
    <header className={active ? 'header active' : 'header'}>
      <div className="container">
        <div className="open" onClick={() => setActive(true)}>
          <span>Menu</span>
        </div>
        <div className="logo">
          <a href="#" title="home">
            <img src={images.logo1} alt="logo" />
          </a>
        </div>
        <div className="box">
          <div className="close" onClick={() => setActive(false)}>
            <CloseOutlined />
          </div>
          <div className="menu">
            <ul>
              <li>
                <a href="#" title="Trang chủ">
                  Trang chủ
                </a>
              </li>
              <li>
                <a href="#" title="Mua nhà">
                  Mua nhà
                </a>
              </li>
              <li>
                <a href="#" title="Thuê nhà">
                  Thuê nhà
                </a>
              </li>
              <li>
                <a href="#" title="Định giá">
                  Định giá
                </a>
              </li>
            </ul>
          </div>
          <div className="user">
            <UserOutlined />
            <a href="#" title="Đăng nhập">
              Đăng nhập
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
