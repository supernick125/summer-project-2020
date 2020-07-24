const router = require('express').Router();

const users = require('./user');
const meetings = require('./meeting');

router.use('/user', user);
router.use('/meeting', meeting);

//Test for communications
app.get('/hello', (req, res) => {
  res.send({ message: "Hello there!" });
});

module.exports = router;
