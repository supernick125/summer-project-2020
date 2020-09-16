//Log test message
const getHello = () => {
  Axios.get('http://localhost:3001/api/hello')
    .then(response => {
      console.log(response);
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
}

//Log list of all users
const getUsers = () => {
  Axios.get('http://localhost:3001/api/user/list')
    .then(response => {
      console.log(response);
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
}

//Log user name with given id
const getName = () => {
  const id = parseInt(prompt("id: "));
  Axios.get(`http://localhost:3001/api/user/info/name/${id}`)
    .then(response => {
      console.log(response);
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
}

//Log email of user with given id
const getEmail = () => {
  const id = parseInt(prompt("id: "));
  Axios.get(`http://localhost:3001/api/user/info/email/${id}`)
    .then(response => {
      console.log(response);
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
}
