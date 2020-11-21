import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import { Container, Jumbotron, Form, FormControl, InputGroup, Button } from 'react-bootstrap';
import './style.css';
import MeetingTable from './../MeetingTable/MeetingTable';

export default () => {

  const [meetings, setMeetings] = useState({});

  const [currentId, setCurrentId] = useState(0);

  const [loadMore, setLoadMore] = useState(true);

  useEffect(() => {
    const getMeetings = async () => {
      try {
        const resp = await Axios({
          method: 'GET',
          url: '/api/meeting/active',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if(!resp.data.length) {
          return setLoadMore(false);
        }
        setMeetings(resp.data);
      }catch(error) {
        console.error(error);
      }
    }
    getMeetings();
  }, [currentId]);

  return (
    <Container fluid id='container'>
      <Jumbotron fluid id="header">
        <h1>Connect with our Alumni Hosts</h1>
        <h4>Ask these accomplished Columbia alumni for professional insights, career advice, or general information. They are ready to help and connect with you.</h4>
      </Jumbotron>
      <div id="meetings" className='h-100'>
        {!meetings.length ? (
          <p>No meetings to show</p>
        ) : (
          <MeetingTable meetings={meetings} />
        )}
      </div>
    </Container>
  );
}
