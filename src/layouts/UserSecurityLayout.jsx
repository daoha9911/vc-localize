import React, { useEffect } from 'react';
import { connect, history } from 'umi';

const UserSecurityLayout = (props) => {
  const { children, login } = props;

  useEffect(() => {
    if (!login?.loggedIn) {
      history.push('/');
    }
  }, [login?.loggedIn]);

  return (
    <>
      <div>{children}</div>
    </>
  );
};

export default connect(({ settings, login }) => ({ ...settings, login }))(UserSecurityLayout);
