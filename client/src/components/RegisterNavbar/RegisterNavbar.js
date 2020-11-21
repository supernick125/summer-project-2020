import React, { useState, useContext } from 'react';
import Axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import Title from '../svgs/Title';

import { Container, Nav, Navbar, Form, FormControl, Col , InputGroup, Button } from 'react-bootstrap';
import './style.css';

import { Context as AuthContext } from '../../context/Auth';

export default () => {

  const { setAuthUser } = useContext(AuthContext);
  const [login, setLogin] = useState(false);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const updateUser = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  const setCookie = (name, value) => {
    const d = new Date();
    d.setTime(d.getTime() + 3 * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + d.toUTCString();
    document.cookie = name + '=' + value + ';' + expires + ';path=/';
  }

  const loginUser = async (event) => {
    event.preventDefault();
    try {
      const resp = await Axios({
        method: 'POST',
        url: '/api/auth/login',
        headers: {
          'Content-Type': 'application/json'
        },
        data: user
      });
      setUser({
        email: '',
        password: ''
      });
      setAuthUser({
        action: 'LOGIN_USER',
        data: resp.data.user
      });
      setCookie('x-auth-token', resp.data.accessToken);
      Axios.defaults.headers.common['x-auth-token'] = resp.data.accessToken;
      setLogin(true);
    }catch(error) {
      console.error(error);
    }
  }

  return login ? (
    <Redirect to='/home' />
  ) : (
    <Navbar className="bar" bg="light" expand="lg">
      {/*<ASLogo className='svg'/>*/}
      <Title className='svg'/>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form inline className="ml-auto mr-sm-2" onSubmit={loginUser}>
          <Form.Group controlId="loginEmail">
            <FormControl
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={updateUser}
              value={user.email}
              required />
          </Form.Group>
          <Form.Group controlId="loginPassword">
            <FormControl
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={updateUser}
              value={user.password}
              required />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}
