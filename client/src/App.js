import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterPage from './pages/Register/RegisterPage';
import HomePage from './pages/Home';

export default (props) => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={RegisterPage} />
          <Route path="/home" component={HomePage} />
          <Route path='*'>
            <h1>Not Found</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

// class App extends React.Component {
//   render() {
//     return (
//         <div class="container-fluid h-100 mb-0">
//           <div class="row h-100">
//             <div id="description" class="col-md-7 p-3">
//               <DescriptionComp />
//             </div>
//             <div class="col-md-5 columbiaBlue p-3">
//               <AlumniForm />
//             </div>
//           </div>
//         </div>
//     );
//   }
// }
