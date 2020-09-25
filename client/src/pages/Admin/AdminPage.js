import React from 'react';
import CreateAlumni from '../../components/CreateAlumni/CreateAlumni';
import CreateMeeting from '../../components/CreateMeeting/CreateMeeting';
import './style.css'

export default () => {
  return (
    <div>
      <CreateAlumni />
      <CreateMeeting />
    </div>
  );
}
