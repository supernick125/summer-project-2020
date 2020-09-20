import React from 'react';
import { Container, Nav, Navbar, Form, FormControl, InputGroup, Button } from 'react-bootstrap';
import './style.css';
import { Link } from 'react-router-dom';

export default () => {
  return (

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
            <Link to="/home">
              <Button variant="outline-primary">Login</Button>
            </Link>
          </Form>
        </Navbar.Collapse>
      </Navbar>
  );
}
