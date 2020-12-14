import React from 'react';
import { Redirect, connect } from 'umi';
import Authorized from '@/utils/Authorized';
import { getRouteAuthority } from '@/utils/utils';

const AuthComponent = ({
  children,
  route = {
    routes: [],
  },
  location = {
    pathname: '',
  },
  isLogin,
}) => {
  // const { currentUser } = user;
  const { routes = [] } = route;
  // const isLogin = currentUser && currentUser.name;
  if (!isLogin) {
    return <Redirect to="/" />;
  }
  return (
    <Authorized
      authority={getRouteAuthority(location.pathname, routes) || ''}
      noMatch={isLogin ? <Redirect to="/" /> : <Redirect to="/user/login" />}
    >
      {children}
    </Authorized>
  );
};

export default connect(({ user, login }) => ({
  user: user.currentUser,
  isLogin: login.loggedIn,
}))(AuthComponent);
