import React, { useState } from 'react'
import Axios from 'axios'
import { Container, Form, Button } from 'react-bootstrap'
import './style.css'

export default () => {

  const [meeting, setMeeting] = useState({
    userType: '2',
    firstName: '',
    lastName: '',
    graduationYear: '',
    email: '',
    password: '',
    passwordCheck: '',
    whichRegister: true,
    host: '',
    start: '',
    virtual: ''
  });

  //host_first, host_last, email, start, (virtual)

  // const emailCheck = function() {
  //   return(user.email.includes('columbia.edu') || user.email.includes('barnard.edu'))
  // }

  const passwordCheck = function () {
    return(user.password === user.passwordCheck)
  }

  const createMeeting = () => {
    Axios.post('http://localhost:3001/api/meeting/register', user)
      .then(response => {
        console.log(response);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });

      // reset state
      this.setState({
        host: '',
        start: '',
        virtual: true
      })
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
    console.log(`Host id: ${user.host} Start: ${user.start} Virtual: ${user.virutal}`);
    createMeeting();
    event.preventDefault();
  }

  return (
    <Container>
      <h1>Create a Meeting</h1>

      <Form className='form'>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Host ID (Alumni Name)</Form.Label>
          <Form.Control type="text" name="host" value={user.host} onChange={handleChange}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Start (Start Time)</Form.Label>
          <Form.Control type="text" name="start" value={user.start} onChange={handleChange}/>
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="text" name="virtual" value={user.virtual} onChange={handleChange}/>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
      </Form>
    </Container>
  );
}
