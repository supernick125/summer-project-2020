const {
  getUsers,
  createUser,
  deleteUser,
  getName,
  getEmail,
} = require('../controllers/user');
const router = require('express').Router();

//Get all users
router.get('/get', getUsers);

//Create new user
router.post('/register', createUser);

//Get user information
router.get('/info/name', getName);
router.get('/info/email', getEmail);

//Update information
//ADD LATER

module.exports = router;
