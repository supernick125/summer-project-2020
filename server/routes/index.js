const router = require('express').Router();

const user = require('./user');
const meeting = require('./meeting');
const newsletter = require('./newsletter');

router.use('/user', user);
router.use('/meeting', meeting);
router.use('/newsletter', newsletter);

//Test for communications
router.get('/hello', (req, res) => {
  try {
    res.json('Hello there!');
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
