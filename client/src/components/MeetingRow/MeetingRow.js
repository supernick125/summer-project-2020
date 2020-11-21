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
  //Another bug: the times are shifted an hour later ie: 1pm -> 2pm when displayed

  function isoToEST(isoTimeString) {
    const isoDate = new Date(isoTimeString)
    
    const hour = isoDate.getUTCHours() - 5 /* Change 5 to 4 for Spring Day Light Savings*/
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

  function toTag(str) {  
    var i = str.indexOf('|')  
    var newStr = str.substring(0, i)  
    return newStr
  }
  
  function toDescription(str) {  
    var i = str.indexOf('|')  
    var newStr = str.substring(i+1, str.length)  
    return newStr
  }

  return (
    <Container fluid className='p-0'>
      <Row>
        <Col className='adjust' md={2}><p><b>{meeting.hostName}</b></p></Col>
        <Col className='adjust' md={2}><p id='tag'>{toTag(meeting.description)}</p></Col>
        <Col className='adjust' md={2}>{toDescription(meeting.description)}</Col>
        <Col className='adjust' md={2}>{isoToEST(meeting.startTime)}</Col>
        <Col className='adjust' md={2}>{meeting.capacity}</Col>
        <Col className='adjust' md={2}><Button id='join' type='submit' size='sm' onClick={joinMeeting}>Sign Up</Button></Col>
      </Row>
    </Container>
  );
}
