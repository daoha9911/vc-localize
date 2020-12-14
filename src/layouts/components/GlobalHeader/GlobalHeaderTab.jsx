import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import { history } from 'umi';
import { useLocation } from 'react-router';

import styles from './index.less';

const { TabPane } = Tabs;

const GlobaHeaderTab = () => {
  const location = useLocation();

  const [activeKey, setActiveKey] = useState(null);

  const onTabChange = (key) => {
    // if (key !== '1') {
    //   return;
    // }
    setActiveKey(key);
    switch (key) {
      case '1':
        history.push('/map');
        break;
      case '2':
        history.push('/assessment');
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    if (location.pathname === '/map') {
      setActiveKey('1');
      return;
    }
    if (location.pathname === '/assessment') {
      setActiveKey('2');
      return;
    }

    setActiveKey(null);
  }, [location.pathname]);

  return (
    <>
      <Tabs className="dinhgia-bds-menu_menutab" onChange={onTabChange} activeKey={activeKey}>
        <TabPane tab={<span className={styles.menuTab}> Mua nhà</span>} key="1" />
        {/* <TabPane tab={<span className={styles.menuTab}>Thuê nhà</span>} key="2" /> */}
        <TabPane tab={<span className={styles.menuTab}>Định giá</span>} key="2" />
      </Tabs>
    </>
  );
};

export default GlobaHeaderTab;
