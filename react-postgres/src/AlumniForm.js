import React from 'react';

class AlumniForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      link: "",
    };
  }

  // createStudent() {
  //   ud = {this.state.firstName, this.state.lastName, this.state.email, this.state.link};
  //   fetch("http://localhost:3001/students", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(ud),
  //   })
  //   .then(response => {
  //     return response.text();
  //   })
  //   .then(data => {
  //     alert(data);
  //     getStudent();
  //   });
  // }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
    alert(`Name is: ${this.state.firstName} ${this.state.lastName} Email is: ${this.state.email} Link is: ${this.state.link}`);
    event.preventDefault();
  }

  render() {
    return (
      <form action="" class="m-4" onSubmit={this.handleSubmit}>
        <div class="form-group">
          <label for="firstName">First Name:</label>
          <input type="text" class="form-control" id="firstName" name="firstName" value={this.state.firstName} onChange={this.handleChange}/>
        </div>
        <div class="form-group">
          <label for="lastName">Last Name:</label>
          <input type="text" class="form-control" id="lastName" name="lastName" value={this.state.lastName} onChange={this.handleChange}/>
        </div>
        <div class="form-group">
          <label for="email">Email Address:</label>
          <input type="text" class="form-control" id="email" aria-describedby="emailHelp" name="email" value={this.state.email} onChange={this.handleChange}/>
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="bio">Website / Link / Curriculum Vitae:</label>
          <input type="text" class="form-control" id="bio" name="link" value={this.state.link} onChange={this.handleChange}/>
        </div>
        <button type="submit" class="btn btn-primary countryBlue">Submit</button>
      </form>
    );
  }
}

export default AlumniForm;
