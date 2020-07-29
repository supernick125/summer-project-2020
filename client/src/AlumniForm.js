import React from 'react';

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
  }

  // getUsers = () => {
  //   fetch('http://localhost:3001/api/user')
  //   .then(response => {
  //     return response.text();
  //   })
  //   .then(data => {
  //     alert(data);
  //   });
  // }
  //
  // registerUser = async () => {
  //   const resp = await fetch(`${BASE_URL}/api/user/register`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(this.state)
  //   });
  //
  //
  //   fetch('http://localhost:3001/api/user/register', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({this.state.firstName, this.state.lastName, this.state.email, this.state.link}),
  //   })
  //   .then(response => {
  //     return response.text();
  //   })
  //   .then(data => {
  //     alert(data);
  //     getStudent();
  //   });
  // }
  //
  // deleteUser = () => {
  //   fetch(`http://localhost:3001/api/user/${id}`, {
  //     method: 'DELETE',
  //   })
  //   .then(response => {
  //     return response.text();
  //   });
  // }

  //Handle input change
  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  //Handle form submit
  handleSubmit = (event) => {
    console.log(`Name: ${this.state.firstName} ${this.state.lastName} Email: ${this.state.email} Username: ${this.state.username} Password: ${this.state.password}`);
    event.preventDefault();

    const data = this.state;
    // fetch('/api/user/register', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // })
    // .then(response => {
    //   return response.text();
    // })
    // .catch(error => {
    //   console.log(error);
    // });
    
    fetch("http://localhost:3001/api/hello", {
      method: 'GET'
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
        console.log(error);
    });

    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: ''
    });
  }

  render() {
    return (
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
    );
  }
}

export default AlumniForm;
