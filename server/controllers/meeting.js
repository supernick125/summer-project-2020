const pool = require('../db/');

//getMeetings - return all meetings
const getMeetings = async (req, res) => {
  try {
    const meetings = await pool.query(
      'SELECT * FROM MEETINGS ORDER BY meeting_id ASC'
    )
  } catch (error) {
    return res.status(500).json({ message: 'There was an error while searching. Please try again later.'})
  }
}

//FUNCTIONS TO ADD

//createMeeting - create new meeting

//deleteMeeting - delete a meeting

//getTime - return time meeting takes place

//getLocation - return location of meeting or say its virtual

//getHost - return list of host id

//getAttendees - return list of attendee ids

//Export functions
module.exports = {
  getMeetings,
  createMeeting,
  deleteMeeting,
  getTime,
  getLocation,
  getHost,
  getAttendees
}
