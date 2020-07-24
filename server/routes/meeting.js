const {
  getMeetings
} = require('../controllers/meeting');
const router = require('express').Router();

//Get all meetings
router.get('/register', getMeetings);

module.exports = router;
