const router = require('express').Router();

const user = require('./user');
const meeting = require('./meeting');
const auth = require('./auth');

const authUser = require('../services/auth');

router.use('/user', authUser, user);

router.use('/meeting', authUser, meeting);

router.use('/auth', auth);

//Test for communications
router.get('/hello', (req, res) => {
  try {
    return res.status(200).json({ message: 'Hello there!' });
  }catch(error) {
    return res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
