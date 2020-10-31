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

  // Bugs: DO NOT schedule meetings 8PM - 12AM and not January 1 on any year PLEASE

  function isoToEST(isoTimeString) {
    const isoDate = new Date(isoTimeString)
    const hour = isoDate.getUTCHours() - 4
    const minute = ('0' + isoDate.getUTCMinutes()).slice(-2)
    const month = isoDate.toLocaleString('default', { month: 'long' })
    const date = isoDate.getUTCDate()
    const year = isoDate.getUTCFullYear()

    if (hour > 12) {
      let pmHour = hour - 12
      return(`${pmHour}:${minute} PM ${month} ${date}, ${year} EST`)
    } else {
      return(`${hour}:${minute} AM ${month} ${date}, ${year} EST`)
    }
  }

  return (
    <Container fluid className='p-0'>
      <Row>
        <Col className='adjust' md={4}>{meeting.hostName}</Col>
        <Col className='adjust' md={4}>{meeting.description}</Col>
        <Col className='adjust' md={4}>
          {isoToEST(meeting.startTime)}
          <Button id='join' type='submit' size='sm' onClick={joinMeeting}>
          Join
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
