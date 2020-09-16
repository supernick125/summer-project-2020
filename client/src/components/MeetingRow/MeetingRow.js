import React from 'react';
import './style.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default (props) => {
  const meeting = props.meeting;

  return (

    <Container fluid className='p-0'>
      <Row>
        <Col className='adjust' md={4}>{meeting.hostName}</Col>
        <Col className='adjust' md={4}>Temporary Description</Col>
        <Col className='adjust' md={4}>
          {meeting.startTime}
          <Button id='join' type='submit' size='sm'>
            Join
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
