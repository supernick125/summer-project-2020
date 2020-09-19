import React, {useState} from 'react';
import Axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import RegisterDescription from '../../components/RegisterDescription/RegisterDescription';
import RegisterNavbar from '../../components/RegisterNavbar/RegisterNavbar';
import './style.css';

export default () => {
  
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  
  const getLogin = () => {
    Axios.get('http://localhost:3001/api/user/info/login')
      .then(response => {
        console.log(response);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  //Handle input change
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  }
  
  return (
    <Container fluid className='h-100 body'>
      <RegisterNavbar />
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
