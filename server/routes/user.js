const { getUserDetails, updateUser, sendEmail } = require('../controllers/user');
const router = require('express').Router();

//Get user details
router.get('/:username', getUserDetails);

//Update user details
router.post('/update', updateUser);

//Send email
router.post('/email', sendEmail);

module.exports = router;
