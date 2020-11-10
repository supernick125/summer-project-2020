import React from 'react';
import './style.css';
import { Container, Row, Col } from 'react-bootstrap';

import MeetingRow from './../MeetingRow/MeetingRow';

export default (props) => {
  const rows = [];

  props.meetings.forEach((meeting) => {
    rows.push(
      <MeetingRow meeting={meeting} />
    );
  });

  return (
    <Container fluid className='p-0'>
      <Row id='table-heading'>
        <Col md={4}>Host</Col>
        <Col md={4}>Description</Col>
        <Col md={4}>Start Time</Col>
        <Col md={4}>Capacity</Col>
      </Row>
      <div>
        {rows}
      </div>
    </Container>
  );
}
