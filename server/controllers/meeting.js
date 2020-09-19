const pool = require('../db/');

//getActiveMeetings - return all active meetings
const getActiveMeetings = async (req, res) => {
  try {
    const meetings = await pool.query(
      "SELECT meeting.id AS id, (a.first_name::text || ' '::text || a.last_name::text) AS host_name, start AS start_time FROM meeting JOIN account a ON (meeting.host_id = a.id) WHERE meeting.active=true ORDER BY start ASC"
    );
    const response = [];
    meetings.rows.forEach((obj) => {
      response.push(
        {
          id: obj.id,
          hostName: obj.host_name,
          startTime: obj.start_time
        }
      );
    });
    //console.log(response);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'There was an error while searching. Please try again later.'})
  }
}

//getMeetings - return all meetings
const getMeetings = async (req, res) => {
  try {
    const meetings = await pool.query(
      'SELECT * FROM meeting ORDER BY id ASC'
    )
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ message: 'There was an error while searching. Please try again later.'})
  }
}

//FUNCTIONS TO ADD

//createMeeting - create new meeting
//so far only works when virtual is true. I was thinking that maybe when virtual is false, we can input another insert statement for when virtual = false, insert address_id.
const createMeeting = async (req, res) => {
  try {
    const { host, start, virtual} = req.body;

    const meeting = await pool.query(
      'INSERT INTO meeting (host_id, start, virtual) VALUES ($1, $2, $3) RETURNING id',
      [ host, start, virtual ], (err, result) => {
        if (err) {
          return console.error('Error during query', err.stack)
        }
      }
    )

    const response = {
      meeting: {
        host: host,
        start: start,
        virtual: virtual
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
      'DELETE FROM meeting WHERE id = $1', [id]
    )

  } catch (error) {
    res.status(500).json({message: 'There is an error deleting the meeting. Please try again later.'})
  }
}

//getTime - return time meeting takes place
const getTime = async (req, res) => {
  try {
    const meetings = await pool.query(
      'SELECT start FROM meeting WHERE id = $1', [id]
    )
    if (response.rowCount == 0) return res.status(404).json({ message: 'User not found' });

    const meeting_time = {
      time: response.rows[0].start
    }
    res.status(200).json(meeting_time);
  } catch (error) {
    res.status(500).json({message: 'There is an error retrieving the meeting time. Please try again later.'})
  }
}

//getLocation - return location of meeting or say its virtual
//only got the function to work when virtual is false and gives a location. Not sure how to do the other way around, or what to output.
const getLocation = async (req, res) => {
  try {
    const meeting = await pool.query(
      'SELECT address_id FROM meeting WHERE id = $1 and virtual = false', [id]
    )
    if (response.rowCount == 0) return res.status(404).json({ message: 'User not found' });

    const location = {
      location: response.rows[0].address_id
    }
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({message: 'There is an error retrieving the location. Please try again later.'})
  }
}

//getHost - return list of host id
const getHost = async (req, res) => {
  try {
    const meeting = await pool.query(
      'SELECT host_id FROM meeting WHERE active = true ORDER BY id ASC'
    )
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({message:'There was an error while searching. Please try again later.'})
  }
}

//getAttendees - return list of attendee ids
const getAttendees = async (req, res) => {
  try {
    const meeting = await pool.query(
      'SELECT account_id FROM account_meeting WHERE meeting_id = $1 ORDER BY id ASC', [id]
    )
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({message:'There was an error while searching. Please try again later.'})
  }
}

//Export functions
module.exports = {
  getActiveMeetings,
  getMeetings,
  createMeeting,
  deleteMeeting,
  getTime,
  getLocation,
  getHost,
  getAttendees
}
