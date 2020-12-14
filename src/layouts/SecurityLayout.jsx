import React from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect, connect } from 'umi';
import { stringify } from 'querystring';

class SecurityLayout extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    this.props.checkAuth();
  }

  componentDidUpdate(prevProps) {
    if (this.props.isLogged && !prevProps.isLogged) {
      this.props.getCurrentUser();
    }
  }

  render() {
    const { isReady } = this.state;
    const { children, loading, currentUser, disabled = true } = this.props; // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）

    const isLogin = currentUser && currentUser.userid;
    const queryString = stringify({
      redirect: window.location.href,
    });

    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }

    if (!isLogin && window.location.pathname !== '/user/login' && !disabled) {
      return <Redirect to={`/user/login?${queryString}`} />;
    }

    return children;
  }
}

export default connect(
  ({ user, loading, login }) => ({
    currentUser: user.currentUser,
    loading: loading.models.user,
    isLogged: login.loggedIn,
  }),
  (dispatch) => ({
    getCurrentUser: (payload) =>
      dispatch({
        type: 'user/fetchUserProfile',
        payload,
      }),
    checkAuth: (payload) => {
      dispatch({
        type: 'login/checkAuth',
        payload,
      });
    },
  }),
)(SecurityLayout);
