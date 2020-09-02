import React, { useState } from 'react';
import Axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import './style.css';

export default () => {

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const registerUser = () => {
    Axios.post('http://localhost:3001/api/user/register', user)
      .then(response => {
        console.log(response);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
      //reset state
      this.setState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      });
  }

  //Handle input change
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  //Handle form submit
  const handleSubmit = (event) => {
    console.log(`Name: ${user.firstName} ${user.lastName} Email: ${user.email} Password: ${user.password}`);
    event.preventDefault();
    //Register new user
    //registerUser();
  }

  return (
    // <div>
    //   <form onSubmit={handleSubmit}>
    //     <div className=''>
    //       <label>First Name</label>
    //       <input type='text' name='firstName' value={user.firstName} onChange={handleChange} required />
    //     </div>
    //     <div className=''>
    //       <label>Last Name</label>
    //       <input type='text' name='lastName' value={user.lastName} onChange={handleChange} required />
    //     </div>
    //     <div className=''>
    //       <label>Email Address</label>
    //       <input type='text' name='email' value={user.email} onChange={handleChange} required />
    //     </div>
    //     <div className=''>
    //       <label>Password</label>
    //       <input type='text' name='password' value={user.password} onChange={handleChange} required />
    //     </div>
    //     <button type='submit'>Submit</button>
    //   </form>
    // </div>

    <Container fluid className='body'>
      <Form className='form' onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>First Name:</Form.Label>
          <Form.Control type="text" name="firstName" value={user.firstName} onChange={handleChange}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name:</Form.Label>
          <Form.Control type="text" name="lastName" value={user.lastName} onChange={handleChange}/>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email Address:</Form.Label>
          <Form.Control type="email" name="email" value={user.email} onChange={handleChange}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control type="text" name="password" value={user.password} onChange={handleChange}/>
        </Form.Group>
        <Button variant="primary" type="submit" value="Submit">Submit</Button>
      </Form>
    </Container>
  );
}
