const {
  getNewsLetterUsers,
  createNewsLetterUsers,
  deleteNewsLetterUsers,
  getNewsLetterUsersName,
  getNewsLetterUsersEmail
} = require('../controllers/newsletter');
const router = require('express').Router();

//Get all users 
router.get('/list', getNewsLetterUsers);

//Create new user
router.post('/register', createNewsLetterUsers);

//Get user information
router.get('/info/name/:id', getNewsLetterUsersName);
router.get('/info/email/:id', getNewsLetterUsersEmail);

module.exports = router;