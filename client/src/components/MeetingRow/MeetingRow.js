import React from 'react';
import './style.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

import Axios from 'axios';

export default (props) => {
  const meeting = props.meeting;

  const joinMeeting = async (event) => {
    try {
      const resp = await Axios({
        method: 'POST',
        url: '/api/meeting/join',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          meetingId: meeting.id
        }
      });
    }catch(error) {
      console.error(error);
    }
  }

  return (
    <Container fluid className='p-0'>
      <Row>
        <Col className='adjust' md={4}>{meeting.hostName}</Col>
        <Col className='adjust' md={4}>Temporary Description</Col>
        <Col className='adjust' md={4}>
          {meeting.startTime}
          <Button id='join' type='submit' size='sm' onClick={joinMeeting}>
          Join
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
