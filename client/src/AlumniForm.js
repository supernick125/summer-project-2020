// hello
import React, { Fragment } from 'react';
import axios from 'axios';

//const AlumniForm = () =>
class AlumniForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: ''
    };
    this.getHello = this.getHello.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.createUser = this.createUser.bind(this);
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
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: ''
      });
  }

  //Handle input change
  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  //Handle form submit
  handleSubmit = (event) => {
    console.log(`Name: ${this.state.firstName} ${this.state.lastName} Email: ${this.state.email} Username: ${this.state.username} Password: ${this.state.password}`);
    event.preventDefault();

    this.createUser();
    //this.getHello();
  }

  render() {
    return (
      <Fragment>
        <form action='' class='m-4' onSubmit={this.handleSubmit}>
          <div class='form-group'>
            <label for='firstName'>First Name:</label>
            <input type='text' class='form-control' id='firstName' name='firstName' value={this.state.firstName} onChange={this.handleChange}/>
          </div>
          <div class='form-group'>
            <label for='lastName'>Last Name:</label>
            <input type='text' class='form-control' id='lastName' name='lastName' value={this.state.lastName} onChange={this.handleChange}/>
          </div>
          <div class='form-group'>
            <label for='email'>Email Address:</label>
            <input type='text' class='form-control' id='email' aria-describedby='emailHelp' name='email' value={this.state.email} onChange={this.handleChange}/>
            <small id='emailHelp' class='form-text text-muted'>We'll never share your email with anyone else.</small>
          </div>
          <div class='form-group'>
            <label for='bio'>Username:</label>
            <input type='text' class='form-control' id='username' name='username' value={this.state.username} onChange={this.handleChange}/>
          </div>
          <div class='form-group'>
            <label for='bio'>Password:</label>
            <input type='text' class='form-control' id='password' name='password' value={this.state.password} onChange={this.handleChange}/>
          </div>
          <button type='submit' class='btn btn-primary countryBlue'>Submit</button>
        </form>
        <button onClick={this.getUsers}>list</button>
        <button onClick={this.getHello}>hello</button>
      </Fragment>
    );
  }
}

export default AlumniForm;
