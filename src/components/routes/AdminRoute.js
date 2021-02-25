import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import { currentAdmin } from '../../axiosFunctions/auth';

const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.idToken) {
      currentAdmin(user.idToken)
        .then(() => {
          setOk(true);
        })
        .catch(() => {
          setOk(false);
        });
    }
  }, [user]);
  return ok ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default AdminRoute;
