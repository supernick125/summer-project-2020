import React, { useState } from 'react';
import './style.css';

export default (props) => {
  const meeting = props.meeting;

  return (
    <tr>
      <td>{meeting.hostName}</td>
      <td>Temporary Description</td>
      <td>{meeting.startTime}</td>
    </tr>
  );
}
