import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterPage from './pages/Register/RegisterPage';
import HomePage from './pages/Home';

export default (props) => {
  return (
    <div class='h-100'>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/register" />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path='*'>
            <h1>Not Found</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
