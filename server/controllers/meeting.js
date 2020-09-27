const pool = require('../db/');

//Create new meeting
const createMeeting = async (req, res) => {
  try {
    const { starttime } = req.body;
    const userId = req.user.id;
    const virtual = true;
    const meeting = await pool.query('INSERT INTO meeting (host_id, start, virtual) VALUES ($1, $2, $3) RETURNING id', [userId, starttime, virtual]);
    const resp = {
      id: meeting.rows[0].id,
      hostid: userId,
      starttime: starttime,
      virtual: virtual
    }
    return res.status(200).json({ message: 'Meeting created', meeting: resp });
  }catch(error) {
    return res.status(500).json({ message: 'There was an error while creating meeting. Please try again later' });
  }
}

//Return all active meetings
const getActiveMeetings = async (req, res) => {
  try {
    const meetings = await pool.query(
      'SELECT meeting.id AS id, (a.first_name::text || \' \'::text || a.last_name::text) AS host_name, start AS start_time FROM meeting JOIN account a ON (meeting.host_id = a.id) WHERE meeting.active=true ORDER BY start ASC'
    );
    const resp = [];
    meetings.rows.forEach((obj) => {
      resp.push(
        {
          id: obj.id,
          hostName: obj.host_name,
          startTime: obj.start_time
        }
      );
    });
    res.status(200).json(resp);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'There was an error while searching. Please try again later' })
  }
}

//Join meeting
const joinMeeting = async (req, res) => {
  const { meetingId } = req.body;
  const loggedUserId = req.user.id;
  try {
    const join = await pool.query('INSERT INTO account_meeting (account_id, meeting_id) VALUES ($1, $2)', [loggedUserId, meetingId]);//RETURNING id
    const resp = {
      attendid: 0//CHANGE THIS
    }
    return res.status(300).json({ message: 'Meeting joined', content: resp });
  }catch(error) {
    console.log(error);
    return res.status(500).json({ message: 'There was an error while joining meeting. Please try again later' });
  }
}

//Leave meeting
const leaveMeeting = async (req, res) => {
  const { attendId } = req.body;
  try {
    const leave = await pool.query('UPDATE account_meeting SET active = false WHERE id = $1', [attendId])
  }catch(error) {
    return res.status(500).json({ message: 'There was an error while leaving meeting. Please try again later' });
  }
}

//Delete meeting
const deleteMeeting = async (req, res) => {
  const { meetId } = req.params;
  const loggedUserId = req.user.id;
  try {
    await pool.query('UPDATE meeting SET active = false WHERE id = $1 AND host_id = $2', [meetingId, loggedUserId]);
    return res.status(200).json({ message: 'Meeting deleted successfully' });
  }catch(error) {
    return res.status(500).json({ message: 'There was an error while deleting the meeting. Please try again later' });
  }
}

module.exports = {
  createMeeting,
  getActiveMeetings,
  joinMeeting,
  leaveMeeting,
  deleteMeeting
}
