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

// function App() {
//   const [students, setStudents] = useState(false);
//   useEffect(() => {
//     getStudent();
//   }, []);
//   function getStudent() {
//     fetch("http://localhost:3001")
//     .then(response => {
//       return response.text();
//     })
//     .then(data => {
//       setStudents(data);
//     });
//   }
//   function deleteStudent() {
//     let id = prompt("Enter student id");
//     fetch(`http://localhost:3001/students/${id}`, {
//       method: "DELETE",
//     })
//     .then(response => {
//       return response.text();
//     })
//     .then(data => {
//       alert(data);
//       getStudent();
//     });
//   }
//   return (
//     <div>
//       {students ? students: "There is no student data available"}
//       <br />
//       <button onClick={createStudent}>Add student</button>
//       <br />
//       <button onClick={deleteStudent}>Delete student</button>
//     </div>
//   );
// }
