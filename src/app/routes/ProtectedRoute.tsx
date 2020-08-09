import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, path: Path }) => {
  const isAuthenticated = localStorage.getItem('token');
  if (isAuthenticated) {
    return <Route path={Path} render={props => <Component {...props} />} />;
  } else {
    return <Redirect to="/" />;
  }
};

export default ProtectedRoute;
