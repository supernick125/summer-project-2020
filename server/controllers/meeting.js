const pool = require('../db/');

//Create new meeting
const createMeeting = async (req, res) => {
  try {
    const { starttime } = req.body;
    const userId = req.body.hostid || req.user.id;
    const virtual = true;
    const meetingCheck = await pool.query('SELECT id FROM meeting WHERE host_id = $1 AND start = $2 AND virtual = $3', [userId, starttime, virtual]);
    if(meetingCheck.rowCount) {
      return res.status(409).json({ message: 'This meeting has already been created' });
    }
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
    const joinCheck = await pool.query('SELECT account_id FROM account_meeting WHERE account_id = $1 AND meeting_id = $2', [loggedUserId, meetingId]);
    if(joinCheck.rowCount) {
      return res.status(409).json({ message: 'Already attending this meeting' });
    }
    const join = await pool.query('INSERT INTO account_meeting (account_id, meeting_id) VALUES ($1, $2)', [loggedUserId, meetingId]);
    return res.status(200).json({ message: 'Meeting joined successfully' });
  }catch(error) {
    return res.status(500).json({ message: 'There was an error while joining meeting. Please try again later' });
  }
}

//Leave meeting
const leaveMeeting = async (req, res) => {
  const { meetingId } = req.body;
  const loggedUserId = req.user.id;
  try {
    const leaveCheck = await pool.query('SELECT account_id FROM account_meeting WHERE account_id = $1 AND meeting_id = $2', [loggedUserId, meetingId]);//TEMP CHANGE THIS
    if(!leaveCheck.rowCount) {
      return res.status(404).json({ message: 'User not registered for this meeting' });
    }
    const leave = await pool.query('UPDATE account_meeting SET active = false WHERE account_id = $1 AND meeting_id = $2', [loggedUserId, meetingId]);
    return res.status(200).json({ message: 'Left meeting successfully' });
  }catch(error) {
    return res.status(500).json({ message: 'There was an error while leaving meeting. Please try again later' });
  }
}

//Set meeting active to false
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
