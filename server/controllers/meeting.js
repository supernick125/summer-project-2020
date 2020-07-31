const pool = require('../db/');

//getMeetings - return all meetings
const getMeetings = async (req, res) => {
  try {
    const meetings = await pool.query(
      'SELECT * FROM meetings ORDER BY id ASC'
    )
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ message: 'There was an error while searching. Please try again later.'})
  }
}

//FUNCTIONS TO ADD

//createMeeting - create new meeting
const createMeeting = async (req, res) => {
  try {
    const { host, scheduledTime, virtual, location, attendeeNum } = req.body;
    
    const meetings = await pool.query(
      'INSERT INTO meetings (host_id, schedule_dt, created_dt, is_virtual, location_id, attendee_num) VALUES ($1, $2, now(), $3, $4, $5) RETURNING id',
      [ host, scheduledTime, createdTime, virtual, location, attendeeNum ], (err, result) => {
        if (err) {
          return console.error('Error during query', err.stack)
        }
      }
    )
    
    const response = {
      meetings: {
        id: meetings,
        host_id: host,
        schedule_dt: scheduledTime,
        is_virtual: virtual,
        location_id: location,
        attendee_num: attendeeNum
      }
    }
    
    console.log(response);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: 'There was an error creating the meeting. Please try again later.'})
  }
}

//deleteMeeting - delete a meeting
const deleteMeeting = async (req, res) => {
  try {
    const meetings = await pool.query(
      'DELETE FROM meetings WHERE id = $1', [id];
    )
    
  } catch (error) {
    res.status(500).json({message: 'There is an error deleting the meeting. Please try again later.'})
  }
}

//getTime - return time meeting takes place
const getTime = async (req, res) => {
  try {
    const meetings = await pool.query(
      'SELECT schedule_dt FROM meetings WHERE id = $1', [id];
    )
    if (response.rowCount == 0) return res.status(404).json({ message: 'User not found' });
    
    const meeting_time = {
      time: response.rows[0].register_dt
    }
    res.status(200).json(meeting_time);
  } catch (error) {
    res.status(500).json({message: 'There is an error retrieving the meeting time. Please try again later.'})
  }
}

//getLocation - return location of meeting or say its virtual
const getLocation = async (req, res) => {
  // try {
  //   const meetings = await pool.query(
  //     'SELECT location_id FROM meetings WHERE id = $1', [id];
  //   )
  //   if (response.rowCount == 0) return res.status(404).json({ message: 'User not found' });
  // 
  //   const location = {
  //     location: response.rows[0].location_id
  //   }
  //   res.status(200).json(location);
  // } catch (error) {
  //   res.status(500).json({message: 'There is an error retrieving the location. Please try again later.'})
  // }
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
