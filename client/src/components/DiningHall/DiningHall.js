import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import { Container, Jumbotron, Form, FormControl, InputGroup, Button } from 'react-bootstrap';
import './style.css';
import MeetingTable from './../MeetingTable/MeetingTable';

export default () => {

  Axios.get('http://localhost:3001/api/meeting/active')
    .then(response => {
      var meetings = JSON.parse(JSON.stringify(response.data));
      ReactDOM.render(<MeetingTable meetings={meetings} />, document.getElementById("meetings"));
    })
    .catch(error => {
      console.error(error);
    });

  return (
    <Container fluid id='container'>
      <Jumbotron fluid id="header">
        <h1 >Welcome to the Columbia University Dining Room!</h1>
        <p>Connect with industry leaders who graduated from YOUR University for a 30-minute lunch conversation!</p>
        <p>We are creating a REST Web service that connects alumni with current college students for meaningful and elucidating lunch discussions. Unlike typical mentor-mentee services, we provide 4 students at a time with a 30 minute discourse with an alumnus, with no further commitments.</p>
      </Jumbotron>
      <div id="meetings" className='h-100'></div>
    </Container>
  );
}
