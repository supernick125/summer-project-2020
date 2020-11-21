const { registerUser, loginUser, checkUser } = require('../controllers/user');
const router = require('express').Router();
const authUser = require('../services/auth');

//Register user
router.post('/register', registerUser);

//Login user
router.post('/login', loginUser);

//Check logged in and get details
router.get('/check', authUser, checkUser);

module.exports = router;
