import React from 'react';

import { Route, Redirect } from 'react-router-dom';

const isLoggedIn = ({ component: Component, ...rest }) => {
  const isLoggedIn = !!localStorage.getItem('token'); // Kiểm tra xem đã đăng nhập chưa

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default isLoggedIn;