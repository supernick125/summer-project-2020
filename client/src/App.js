import React from 'react';
import DescriptionComp from './DescriptionComp';
import AlumniForm from './AlumniForm';

class App extends React.Component {
  render() {
    return (
        <div class="container-fluid h-100">
          <div class="row h-100">
            <div id="description" class="col-md-7 p-3">
              <DescriptionComp />
            </div>
            <div class="col-md-5 columbiaBlue p-3">
              <AlumniForm />
            </div>
          </div>
        </div>
    );
  }
}

export default App;

//Additions by Gabe starting here:
function App() {
  const [students, setStudents] = useState(false);
  useEffect(() => {
    getAlum();
  }, []);
  function getAlum() {
    fetch("http://localhost:3001")
    .then(response => {
      return response.text();
    })
    .then(data => {
      setStudents(data);
    });
  }
  function createAlum(fName, lName, email, bio) {
    fetch("http://localhost:3001/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({fName, lName, email, bio}),
    })
    .then(response => {
      return response.text();
    });
  }
  function deleteAlum() {
    let id = prompt("Enter student id");
    fetch(`http://localhost:3001/students/${id}`, {
      method: "DELETE",
    })
    .then(response => {
      return response.text();
    });
  }
