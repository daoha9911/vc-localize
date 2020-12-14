/*eslint-disable*/
import React, { useCallback, useState } from 'react';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Link, useHistory, useLocation } from 'umi';
import { CITY, SUBNAME } from './constants';
import styles from './index.less';
import Logo from '@/static/web_images/Logo.png';
import { connect } from 'dva';

const pathnameHasCitySelection = ['/map'];

const GlobaHeaderLogo = ({ dispatch, route }) => {
  const location = useLocation();
  const [key, setKey] = useState(1);
  // console.log('location ', location);
  const renderMenuItem = useCallback((items) => {
    return items && items.length >= 1
      ? items.map((item) => {
          const link = item.link.split('=');
          return (
            <Menu.Item
              onClick={() => {
                setKey(item.id);
                dispatch({
                  type: 'global/changeRoute',
                  payload: {
                    route: link[1],
                  },
                });
              }}
              key={item.id}
            >
              <Link to={item.link}>{item.name}</Link>
            </Menu.Item>
          );
        })
      : [];
  }, []);

  const menu = <Menu>{renderMenuItem(CITY)}</Menu>;
  return (
    <>
      <div className={styles.customLogoWrapper}>
        <div className={styles.customLogoSvg}>
          <Link to="/">
            <h2>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                }}
              >
                <img
                  style={{
                    marginRight: '4px',
                  }}
                  src={Logo}
                />
                {/* <b>Vitelia</b> */}
              </div>
            </h2>
          </Link>
        </div>
        {/* {pathnameHasCitySelection.includes(location.pathname) && */}
        <div>
          <Dropdown overlay={menu} trigger={['click']}>
            <a
              className={`ant-dropdown-link ${styles.customLocationText}`}
              onClick={(e) => e.preventDefault()}
            >
              <span style={{ marginRight: '8px' }}>{SUBNAME[route]}</span>{' '}
              <DownOutlined style={{ color: '#018489' }} />
            </a>
          </Dropdown>
        </div>
        {/* } */}
      </div>
    </>
  );
};

export default connect(({ global }) => ({
  route: global.route,
}))(GlobaHeaderLogo);
