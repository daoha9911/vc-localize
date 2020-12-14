import React from 'react';
import FormRegister from '@/components/FormRegister';
import cls from 'classnames';
import { useHistory } from 'umi';
import GlobaHeaderLogo from './GlobalHeaderLogo';
import MobileNav from './MobileNav';
import GlobalHeaderTab from './GlobalHeaderTab';
import RightContent from './RightContent';

import styles from './index.less';

const GlobalHeader = () => {
  const { location } = useHistory();

  return (
    <>
      <div
        className={cls(styles.customDisplay, styles.customGlobalHeader,{[styles.headerMainPage]: location?.pathname === '/welcome'})}
        style={{ padding: '0 16px' }}
      >
        <div className={styles.customDisplay}>
          <GlobaHeaderLogo />
          <GlobalHeaderTab />
        </div>
        <RightContent />
      </div>
      <div className={styles.stickyMenuMobile}>
        <div className={styles.customMenuMobile}>
          <MobileNav />
        </div>
      </div>

      <FormRegister />
    </>
  );
};

export default GlobalHeader;
