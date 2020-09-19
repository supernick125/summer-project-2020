const {
  getUsers,
  createStudentUser,
  createAlumniUser,
  deleteUser,
  getName,
  getEmail,
  getLogin
} = require('../controllers/user');
const router = require('express').Router();

//Get all users
router.get('/list', getUsers);

//Create new user
router.post('/register/student', createStudentUser);
router.post('/register/alumni', createAlumniUser);

//Get user information
router.get('/info/name/:id', getName);
router.get('/info/email/:id', getEmail);
router.get('/info/login', getLogin);

//Update information
//ADD LATER

module.exports = router;
