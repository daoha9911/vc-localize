/*eslint-disable */
import React, { useState, useEffect, useCallback } from 'react';
import { connect, Link } from 'umi';
import cls from 'classnames';
import { useQueryLocation } from '@/hooks/useQueryLocation';
import { Menu, Dropdown, Divider } from 'antd';
import styles from './index.less';
import { useGoogleLogout } from 'react-google-login';
import { clientId } from '@/constants';

const GlobalHeaderRight = (props) => {
  const { user, theme, layout, dispatch, login } = props;

  const onLogoutSuccess = (res) => {
    console.log('Logged out Success');
    alert('Logged out Successfully ✌');
  };

  const onFailure = () => {
    console.log('Handle failure cases');
  };
  const { pathname } = useQueryLocation();

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  const [currentUserRoute, setCurrentUserRoute] = useState('');

  const renderActiveRoute = useCallback(
    (key) => {
      return cls(styles.customATag, { [styles.activeRoute]: currentUserRoute === key });
    },
    [currentUserRoute],
  );

  if (user) {
    dispatch({
      type: 'formregister/closeForm',
    });
  }

  useEffect(() => {
    switch (pathname) {
      case '/user/compare':
        setCurrentUserRoute('compare');
        break;
      default:
        setCurrentUserRoute('');
        break;
    }
  }, [pathname]);

  const handleAClick = (e) => {
    e.preventDefault();
    dispatch({ type: 'formregister/openForm' });
  };

  const logoutProfile = () => {
    if (user.type !== 1) {
      signOut();
    }
    const tokenUser = localStorage.getItem('accessToken');
    dispatch({
      type: 'login/logout',
      payload: tokenUser,
    });
  };

  const menu = (
    <Menu
      style={{
        top: '-25px',
        right: '40px',
      }}
      className="border-soild"
    >
      <Menu.Item>
        <Link to="/user/profile">
          <div className="dinhgia-bds-menu_register" style={{ display: 'flex' }}>
            <div className={`icn ${styles.customIcn}`}>
              <svg
                width="17"
                height="20"
                viewBox="0 0 17 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.7545 11.9992C14.9966 11.9992 16.0034 13.0061 16.0034 14.2481V14.8235C16.0034 15.7178 15.6838 16.5826 15.1023 17.262C13.5329 19.0955 11.1457 20.0004 8.0004 20.0004C4.8545 20.0004 2.46849 19.0952 0.902187 17.261C0.322416 16.582 0.00390625 15.7186 0.00390625 14.8258V14.2481C0.00390625 13.0061 1.01076 11.9992 2.25278 11.9992H13.7545ZM13.7545 13.4992H2.25278C1.83919 13.4992 1.50391 13.8345 1.50391 14.2481V14.8258C1.50391 15.3614 1.69502 15.8795 2.04287 16.2869C3.29618 17.7546 5.26206 18.5004 8.0004 18.5004C10.7387 18.5004 12.7063 17.7545 13.9627 16.2866C14.3117 15.879 14.5034 15.3601 14.5034 14.8235V14.2481C14.5034 13.8345 14.1681 13.4992 13.7545 13.4992ZM8.0004 0.00390625C10.7618 0.00390625 13.0004 2.24249 13.0004 5.00391C13.0004 7.76534 10.7618 10.0039 8.0004 10.0039C5.23894 10.0039 3.00036 7.76534 3.00036 5.00391C3.00036 2.24249 5.23894 0.00390625 8.0004 0.00390625ZM8.0004 1.50391C6.0674 1.50391 4.50036 3.07092 4.50036 5.00391C4.50036 6.93691 6.0674 8.50389 8.0004 8.50389C9.9334 8.50389 11.5004 6.93691 11.5004 5.00391C11.5004 3.07092 9.9334 1.50391 8.0004 1.50391Z"
                  fill="#727C7D"
                />
              </svg>
            </div>
            <span className={styles.customProfileMenu}>Thông tin cá nhân</span>
          </div>
        </Link>
      </Menu.Item>
      <Divider
        style={{
          margin: '0px',
        }}
      />
      {/* <Menu.Item>
        <Link to="/user/profile">
          <div>
            <div className="dinhgia-bds-menu_register" style={{ display: 'flex' }}>
              <div className={`icn ${styles.customIcn}`}>
                <svg
                  width="16"
                  height="21"
                  viewBox="0 0 16 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.5 3C1.5 1.89543 2.39543 1 3.5 1H12.5C13.6046 1 14.5 1.89543 14.5 3V18.4535C14.5 19.3623 13.3856 19.7999 12.7672 19.1339L8.73279 14.7892C8.33716 14.3631 7.66284 14.3631 7.26721 14.7892L3.23279 19.1339C2.61435 19.7999 1.5 19.3623 1.5 18.4535V3Z"
                    fill="white"
                    stroke="#727C7D"
                    // stroke-width="1.2"
                  />
                </svg>
              </div>
              <span className={styles.customProfileMenu}>Bất động sản đã lưu</span>
            </div>
          </div>
        </Link>
      </Menu.Item> */}
      {/* <Divider
        style={{
          margin: '0px',
        }}
      /> */}
      <Menu.Item>
        <div
          onClick={() => {
            /** logout profile */
            logoutProfile();
          }}
        >
          <div className="dinhgia-bds-menu_register" style={{ display: 'flex' }}>
            <div className={`icn ${styles.customIcn}`}>
              <svg
                width="21"
                height="17"
                viewBox="0 0 21 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.499 1.3537V1.99951L12.2443 1.99953C12.6235 1.99953 12.9371 2.28105 12.9873 2.64664L12.9943 2.74829L13.001 6.99953H11.501L11.4955 3.49953L10.499 3.49951L10.4995 8.00443L11.501 8.00353L11.502 7.99953H13.003L13.002 8.00353H17.941L16.2186 6.27977C15.9524 6.01346 15.9282 5.59679 16.1461 5.30321L16.2188 5.21911C16.4851 4.95289 16.9017 4.92875 17.1953 5.14666L17.2794 5.21929L20.276 8.21693C20.542 8.48303 20.5664 8.89923 20.349 9.19273L20.2765 9.27693L17.2799 12.2803C16.9874 12.5735 16.5125 12.5741 16.2193 12.2815C15.9527 12.0156 15.928 11.5989 16.1455 11.3051L16.2181 11.2209L17.931 9.50353L10.4995 9.50443L10.499 14.0005L11.5129 14.0009L11.506 10.4995H13.007L13.0142 14.7497C13.0148 15.1298 12.7325 15.4443 12.366 15.4941L12.2642 15.5009L10.499 15.5005V16.2495C10.499 16.7159 10.0778 17.0692 9.61862 16.9881L1.11857 15.4868C0.760233 15.4235 0.499023 15.1121 0.499023 14.7482V2.74953C0.499023 2.38222 0.765033 2.06896 1.12749 2.00944L9.62752 0.61361C10.0841 0.53862 10.499 0.89097 10.499 1.3537ZM8.99902 2.2369L1.99902 3.38641V14.1191L8.99902 15.3554V2.2369ZM7.00117 8.49953C7.55464 8.49953 8.00332 8.94823 8.00332 9.50163C8.00332 10.0551 7.55464 10.5038 7.00117 10.5038C6.4477 10.5038 5.99902 10.0551 5.99902 9.50163C5.99902 8.94823 6.4477 8.49953 7.00117 8.49953Z"
                  fill="#727C7D"
                />
              </svg>
            </div>
            <span className={styles.customProfileMenu}>Đăng xuất</span>
          </div>
        </div>
      </Menu.Item>
    </Menu>
  );

  let className = styles.right;

  if (theme === 'dark' && layout === 'top') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={`${className} dinhgia-bds-menu_register_wrapper`}>
      {login ? (
        <div className={`${className} dinhgia-bds-menu_register_wrapper`}>
          <a href="#" className={renderActiveRoute('news')}>
            <div className="dinhgia-bds-menu_register" style={{ display: 'flex' }}>
              <div className={`icn ${styles.customIcn}`}>
                <svg width="20" height="16" viewBox="0 0 20 16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16.75 16H3.25C1.51697 16 0.10075 14.6435 0.00514007 12.9344L0 12.75V2.25C0 1.05914 0.92516 0.0843599 2.09595 0.0051899L2.25 0H14.75C15.9409 0 16.9156 0.92516 16.9948 2.09595L17 2.25V3H17.75C18.9409 3 19.9156 3.92516 19.9948 5.09595L20 5.25V12.75C20 14.483 18.6435 15.8992 16.9344 15.9949L16.75 16H3.25H16.75ZM3.25 14.5H16.75C17.6682 14.5 18.4212 13.7929 18.4942 12.8935L18.5 12.75V5.25C18.5 4.8703 18.2178 4.55651 17.8518 4.50685L17.75 4.5H17V12.25C17 12.6297 16.7178 12.9435 16.3518 12.9932L16.25 13C15.8703 13 15.5565 12.7178 15.5068 12.3518L15.5 12.25V2.25C15.5 1.8703 15.2178 1.55651 14.8518 1.50685L14.75 1.5H2.25C1.8703 1.5 1.55651 1.78215 1.50685 2.14823L1.5 2.25V12.75C1.5 13.6682 2.20711 14.4212 3.10647 14.4942L3.25 14.5H16.75H3.25ZM10.246 10.5H13.2522C13.6665 10.5 14.0022 10.8358 14.0022 11.25C14.0022 11.6297 13.7201 11.9435 13.354 11.9932L13.2522 12H10.246C9.8318 12 9.496 11.6642 9.496 11.25C9.496 10.8703 9.7782 10.5565 10.1442 10.5068L10.246 10.5H13.2522H10.246ZM7.24328 7.0045C7.6575 7.0045 7.99328 7.3403 7.99328 7.7545V11.25C7.99328 11.6642 7.6575 12 7.24328 12H3.74776C3.33355 12 2.99776 11.6642 2.99776 11.25V7.7545C2.99776 7.3403 3.33355 7.0045 3.74776 7.0045H7.24328ZM6.49328 8.5045H4.49776V10.5H6.49328V8.5045ZM10.246 7.0045H13.2522C13.6665 7.0045 14.0022 7.3403 14.0022 7.7545C14.0022 8.1342 13.7201 8.448 13.354 8.4976L13.2522 8.5045H10.246C9.8318 8.5045 9.496 8.1687 9.496 7.7545C9.496 7.3748 9.7782 7.061 10.1442 7.0113L10.246 7.0045H13.2522H10.246ZM3.74776 3.50247H13.2522C13.6665 3.50247 14.0022 3.83826 14.0022 4.25247C14.0022 4.63217 13.7201 4.94596 13.354 4.99563L13.2522 5.00247H3.74776C3.33355 5.00247 2.99776 4.66669 2.99776 4.25247C2.99776 3.87278 3.27991 3.55898 3.64599 3.50932L3.74776 3.50247H13.2522H3.74776Z"
                    fill="#727C7D"
                  />
                </svg>
              </div>
              <span className={styles.customRegisterSpan}>Bảng tin</span>
            </div>
          </a>
          <Link className={renderActiveRoute('compare')} to="/user/compare">
            <div className="dinhgia-bds-menu_register" style={{ display: 'flex' }}>
              <div className={`icn ${styles.customIcn}`}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="2.25" y="2.25" width="19.5" height="19.5" rx="4.75" fill="white" />
                  <rect x="2.25" y="2.25" width="19.5" height="19.5" rx="4.75" stroke="#727C7D" />
                  <path
                    d="M14.5387 5.15376L17.8318 8.30009C18.0267 8.48633 18.0446 8.77773 17.8853 8.98326L17.8322 9.04216L14.5392 12.1956C14.3248 12.4008 13.9769 12.4012 13.7621 12.1963C13.5668 12.0101 13.5487 11.7185 13.7081 11.5129L13.7613 11.4539L16.1179 9.1979L7.54946 9.19836C7.27129 9.19836 7.0414 9.00086 7.00501 8.7446L7 8.67336C7 8.40758 7.20671 8.18792 7.4749 8.15316L7.54946 8.14836L16.1194 8.1479L13.7617 5.89625C13.5666 5.70986 13.5489 5.4182 13.7084 5.21267L13.7616 5.15378C13.9567 4.96739 14.2619 4.95043 14.4771 5.10293L14.5387 5.15376L17.8318 8.30009L14.5387 5.15376ZM17.995 15.2544L18 15.3256C18 15.5914 17.7933 15.8111 17.5251 15.8458L17.4505 15.8506L8.88195 15.85L11.2418 18.1036C11.437 18.2899 11.4548 18.5816 11.2953 18.7872L11.2421 18.8461C11.0472 19.0325 10.7419 19.0496 10.5267 18.8972L10.4651 18.8464L7.16834 15.699C6.97319 15.5127 6.95533 15.221 7.11484 15.0155L7.16802 14.9566L10.4648 11.8039C10.6792 11.5988 11.0271 11.5987 11.2418 11.8036C11.437 11.9899 11.4548 12.2816 11.2953 12.4872L11.2421 12.5461L8.88488 14.8L17.4505 14.8006C17.7287 14.8006 17.9586 14.9981 17.995 15.2544L18 15.3256L17.995 15.2544Z"
                    fill="#727C7D"
                  />
                </svg>
              </div>
              <span className={styles.customRegisterSpan}>So sánh bất động sản</span>
            </div>
          </Link>
          <a href="#" className={styles.customATag}>
            <Dropdown overlay={menu}>
              <div className="dinhgia-bds-menu_register" style={{ display: 'flex' }}>
                <div className={`icn ${styles.customIcn}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#303030"
                      fillRule="evenodd"
                      d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm-.015 13.825c-2.342 0-4.271.998-5.822 3.025A8.962 8.962 0 0 0 12 21a8.965 8.965 0 0 0 5.855-2.165c-1.572-2.017-3.517-3.01-5.87-3.01zM12 3a9 9 0 0 0-6.564 15.157c1.725-2.212 3.92-3.332 6.549-3.332 2.638 0 4.848 1.114 6.595 3.314A9 9 0 0 0 12 3zm0 11c-2.018 0-3.025-1.682-3-4.005C9.026 7.637 9.994 6 12 6c2.012 0 3 1.66 3 4s-.988 4-3 4zm0-1c1.321 0 2-1.14 2-3s-.679-3-2-3c-1.314 0-1.979 1.124-2 3.005-.02 1.84.672 2.995 2 2.995z"
                    />
                  </svg>
                </div>
                <span className={styles.customRegisterSpan}>{user?.lastName || ''}</span>
              </div>
            </Dropdown>
          </a>
        </div>
      ) : (
        <div className={`${className} dinhgia-bds-menu_register_wrapper`}>
          <a href="#" className={styles.customATag} onClick={handleAClick}>
            <div className="dinhgia-bds-menu_register" style={{ display: 'flex' }}>
              <div className={`icn ${styles.customIcn}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="#303030"
                    fillRule="evenodd"
                    d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm-.015 13.825c-2.342 0-4.271.998-5.822 3.025A8.962 8.962 0 0 0 12 21a8.965 8.965 0 0 0 5.855-2.165c-1.572-2.017-3.517-3.01-5.87-3.01zM12 3a9 9 0 0 0-6.564 15.157c1.725-2.212 3.92-3.332 6.549-3.332 2.638 0 4.848 1.114 6.595 3.314A9 9 0 0 0 12 3zm0 11c-2.018 0-3.025-1.682-3-4.005C9.026 7.637 9.994 6 12 6c2.012 0 3 1.66 3 4s-.988 4-3 4zm0-1c1.321 0 2-1.14 2-3s-.679-3-2-3c-1.314 0-1.979 1.124-2 3.005-.02 1.84.672 2.995 2 2.995z"
                  />
                </svg>
              </div>
              <span className={styles.customRegisterSpan}>Đăng ký / Đăng nhập</span>
            </div>
          </a>
        </div>
      )}
    </div>
  );
};

export default connect(({ settings, user, login }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
  user: user.currentUser,
  login: login.loggedIn,
}))(GlobalHeaderRight);
