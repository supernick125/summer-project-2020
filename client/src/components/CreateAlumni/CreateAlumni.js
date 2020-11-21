import React, { useState } from 'react';
import Axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import './style.css';

export default () => {

  const [user, setUser] = useState({
    usertype: 2,
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
        usertype: 2,
        graduationyear: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        passwordCheck: ''
      })
    }catch(error) {
      console.error('Error creating user');
    }
  }

  return (
    <Container>
      <h1>Create an Alumni Account</h1>
      <Form className='form' onSubmit={registerUser}>
        <Form.Group>
          <Form.Label>First Name:</Form.Label>
          <Form.Control type="text" name="firstname" value={user.firstname} onChange={updateUser} required/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name:</Form.Label>
          <Form.Control type="text" name="lastname" value={user.lastname} onChange={updateUser} required/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Graduation Year:</Form.Label>
          <Form.Control type="text" name="graduationyear" value={user.graduationyear} onChange={updateUser} required/>
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
          <Form.Label>Password Check:</Form.Label>
          <Form.Control type="text" name="passwordCheck" value={user.passwordCheck} onChange={updateUser} required/>
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </Container>
  );
}
