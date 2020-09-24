import React from 'react';
import { Container } from 'react-bootstrap';
import './style.css';

export default () => {

  return (
    <Container fluid className='body'>
      <div className='white'>
        <h1 className='heading'>Meet with Columbia Alumni who are Industry Leaders</h1>
        <br></br>
        <div classname='heading-list'>
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

// <div>
// <h2 class="columbiaBlueText m-4">Meet with <span class="paleBlueText">engaging talented clever driven curious intelligent receptive</span> students from your Alma Mater.</h2>
// <div class="d-flex flex-column flex-sm-row justify-content-around m-4">
//   <div class="col-md-6 container-fluid rounded mb-0 bubble m-2">
//     <div class="row">
//       <div class="col-sm-8"><strong>Set</strong> a time and date at your convenience.
//       </div>
//       <div class="col-sm-4 d-none d-sm-inline"><h1 class="countryBlueText number"><em>1</em></h1>
//       </div>
//     </div>
//   </div>
//   <div class="col-md-6 container-fluid rounded mb-0 bubble m-2">
//     <div class="row">
//       <div class="col-sm-8"><p><strong>Meet.</strong> Talk to current Columbia students for 30 minutes.</p><p><em>No further obligation.</em></p>
//       </div>
//       <div class="col-sm-4 d-none d-sm-inline"><h1 class="countryBlueText number"><em>2</em></h1>
//       </div>
//     </div>
//   </div>
// </div>

// <h3 class="columbiaBlueText m-4">That's it! We'll take care of scheduling, coordination, and communication.</h3>

// <h1 class="whiteText m-4">We know life is busy, so <br/> We made it easier <em>to connect.</em></h1>

// <h4 class="whiteText m-4 pl-5">- Made by Students, for Students</h4>
// </div>

//---------------------------------------------------------------------------------

// <h2 className="columbiaBlueText m-4">Meet with <span className="paleBlueText">engaging talented clever driven curious intelligent receptive</span> students from your Alma Mater.</h2>

// <Container>
//   <Row>
//     <Col>
//       <Card>
//         <Card.Body>
//           <strong>Set</strong> a time and date at your convenience.
//         </Card.Body>
//       </Card>
//     </Col>
//     <Col>
//       <Card>
//         <Card.Body>
//           <strong>Meet.</strong> Talk to current Columbia students for 30 minutes.<p><em>No further obligation.</em></p>
//         </Card.Body>
//       </Card>
//     </Col>
//   </Row>
// </Container>

// <h3 className="m-4">That's it! We'll take care of scheduling, coordination, and communication.</h3>

// <h1 className="whiteText m-4">We know life is busy, so <br/> We made it easier <em>to connect.</em></h1>

// <h4 className="whiteText m-4 pl-5">- Made by Students, for Students</h4>
