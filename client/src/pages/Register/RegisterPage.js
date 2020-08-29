import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import RegisterForm from '../../components/RegisterForm/RegisterForm'
import RegisterDescription from '../../components/RegisterDescription/RegisterDescription'
import './style.css'

class RegisterPage extends React.Component {
  render() {
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
    )
  }
}

export default RegisterPage

// import Axios from 'axios';

// export default () => {

//   const [user, setUser] = React.useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     username: '',
//     password: ''
//   })

//   //Log test message
//   const getHello = () => {
//     Axios.get('http://localhost:3001/api/hello')
//       .then(response => {
//         console.log(response);
//         console.log(response.data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }

//   //Log list of all users
//   const getUsers = () => {
//     Axios.get('http://localhost:3001/api/user/list')
//       .then(response => {
//         console.log(response);
//         console.log(response.data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }

//   //Log user name with given id
//   const getName = () => {
//     const id = parseInt(prompt("id: "));
//     Axios.get(`http://localhost:3001/api/user/info/name/${id}`)
//       .then(response => {
//         console.log(response);
//         console.log(response.data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }

//   //Log email of user with given id
//   const getEmail = () => {
//     const id = parseInt(prompt("id: "));
//     Axios.get(`http://localhost:3001/api/user/info/email/${id}`)
//       .then(response => {
//         console.log(response);
//         console.log(response.data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }

//   //Handle input change
//   const handleChange = (event) => {
//     setUser({ ...user, [event.target.name]: event.target.value });
//   }

//   //Handle form submit
//   const handleSubmit = (event) => {
//     console.log(`Name: ${user.firstName} ${user.lastName} Email: ${user.email} Username: ${user.username} Password: ${user.password}`);
//     event.preventDefault();
//     //Register new user

//     // Axios.post('http://localhost:3001/api/user/register', user)
//     //   .then(response => {
//     //     console.log(response);
//     //     console.log(response.data);
//     //   })
//     //   .catch(error => {
//     //     console.error(error);
//     //   });
//     //   //reset state
//     //   this.setState({
//     //     firstName: '',
//     //     lastName: '',
//     //     email: '',
//     //     username: '',
//     //     password: ''
//     //   });
//   }

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div className=''>
//           <label>First Name</label>
//           <input type='text' name='firstName' value={user.firstName} onChange={handleChange} required />
//         </div>
//         <div className=''>
//           <label>Last Name</label>
//           <input type='text' name='lastName' value={user.lastName} onChange={handleChange} required />
//         </div>
//         <div className=''>
//           <label>Email Address</label>
//           <input type='text' name='email' value={user.email} onChange={handleChange} required />
//         </div>
//         <div className=''>
//           <label>Username</label>
//           <input type='text' name='username' value={user.username} onChange={handleChange} required />
//         </div>
//         <div className=''>
//           <label>Password</label>
//           <input type='text' name='password' value={user.password} onChange={handleChange} required />
//         </div>
//         <button type='submit'>Submit</button>
//       </form>
//       <button onClick={getUsers}>list</button>
//       <button onClick={getHello}>hello</button>
//       <button onClick={getName}>name</button>
//       <button onClick={getEmail}>email</button>
//     </div>
//   );
// }