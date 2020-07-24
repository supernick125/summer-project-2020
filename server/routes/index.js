const router = require('express').Router();

const user = require('./user');
const meeting = require('./meeting');

router.use('/user', user);
router.use('/meeting', meeting);

//Test for communications
router.get('/hello', (req, res) => {
  res.send({ message: "Hello there!" });
});

module.exports = router;
