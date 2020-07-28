const {
  getMeetings,
  createMeeting,
  deleteMeeting,
  getTime,
  getLocation,
  getHost,
  getAttendees
} = require('../controllers/meeting');
const router = require('express').Router();

//Get all meetings
router.get('/get', getMeetings);

//Create new meeting
router.post('/register', createMeeting);

//Get meeting information
router.get('/info/time', getTime);
router.get('/info/location', getLocation);

//Host info
//Get host id
router.get('/info/host/id', getHost);

//Attendee info
//Get list of attendees id
router.get('/info/attendees/id', getAttendees);

module.exports = router;
