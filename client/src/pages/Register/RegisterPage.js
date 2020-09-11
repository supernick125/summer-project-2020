import React from 'react';
import { Container, Row, Col, Nav, Navbar, Form, FormControl, InputGroup, Button } from 'react-bootstrap';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import RegisterDescription from '../../components/RegisterDescription/RegisterDescription';
import './style.css';

export default () => {
  return (
    <Container fluid className='h-100 body'>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Alumni & Students</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Sign Up</Nav.Link>
            <Nav.Link href="#link">About Us</Nav.Link>
          </Nav>
          <Form inline>
          <Form.Label htmlFor="loginEmail" srOnly>
            Email
          </Form.Label>
          <InputGroup className="mr-sm-2">
            <InputGroup.Prepend>
              <InputGroup.Text>School Email</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl 
              id="loginEmail"
              placeholder="" />
            </InputGroup>
            <Form.Label htmlFor="loginPassword" srOnly>
              Password
            </Form.Label>
            <InputGroup className="mr-sm-2">
              <InputGroup.Prepend>
                <InputGroup.Text>Password</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl 
                id="loginPassword" 
                placeholder="" />
            </InputGroup>
            <Button variant="outline-primary">Login</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Row className='h-100'>
        <Col md={7} className='countryBlue'>
          <RegisterDescription />
        </Col>
        <Col md={5} className='columbiaBlue'>
          <RegisterForm />
        </Col>
      </Row>
    </Container>
  );
}
