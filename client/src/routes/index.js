import React, { useEffect, useContext, useState } from 'react';
import { Switch, Route, useLocation, Redirect, Router } from 'react-router-dom';
import Axios from 'axios';

import { Provider as AuthProvider } from '../context/Auth';
import { Context as AuthContext } from '../context/Auth';

import HomePage from '../pages/Home/HomePage';
import RegisterPage from '../pages/Register/RegisterPage';
import AdminPage from '../pages/Admin/AdminPage';
import Account from '../pages/Account/Account';
import CheckPage from '../pages/Account/CheckPage';

export default () => {
  const { authUser, setAuthUser } = useContext(AuthContext);

  const [logCheck, setLogCheck] = useState(false);
  const location = useLocation();
  const authRoutes = {
    '/': null,
    '/register': RegisterPage
  }

  const getCookie = (name) => {
    const cookieName = name + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(cookieName) === 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return false;
  }

  useEffect(() => {
    const checkLogin = async () => {
      if(!authUser.isAuth && getCookie('x-auth-token')) {
        Axios.defaults.headers.common['x-auth-token'] = getCookie('x-auth-token');
        try {
          const resp = await Axios.get('api/auth/check');
          setAuthUser({
            action: 'LOGIN_USER',
            data: resp.data.user
          });
        } catch(e) {
          document.cookie = 'x-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          delete Axios.defaults.headers.common['x-auth-token'];
        }
      }
      setLogCheck(true);
    }
    checkLogin();
  }, []);

  if (logCheck && authUser.isAuth) {
    if(location.pathname in authRoutes) return <Redirect to='/home' />
    return (
      <Switch>
        <Route exact path='/home'>
          <HomePage />
        </Route>
        <Route exact path='/admin'>
          <AdminPage />
        </Route>
        <Route>
          <Account />
        </Route>
        <Route>
          <CheckPage />
        </Route>
        <Route exact path='/404'>
          <h1>Not found</h1>
        </Route>
      </Switch>
    );
  }
  if(logCheck){
    if(!(location.pathname in authRoutes)) return <Redirect to='/' />
    return (
      <Switch>
        <Route exact path='/'>
          <Redirect to='/register' />
        </Route>
        <Route exact path='/register'>
          <RegisterPage />
        </Route>
        <Route path='*'>
          <h1>Not found</h1>
        </Route>
      </Switch>
    );
  }
  return '';
}
