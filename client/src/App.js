import React from 'react';
import DescriptionComp from './DescriptionComp';
import AlumniForm from './AlumniForm';

class App extends React.Component {
  render() {
    return (
        <div class="container-fluid h-100 mb-0">
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
