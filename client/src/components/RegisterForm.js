import React from 'react'
import { Form, Button } from 'react-bootstrap'

class RegisterForm extends React.Component {
  state = { firstName: '', lastName: '', email: '' }

  render() {
    return (
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="John" />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Smith" />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
  
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Someone write a Terms and Conditions" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    )
  }
}

export default RegisterForm