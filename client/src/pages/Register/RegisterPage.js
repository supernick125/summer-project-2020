import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import RegisterDescription from '../../components/RegisterDescription/RegisterDescription';
import './style.css';

export default () => {
  return (
    <Container fluid className='h-100 body'>
      <Row className='h-100'>
        <Col md={7} className='countryBlue'>
          <RegisterDescription />
        </Col>
        <Col md={5} className='columbiaBlue'>
          <RegisterForm />
        </Col>
      </Row>
    </Container>
  );
}
