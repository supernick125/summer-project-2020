import React from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import './style.css'
import axios from 'axios';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: ''
    };
    
    this.getHello = this.getHello.bind(this);
    this.getNewsLetterUsers = this.getNewsLetterUsers.bind(this);
    this.createNewsLetterUsers = this.createNewsLetterUsers.bind(this);
    this.getNewsLetterUsersName = this.getNewsLetterUsersName.bind(this);
    this.getNewsLetterUsersEmail = this.getNewsLetterUsersEmail.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  // Log test message
  getHello = () => {
    axios.get('http://localhost:3001/api/hello')
      .then(response => {
        console.log(response);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  // Log all newsletter users
  getNewsLetterUsers = () => {
    axios.get('http://localhost:3001/api/newsletter/list')
      .then(response => {
        console.log(response);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  // Create and log new newsletter user
  // Error with insertion of user
  createNewsLetterUsers = () => {
    const data = this.state;
    axios.post('http://localhost:3001/api/newsletter/register', data)
      .then(response => {
        console.log(response);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
      
      // reset state
      this.setState({
        firstName: '',
        lastName: '',
        email: ''
      });
  }
  
  // Log newsletter user's first and last name with given id
  getNewsLetterUsersName = () => {
    const id = parseInt(prompt("id: "));
    axios.get(`http://localhost:3001/api/newsletter/info/name/${id}`)
      .then(response => {
        console.log(response);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  getNewsLetterUsersEmail = () => {
    const id = parseInt(prompt("id: "));
    axios.get(`http://localhost:3001/api/newsletter/info/email/${id}`)
      .then(response => {
        console.log(response);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    console.log(`
      First Name: ${this.state.firstName}
      Last Name: ${this.state.lastName}
      Email: ${this.state.email}
    `);
    event.preventDefault();
    this.createNewsLetterUsers();
  }

  render() {
    return (
      <Container fluid className='body'>
        <Form className='form' onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange}/>
          </Form.Group>

          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange}/>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" value={this.state.email} onChange={this.handleChange}/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit" value="Submit">
            Submit
          </Button>
        </Form>

      </Container>
    )
  }
}

export default RegisterForm

// <Button onClick={this.getHello}>Hello</Button>
// <Button onClick={this.getNewsLetterUsers}>List</Button>
// <Button onClick={this.getNewsLetterUsersName}>Name</Button>
// <Button onClick={this.getNewsLetterUsersEmail}>Email</Button>