import React, { useState, useContext } from 'react';
import Axios from 'axios';
import Title from '../svgs/Title';
import { Redirect, Link } from 'react-router-dom';

import { Container, Nav, Navbar, Form, FormControl, Col , InputGroup, Button } from 'react-bootstrap';
import './style.css';

import { Context as AuthContext } from '../../context/Auth';

export default () => {

  const { authUser, setAuthUser } = useContext(AuthContext);

  const logoutUser = (event) => {
    event.preventDefault();
    document.cookie = 'x-auth-token= ; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    delete Axios.defaults.headers.common['x-auth-token'];
    setAuthUser({
      action: 'LOGOUT_USER',
      payload: null
    });
    window.location.reload();
  }

  const name = authUser.user.firstname + ' ' + authUser.user.lastname;

  //test function to send email
  const sendEmail = async (event) => {
    event.preventDefault();
    try {
      const resp = await Axios({
        method: 'POST',
        url: '/api/user/email',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          subject: 'Confirm your email',
          text: 'Confirmation code: 12345'
        }
      });
    }catch(error) {
      console.error(error);
    }
  }

  return (
    <Navbar className="bar" bg="light" expand="lg">
      <Title className='svg'/>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form inline className=" ml-auto mr-sm-2">
          <p>{name}</p>
          <i className="fas fa-user-circle fa-2x" id="user-icon"></i>
          <Button variant="primary" type="submit" id="logout-button" onClick={logoutUser}>
            Log Out
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}
