import React, { useState } from 'react';
import Axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import './style.css';

export default () => {

  const [meeting, setMeeting] = useState({
    hostid: 0,
    starttime: ''
  });

  const updateMeeting = (event) => {
    setMeeting({ ...meeting, [event.target.name]: event.target.value });
  }

  const createMeeting = async (event) => {
    event.preventDefault();
    try {
      const resp = await Axios({
        method: 'POST',
        url: '/api/meeting',
        headers: {
          'Content-Type': 'application/json'
        },
        data: meeting
      });
      setMeeting({
        hostid: '',
        starttime: ''
      })
    }catch(error) {
      console.error('Error creating meeting');
    }
  }

  return (
    <Container>
      <h1>Create a Meeting</h1>
      <Form className='form' onSubmit={createMeeting}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Host ID (Alumni Name)</Form.Label>
          <Form.Control type="text" name="hostid" value={meeting.hostid} onChange={updateMeeting} required/>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Start (Start Time)</Form.Label>
          <Form.Control type="text" name="starttime" value={meeting.starttime} onChange={updateMeeting} required/>
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </Container>
  );
}
