import React, { Fragment } from 'react';
import axios from 'axios';

//const AlumniForm = () =>
class AlumniForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userType: '',
      firstName: '',
      lastName: '',
      graduationYear: '',
      email: '',
      password: ''
    };
    this.getHello = this.getHello.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.createUser = this.createUser.bind(this);
    this.getName = this.getName.bind(this);
    this.getEmail = this.getEmail.bind(this);
  }

  //Log test message
  getHello = () => {
    axios.get('http://localhost:3001/api/hello')
      .then(response => {
        console.log(response);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  //Log list of all users
  getUsers = () => {
    axios.get('http://localhost:3001/api/user/list')
      .then(response => {
        console.log(response);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  //Create new user
  createUser = () => {
    const data = this.state;
    axios.post('http://localhost:3001/api/user/register', data)
      .then(response => {
        console.log(response);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
      //reset state
      this.setState({
        userType: '',
        firstName: '',
        lastName: '',
        graduationYear: '',
        email: '',
        password: ''
      });
  }

  //Log user name with given id
  getName = () => {
    const id = parseInt(prompt("id: "));
    axios.get(`http://localhost:3001/api/user/info/name/${id}`)
      .then(response => {
        console.log(response);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  getEmail = () => {
    const id = parseInt(prompt("id: "));
    axios.get(`http://localhost:3001/api/user/info/email/${id}`)
      .then(response => {
        console.log(response);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  //Set students
  setStudent = () => {
    this.setState({
      userType: '1'
    }, () => console.log(this.state.userType))
  }
  
  //Set alumni
  setAlumni = () => {
    this.setState({
      userType: '2'
    }, () => console.log(this.state.userType))
  }

  //Handle input change
  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  //Handle form submit
  handleSubmit = (event) => {
    console.log(`Name: ${this.state.firstName} ${this.state.lastName} Email: ${this.state.email} Password: ${this.state.password}`);
    event.preventDefault();

    this.createUser();
    // this.getName();
    //this.getHello();
  }
  

  render() {
    return (
      <Fragment>
        <form action='' class='m-4' onSubmit={this.handleSubmit}>
          <div class='form-group'>
            <label for='userType'>Are you a student or alumni:</label>
            <button as="input" type="button" onClick={this.setStudent}>Student</button>
            <button as="input" type="button" onClick={this.setAlumni}>Alumni</button>
          </div>
          <div class='form-group'>
            <label for='firstName'>First Name:</label>
            <input type='text' class='form-control' id='firstName' name='firstName' value={this.state.firstName} onChange={this.handleChange}/>
          </div>
          <div class='form-group'>
            <label for='lastName'>Last Name:</label>
            <input type='text' class='form-control' id='lastName' name='lastName' value={this.state.lastName} onChange={this.handleChange}/>
          </div>
          <div class='form-group'>
            <label for='graduationYear'>Graduation Year:</label>
            <input type='text' class='form-control' id='graduationYear' name='graduationYear' value={this.state.graduationYear} onChange={this.handleChange}/>
          </div>
          <div class='form-group'>
            <label for='email'>Email Address:</label>
            <input type='text' class='form-control' id='email' aria-describedby='emailHelp' name='email' value={this.state.email} onChange={this.handleChange}/>
            <small id='emailHelp' class='form-text text-muted'>We'll never share your email with anyone else.</small>
          </div>
          <div class='form-group'>
            <label for='bio'>Password:</label>
            <input type='text' class='form-control' id='password' name='password' value={this.state.password} onChange={this.handleChange}/>
          </div>
          <button type='submit' class='btn btn-primary countryBlue'>Submit</button>
        </form>
        <button onClick={this.getUsers}>list</button>
        <button onClick={this.getHello}>hello</button>
        <button onClick={this.getName}>name</button>
        <button onClick={this.getEmail}>email</button>
      </Fragment>
    );
  }
}

export default AlumniForm;
