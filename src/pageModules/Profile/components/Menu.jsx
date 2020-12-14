/* eslint-disable */
import React, { useState, useCallback } from 'react';
import { connect } from 'dva';
import { history } from 'umi';

import cls from 'classnames';

import styles from '../index.less';

const MenuProfile = ({ dispatch, handleChangeScenario }) => {
  const [active, setActive] = useState(1);

  const onPushBack = useCallback(() => {
    history.goBack();
  }, []);

  const logoutProfile = () => {
    const tokenUser = localStorage.getItem('accessToken');
    dispatch({
      type: 'login/logout',
      payload: tokenUser,
    });
  };

  return (
    <>
      <div
        className={cls(styles.Profile_Quote_Mobile, 'flex items-center mb-4')}
        onClick={onPushBack}
      >
        <div className="mr-2">
          <svg
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z" fill="#002C34" />
          </svg>
        </div>
        <h2>Quay lại</h2>
      </div>
      <div className={styles.customNav}>
        <ul>
          <li
            className={active === 1 ? `${styles.active}` : `${styles.nonactive}`}
            onClick={() => {
              /** redirect to /profile and display profile component */
              handleChangeScenario('edit');
              setActive(1);
            }}
          >
            <div>
              <div className="dinhgia-bds-menu_register" style={{ display: 'flex' }}>
                <div className={` ${styles.customIcn}`}>
                  {active === 1 ? (
                    <svg
                      width="17"
                      height="20"
                      viewBox="0 0 17 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.7545 11.9992C14.9966 11.9992 16.0034 13.0061 16.0034 14.2481V14.8235C16.0034 15.7178 15.6838 16.5826 15.1023 17.262C13.5329 19.0955 11.1457 20.0004 8.0004 20.0004C4.8545 20.0004 2.46849 19.0952 0.902187 17.261C0.322416 16.582 0.00390625 15.7186 0.00390625 14.8258V14.2481C0.00390625 13.0061 1.01076 11.9992 2.25278 11.9992H13.7545ZM13.7545 13.4992H2.25278C1.83919 13.4992 1.50391 13.8345 1.50391 14.2481V14.8258C1.50391 15.3614 1.69502 15.8795 2.04287 16.2869C3.29618 17.7546 5.26206 18.5004 8.0004 18.5004C10.7387 18.5004 12.7063 17.7545 13.9627 16.2866C14.3117 15.879 14.5034 15.3601 14.5034 14.8235V14.2481C14.5034 13.8345 14.1681 13.4992 13.7545 13.4992ZM8.0004 0.00390625C10.7618 0.00390625 13.0004 2.24249 13.0004 5.00391C13.0004 7.76534 10.7618 10.0039 8.0004 10.0039C5.23894 10.0039 3.00036 7.76534 3.00036 5.00391C3.00036 2.24249 5.23894 0.00390625 8.0004 0.00390625ZM8.0004 1.50391C6.0674 1.50391 4.50036 3.07092 4.50036 5.00391C4.50036 6.93691 6.0674 8.50389 8.0004 8.50389C9.9334 8.50389 11.5004 6.93691 11.5004 5.00391C11.5004 3.07092 9.9334 1.50391 8.0004 1.50391Z"
                        fill="#FCFCFC"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="17"
                      height="20"
                      viewBox="0 0 17 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.7545 11.9992C14.9966 11.9992 16.0034 13.0061 16.0034 14.2481V14.8235C16.0034 15.7178 15.6838 16.5826 15.1023 17.262C13.5329 19.0955 11.1457 20.0004 8.0004 20.0004C4.8545 20.0004 2.46849 19.0952 0.902186 17.261C0.322416 16.582 0.00390625 15.7186 0.00390625 14.8258V14.2481C0.00390625 13.0061 1.01076 11.9992 2.25278 11.9992H13.7545ZM13.7545 13.4992H2.25278C1.83919 13.4992 1.50391 13.8345 1.50391 14.2481V14.8258C1.50391 15.3614 1.69502 15.8795 2.04287 16.2869C3.29618 17.7546 5.26206 18.5004 8.0004 18.5004C10.7387 18.5004 12.7063 17.7545 13.9627 16.2866C14.3117 15.879 14.5034 15.3601 14.5034 14.8235V14.2481C14.5034 13.8345 14.1681 13.4992 13.7545 13.4992ZM8.0004 0.00390625C10.7618 0.00390625 13.0004 2.24249 13.0004 5.00391C13.0004 7.76534 10.7618 10.0039 8.0004 10.0039C5.23894 10.0039 3.00036 7.76534 3.00036 5.00391C3.00036 2.24249 5.23894 0.00390625 8.0004 0.00390625ZM8.0004 1.50391C6.0674 1.50391 4.50036 3.07092 4.50036 5.00391C4.50036 6.93691 6.0674 8.50389 8.0004 8.50389C9.9334 8.50389 11.5004 6.93691 11.5004 5.00391C11.5004 3.07092 9.9334 1.50391 8.0004 1.50391Z"
                        fill="#00AEAC"
                      />
                    </svg>
                  )}
                </div>
                <span className={styles.customProfileMenu}>Thông tin cá nhân</span>
              </div>
            </div>
          </li>
          <hr className={styles.customHr} />
          <li
            className={active === 2 ? `${styles.active}` : `${styles.nonactive}`}
            onClick={() => {
              /** redirect to /profile and display profile component */
              handleChangeScenario('saveHome');
              setActive(2);
            }}
          >
            <div>
              <div className="dinhgia-bds-menu_register" style={{ display: 'flex' }}>
                <div className={` ${styles.customIcn}`}>
                  {active === 2 ? (
                    <svg
                      width="16"
                      height="21"
                      viewBox="0 0 16 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.5 3C1.5 1.89543 2.39543 1 3.5 1H12.5C13.6046 1 14.5 1.89543 14.5 3V18.4535C14.5 19.3623 13.3856 19.7999 12.7672 19.1339L8.73279 14.7892C8.33716 14.3631 7.66284 14.3631 7.26721 14.7892L3.23279 19.1339C2.61435 19.7999 1.5 19.3623 1.5 18.4535V3Z"
                        stroke="white"
                        stroke-width="1.2"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="16"
                      height="21"
                      viewBox="0 0 16 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.5 3C1.5 1.89543 2.39543 1 3.5 1H12.5C13.6046 1 14.5 1.89543 14.5 3V18.4535C14.5 19.3623 13.3856 19.7999 12.7672 19.1339L8.73279 14.7892C8.33716 14.3631 7.66284 14.3631 7.26721 14.7892L3.23279 19.1339C2.61435 19.7999 1.5 19.3623 1.5 18.4535V3Z"
                        stroke="#00AEAC"
                        stroke-width="1.2"
                      />
                    </svg>
                  )}
                </div>
                <span className={styles.customProfileMenu}>Bất động sản đã lưu</span>
              </div>
            </div>
          </li>
          <hr className={styles.customHr} />
          <li
            className={active === 3 ? `${styles.active}` : `${styles.nonactive}`}
            onClick={() => {
              /** redirect to /profile and display profile component */
              logoutProfile();
            }}
          >
            <div>
              <div className="dinhgia-bds-menu_register" style={{ display: 'flex' }}>
                <div className={`icn ${styles.customIcn}`}>
                  <svg
                    width="20"
                    height="17"
                    viewBox="0 0 20 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 1.3537V1.99951L11.7453 1.99953C12.1245 1.99953 12.4381 2.28105 12.4883 2.64664L12.4953 2.74829L12.502 6.99953H11.002L10.9965 3.49953L10 3.49951L10.0005 8.00443L11.002 8.00353L11.003 7.99953H12.504L12.503 8.00353H17.442L15.7196 6.27977C15.4534 6.01346 15.4292 5.59679 15.6471 5.30321L15.7198 5.21911C15.9861 4.95289 16.4027 4.92875 16.6963 5.14666L16.7804 5.21929L19.777 8.21693C20.043 8.48303 20.0674 8.89923 19.85 9.19273L19.7775 9.27693L16.7809 12.2803C16.4884 12.5735 16.0135 12.5741 15.7203 12.2815C15.4537 12.0156 15.429 11.5989 15.6465 11.3051L15.7191 11.2209L17.432 9.50353L10.0005 9.50443L10 14.0005L11.0139 14.0009L11.007 10.4995H12.508L12.5152 14.7497C12.5158 15.1298 12.2335 15.4443 11.867 15.4941L11.7652 15.5009L10 15.5005V16.2495C10 16.7159 9.5788 17.0692 9.1196 16.9881L0.61955 15.4868C0.26121 15.4235 0 15.1121 0 14.7482V2.74953C0 2.38222 0.26601 2.06896 0.62847 2.00944L9.1285 0.61361C9.5851 0.53862 10 0.89097 10 1.3537ZM8.5 2.2369L1.5 3.38641V14.1191L8.5 15.3554V2.2369ZM6.50215 8.49953C7.05562 8.49953 7.5043 8.94823 7.5043 9.50163C7.5043 10.0551 7.05562 10.5038 6.50215 10.5038C5.94868 10.5038 5.5 10.0551 5.5 9.50163C5.5 8.94823 5.94868 8.49953 6.50215 8.49953Z"
                      fill="#00AEAC"
                    />
                  </svg>
                </div>
                <span className={styles.customProfileMenu}>Đăng xuất</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};
export default connect()(MenuProfile);
