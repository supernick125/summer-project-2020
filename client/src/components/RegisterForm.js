import React from 'react'
import { Container, Form, Button } from 'react-bootstrap'

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  }

  render() {
    return (
      <Container fluid className='m-4'>
        <Form onSubmit={this.handleSubmit}>
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

