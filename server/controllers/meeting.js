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
const createMeeting = () => {

}

//deleteMeeting - delete a meeting
const deleteMeeting = () => {

}

//getTime - return time meeting takes place
const getTime = () => {

}

//getLocation - return location of meeting or say its virtual
const getLocation = () => {

}

//getHost - return list of host id
const getHost = () => {

}

//getAttendees - return list of attendee ids
const getAttendees = () => {

}

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
