import React, { useState } from 'react'
import Axios from 'axios'
import { Container, Form, Button } from 'react-bootstrap'
import './style.css'

export default () => {
  
  const [user, setUser] = useState({
    userType: '1',
    firstName: '',
    lastName: '',
    graduationYear: '',
    email: '',
    password: '',
    passwordCheck: '' 
  });

  // const emailCheck = function() {
  //   return(user.email.includes('columbia.edu') || user.email.includes('barnard.edu'))
  // }

  const passwordCheck = function () {
    return(user.password === user.passwordCheck)
  }

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
        userType: '1',
        firstName: '',
        lastName: '',
        graduationYear: '',
        email: '',
        password: '',
        passwordCheck: ''
      });
  }

  //Handle input change
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  //Handle form submit
  const handleSubmit = (event) => {
    // WITH emailCheck()
    // if (emailCheck() && passwordCheck()) {
    //   console.log(`Name: ${user.firstName} ${user.lastName} Email: ${user.email} Password: ${user.password}`);
    //   //Register new user
    //   registerUser();
    // } else if (!emailCheck()) {
    //   alert('Please use your columbia.edu or barnard.edu email!')
    // } else {
    //   alert('Please re-enter the same password!')
    // }
    //WITHOUT emailCheck()
    if (passwordCheck()) {
      console.log(`Name: ${user.firstName} ${user.lastName} Email: ${user.email} Password: ${user.password}`);
      //Register new user
      registerUser();
    } else {
      alert('Please re-enter the same password!')
    }
    event.preventDefault();
  }
  
  return (
    <Container>
      <h1>Create an Alumni Account</h1>
      
      <Form className='form' onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>First Name:</Form.Label>
          <Form.Control type="text" name="firstName" value={user.firstName} onChange={handleChange}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name:</Form.Label>
          <Form.Control type="text" name="lastName" value={user.lastName} onChange={handleChange}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Graduation Year:</Form.Label>
          <Form.Control type="text" name="graduationYear" value={user.graduationYear} onChange={handleChange}/>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>School Email Address:</Form.Label>
          <Form.Control type="email" name="email" value={user.email} onChange={handleChange}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control type="text" name="password" value={user.password} onChange={handleChange}/>
        </Form.Group>
        <Form.Group>
        <Form.Label>Re-enter Password:</Form.Label>
        <Form.Control type="text" name="passwordCheck" value={user.passwordCheck} onChange={handleChange}/>
      </Form.Group>
        <Button variant="primary" type="submit" value="Submit">Submit</Button>
      </Form>

    
      <h1>Create a Meeting</h1>
      
      <Form className='form'>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Host ID (Alumni Name)</Form.Label>
          <Form.Control type="email" placeholder="John Smith" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Start (Start Time)</Form.Label>
          <Form.Control type="text" placeholder="12:00 AM" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Virtual" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>


    </Container>
  );
}