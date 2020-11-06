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
    usertype: 1,
    graduationyear: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    passwordCheck: ''
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
        data: {
          usertype: user.usertype,
          graduationyear: user.graduationyear,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          password: user.password,
          passwordCheck: user.passwordCheck
        }
      });
      setUser({
        userType: 1,
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        passwordCheck: ''
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

  const sayHello = async (event) => {
    try {
      const resp = await Axios.get('/api/hello');
      console.log(resp.data.message);
    }catch(error) {
      console.error(error);
    }
  }

  return login ? (
    <Redirect to='/home' />
  ) : (
    <Container fluid className='body'>
      {/*<button onClick={sayHello}>hello</button>*/}
      <Form className='form' onSubmit={registerUser}>
        <Form.Group controlID="registerFirstName">
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type="text"
            name="firstname"
            value={user.firstname}
            onChange={updateUser}
            required/>
        </Form.Group>
        <Form.Group controlID="registerLastName">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="text"
            name="lastname"
            value={user.lastname}
            onChange={updateUser}
            required/>
        </Form.Group>
        <Form.Group controlID="registerGraduationYear">
          <Form.Label>Graduation Year:</Form.Label>
          <Form.Control
            type="text"
            name="graduationyear"
            value={user.graduationyear}
            onChange={updateUser}
            required/>
        </Form.Group>
        <Form.Group controlId="registerEmail">
          <Form.Label>School Email Address:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={user.email}
            onChange={updateUser}
            required/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlID="registerPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={user.password}
            onChange={updateUser} required/>
        </Form.Group>
        <Form.Group controlID="registerPasswordCheck">
          <Form.Label>Re-enter Password:</Form.Label>
          <Form.Control
            type="password"
            name="passwordCheck"
            value={user.passwordCheck}
            onChange={updateUser}
            required/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
}
