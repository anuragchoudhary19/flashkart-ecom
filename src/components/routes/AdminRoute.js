import React, { useRef, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { currentAdmin } from '../../axiosFunctions/auth';
import LoadingToRedirect from './LoadingToRedirect';

const AdminRoute = ({ component: Component, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  let [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          setIsAuthenticated(true);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          setIsAuthenticated(false);
        });
    }
    return () => {
      setIsAuthenticated(false);
    };
  }, [user]);

  return user && user.token ? (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <LoadingToRedirect isAuthenticated={isAuthenticated} />
      }
    />
  ) : (
    <Redirect to='/' />
  );
};

export default AdminRoute;
