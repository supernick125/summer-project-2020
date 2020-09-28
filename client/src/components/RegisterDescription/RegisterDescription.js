import React from 'react';
import { Container } from 'react-bootstrap';
import './style.css';

export default () => {

  return (
    <Container fluid className='body'>
      <div className='white'>
        <h1 className='heading'>Meet with Columbia Alumni who are Industry Leaders</h1>
        <br></br>
        <div className='heading-list'>
          <h2>1. Sign up with your Columbia Email</h2>
          <h2>2. Browse Conversations with Our Alumni</h2>
        </div>
        <br></br>
      </div>
      <div className='orange'>
        <h2 className='subheading'><i>Our Past Conversations</i></h2>
        <dl className='subheading-list'>
          <dd> Dr. Ricardo Hornos &nbsp; <small className='job-description'> Tony Award-Winning Producer and Screenwriter </small> </dd>
          <dd> Nick LaCava &nbsp; <small className='job-description'> Former Olympian and Delivery Unit Advisor at International Rescue Committee </small> </dd>
          <dd> Basil Hosmer &nbsp;<small className='job-description'> Facebook Software Engineer and Programming Language Inventor </small> </dd>
          <dd> Franklin Hedberg &nbsp;<small className='job-description'> Former Senior Editor for Time Inc. </small> </dd>
          <dd> Clarence Rash &nbsp;<small className='job-description'> Physicist and Former Director of Helmet-Mounted Display Program at USAARL </small> </dd>
        </dl>
      </div>
    </Container>
  );
}