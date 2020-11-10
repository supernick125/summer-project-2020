import React, { useState } from 'react';
import Axios from 'axios';
import { Container, Form, Button, FormGroup } from 'react-bootstrap';
import './style.css';

export default () => {

  const [meeting, setMeeting] = useState({
    hostid: 1,
    capacity: 5,
    starttime: '2020-1-1 12:00:00',
    description: 'Description'
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
        hostid: 1,
        capacity: 5,
        starttime: '2020-1-1 12:00:00',
        description: 'Description'
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
          <Form.Label>Host ID</Form.Label>
          <Form.Control
            type="text"
            name="hostid"
            value={meeting.hostid}
            onChange={updateMeeting}
            required/>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Capacity</Form.Label>
          <Form.Control
            type="text"
            name="capacity"
            value={meeting.capacity}
            onChange={updateMeeting}
            required/>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Start (Start Time)</Form.Label>
          <Form.Control
            type="text"
            name="starttime"
            value={meeting.starttime}
            onChange={updateMeeting}
            required/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Alumni Description</Form.Label>
          <Form.Control
            as="textarea"
            row="5"
            cols="30"
            name="description"
            value={meeting.description}
            onChange={updateMeeting}
            required/>
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </Container>
  );
}
