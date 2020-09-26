import React, { useState } from 'react';
import Axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import './style.css';

export default () => {

  const [user, setUser] = useState({
    userType: '2',
    firstName: '',
    lastName: '',
    graduationYear: '',
    email: '',
    password: ''
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
        userType: '2',
        firstName: '',
        lastName: '',
        graduationYear: '',
        email: '',
        password: ''
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
          <Form.Control type="text" name="firstName" value={user.firstName} onChange={updateUser}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name:</Form.Label>
          <Form.Control type="text" name="lastName" value={user.lastName} onChange={updateUser}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Graduation Year:</Form.Label>
          <Form.Control type="text" name="graduationYear" value={user.graduationYear} onChange={updateUser}/>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>School Email Address:</Form.Label>
          <Form.Control type="email" name="email" value={user.email} onChange={updateUser}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control type="text" name="password" value={user.password} onChange={updateUser}/>
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </Container>
  );
}
