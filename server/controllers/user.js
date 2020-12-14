const pool = require('../db/');
const jwt = require('jsonwebtoken');

//Get user details
const getUserDetails = async (req, res) => {
  try {
    const { email } = req.query;
    const loggedUserId = req.user.id;
    const userDetails = await pool.query(
      'SELECT id, school_id, graduation_year, first_name, last_name, email_address FROM account WHERE email_address = $1', [email]
    );
    if(userDetails.rowCount == 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    const resp = {
      id: userDetails.rows[0].id,
      schoolid: userDetails.rows[0].school_id,
      graduationyear: userDetails.rows[0].graduation_year,
      firstname: userDetails.rows[0].first_name,
      lastname: userDetails.rows[0].last_name,
      email: userDetails.rows[0].email_address
    }
    return res.status(200).json({ user: resp });
  }catch(error) {
    return res.status(500).json({ message: 'There was an error. Please try again later' });
  }
}

//Update user
const updateUser = async (req, res) => {
  const updatedData = req.body;
  const loggedUserId = req.user.id;

  try {

  }catch(error) {
    return res.status(500).json({ message: 'There was an error. Please try again later' });
  }
}

//Register new user
const registerUser = async (req, res) => {
  const { usertype, graduationyear, firstname, lastname, email, password, passwordCheck } = req.body;
  try {
    //Check password matching
    if(password !== passwordCheck) {
      return res.status(401).json({ message: 'Passwords do not match. Please try again.' });
    }
    //Check email suffix
    const emailSuffix = email.split("@")[1].split(".")[0]; //Gets email suffix only
    const checkSuffix = await pool.query('SELECT email_suffix = $1 as suffix_check FROM school WHERE id = 1', [emailSuffix]);
    if(!checkSuffix.rows[0].suffix_check) {
      return res.status(401).json({ message: 'Email does not match a partnered school. Please contact your school\'s alumni office for help.' });
    }
    //Check email
    const checkEmail = await pool.query('SELECT id FROM account WHERE email_address = $1', [email]);
    if(checkEmail.rowCount > 0) {
      return res.status(409).json({ message: 'There is already an account with this email. Please try again with a different email address.' });
    }
    const user = await pool.query(
      'INSERT INTO account (account_type_id, school_id, graduation_year, first_name, last_name, email_address, password) VALUES ($1, $2, $3, $4, $5, $6, crypt($7, gen_salt(\'bf\'))) RETURNING id',
      [usertype, 1, graduationyear, firstname, lastname, email, password]
    )
    const resp = {
      accessToken: '',
      user: {
        id: user.rows[0].id,
        firstname: firstname,
        lastname: lastname
      }
    }
    resp.accessToken = jwt.sign({ user: user.rows[0].id }, process.env.JWT_PRIVATE, {
      expiresIn: '3 days'
    });
    return res.status(200).json(resp);
  }catch(error) {
    return res.status(500).json({ message: 'There was an error while registering. Please try again later' });
  }
}

//Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query('SELECT id, first_name, last_name FROM account WHERE email_address = $1', [email]);
    if(!user.rowCount) {
      return res.status(404).json({ message: 'User not found. Please register and try again' });
    }
    const checkPassword = await pool.query('SELECT password = crypt($1, password) as password_check FROM account WHERE email_address = $2', [password, email]);
    if(!checkPassword.rows[0].password_check) {
      return res.status(401).json({ message: 'Email and password do not match. Please try again later' });
    }
    const resp = {
      accessToken: '',
      user: {
        id: user.rows[0].id,
        firstname: user.rows[0].first_name,
        lastname: user.rows[0].last_name,
        email: email
      }
    }
    resp.accessToken = jwt.sign({ user: user.rows[0].id }, process.env.JWT_PRIVATE, {
      expiresIn: '3 days'
    });
    return res.status(200).json(resp);
  }catch(error) {
    return res.status(500).json({ message: 'There was an error while logging in. Please try again later', error: error });
  }
}

//Check user
const checkUser = async (req, res) => {
  try {
    const user = await pool.query('SELECT id, first_name, last_name, email_address FROM account WHERE id = $1', [req.user.id]);
    if(!user.rowCount) {
      return res.status(404).json({ message: 'User not found' });
    }
    const resp = {
      user: {
        id: user.rows[0].id,
        firstname: user.rows[0].first_name,
        lastname: user.rows[0].last_name,
        email: user.rows[0].email_address
      }
    }
    return res.status(200).json(resp);
  }catch(error) {
    return res.status(500).json({ message: 'There was an error. Please try again later' });
  }
}

//Export functions
module.exports = {
  getUserDetails,
  updateUser,
  registerUser,
  loginUser,
  checkUser
}
