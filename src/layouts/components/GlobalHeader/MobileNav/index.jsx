import React, { useCallback } from 'react';
import { useSelector, useDispatch, connect } from 'dva';
import { Link } from 'umi';

import { LogoHome, SaveLogo, LoginLogo, UserLogo, StackLogo, SaveActiveLogo } from './logo';
import styles from '../index.less';

const MobileNav = () => {
  const dispatch = useDispatch();
  const onLogin = useCallback(() => {
    if (dispatch) {
      dispatch({ type: 'formregister/openForm' });
    }
  }, [dispatch]);
  const { user, loggedIn } = useSelector((state) => ({
    loggedIn: state.login.loggedIn,
    user: state.user.currentUser,
  }));
  return (
    <div className={`flex justify-between items-stretch ${styles.customMenuMobile_Wrapper}`}>
      <Link to="/" className="flex-grow">
        <LogoHome />
      </Link>
      {loggedIn && user ? (
        <Link to="/user/profile?key=saveHome" className="flex-grow">
          <SaveActiveLogo /> 
        </Link>
      ) : (
        <SaveLogo onClick={onLogin} />
      )}
      {loggedIn && user ? (
        <Link to="/user/mob-wrapper" className="flex-grow">
          <UserLogo user={user} />
        </Link>
      ) : (
        <LoginLogo onClick={onLogin} />
      )}
      {/* <StackLogo /> */}
    </div>
  );
};

export default MobileNav;
