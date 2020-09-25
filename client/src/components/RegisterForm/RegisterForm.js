import React, { useState, useContext } from 'react';
import Axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

import { Container, Form, Button } from 'react-bootstrap';
import './style.css';

import { Context as AuthContext } from '../../context/Auth';

export default () => {

  const { setAuthUser } = useContext(AuthContext);
  const [login, setLogin] = useState(false);

  const [user, setUser] = useState({
    userType: '1',
    firstname: '',
    lastname: '',
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

  const registerUser = async (event) => {
    event.preventDefault();
    try {
      const resp = await Axios({
        method: 'POST',
        url: '/api/auth/register',
        headers: {
          'Content-Type': 'application/json'
        },
        data: user
      });
      setUser({
        userType: '1',
        firstname: '',
        lastname: '',
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
    <Container fluid className='body'>
      <Form className='form' onSubmit={registerUser}>
        <Form.Group>
          <Form.Label>First Name:</Form.Label>
          <Form.Control type="text" name="firstName" value={user.firstName} onChange={updateUser} required/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name:</Form.Label>
          <Form.Control type="text" name="lastName" value={user.lastName} onChange={updateUser} required/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Graduation Year:</Form.Label>
          <Form.Control type="text" name="graduationYear" value={user.graduationYear} onChange={updateUser} required/>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>School Email Address:</Form.Label>
          <Form.Control type="email" name="email" value={user.email} onChange={updateUser} required/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control type="text" name="password" value={user.password} onChange={updateUser} required/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Re-enter Password:</Form.Label>
          <Form.Control type="text" name="passwordCheck" value={user.passwordCheck} onChange={updateUser} required/>
        </Form.Group>
        <div>
          <button type='submit'>Register</button>
        </div>
      </Form>
    </Container>
  );
}
