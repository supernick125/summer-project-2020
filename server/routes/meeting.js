const {
  createMeeting,
  getActiveMeetings,
  joinMeeting,
  leaveMeeting,
  deleteMeeting
} = require('../controllers/meeting');
const router = require('express').Router();

//Create new meeting
router.post('/', createMeeting);

//Get all active meetings
router.get('/active', getActiveMeetings);

//Join meeting
router.post('/join', joinMeeting);

//Leave meeting
router.delete('/leave', leaveMeeting);

//Delete meeting
router.delete('/:meetingId', deleteMeeting);

module.exports = router;
