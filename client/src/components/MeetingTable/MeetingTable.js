import React, { useState } from 'react';
import './style.css';

import MeetingRow from './../MeetingRow/MeetingRow';

export default (props) => {
  const rows = [];

  props.meetings.forEach((meeting) => {
    rows.push(
      <MeetingRow meeting={meeting} />
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Host</th>
          <th>Description</th>
          <th>Start Time</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
