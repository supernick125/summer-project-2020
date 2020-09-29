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
        <h1 >Welcome to the Columbia University Dining Room!</h1>
        <p>Connect with industry leaders who graduated from YOUR University for a 30-minute lunch conversation!</p>
        <p>We are creating a REST Web service that connects alumni with current college students for meaningful and elucidating lunch discussions. Unlike typical mentor-mentee services, we provide 4 students at a time with a 30 minute discourse with an alumnus, with no further commitments.</p>
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
