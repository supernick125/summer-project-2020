const pool = require('../db/');
const jwt = require('jsonwebtoken');

//Get user details
const getUserDetails = async (req, res) => {
  try {
    const { email } = req.query;
    const loggedUserId = req.user.id;
    const userDetails = await pool.query(
      'SELECT account.id, school_id, graduation_year, first_name, last_name, email_address, phone_number, hometown, high_school, biography, school, major, major2, minor, primary_industry_interest, secondary_industry_interest, cities_of_interest FROM account, personal_info, academic_info, industry_info WHERE email_address = $1 AND personal_info.account_id = (SELECT id FROM account WHERE email_address = $1) AND academic_info.account_id = (SELECT id FROM account WHERE email_address = $1) AND industry_info.account_id = (SELECT id FROM account WHERE email_address = $1)', [email]
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
      email: userDetails.rows[0].email_address,
      phone_number: userDetails.rows[0].phone_number,
      hometown: userDetails.rows[0].hometown,
      high_school: userDetails.rows[0].high_school,
      biography: userDetails.rows[0].biography,
      school: userDetails.rows[0].school,
      major: userDetails.rows[0].major,
      major2: userDetails.rows[0].major2,
      minor: userDetails.rows[0].minor,
      primary_industry_interest: userDetails.rows[0].primary_industry_interest,
      secondary_industry_interest: userDetails.rows[0].secondary_industry_interest,
      cities_of_interest: userDetails.rows[0].cities_of_interest
    }
    return res.status(200).json({ user: resp });
  }catch(error) {
    console.error(error);
    return res.status(500).json({ message: 'There was an error. Please try again later' });
  }
}

//Update user
const updateUser = async (req, res) => {
  try {
    const {first_name, last_name, email, graduationyear, phone_number, hometown, high_school, biography, school, major, major2, minor, primary_industry_interest, secondary_industry_interest, cities_of_interest} = req.body;
    const userId = req.user.id;
    
    const userInfo = await pool.query('UPDATE account SET graduation_year = $2 WHERE id = $1', [userId, graduationyear]);
    const personalInfo = await pool.query('UPDATE personal_info SET phone_number = $2, hometown = $3, high_school = $4, biography = $5 WHERE account_id = $1', [userId, phone_number, hometown, high_school, biography]);
    const academicInfo = await pool.query('UPDATE academic_info SET school = $2, major = $3, major2 = $4, minor = $5 WHERE account_id = $1', [userId, school, major, major2, minor]);
    const industryInfo = await pool.query('UPDATE industry_info SET primary_industry_interest = $2, secondary_industry_interest = $3, cities_of_interest = $4 WHERE account_id = $1', [userId, primary_industry_interest, secondary_industry_interest, cities_of_interest]);
    
    return res.status(200).json({ message: 'User successfully updated'});
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
    if (usertype === 1) {
      const personal_info = await pool.query(
        'INSERT INTO personal_info (account_id) VALUES ($1)', [user.rows[0].id]
      )
      const academic_info = await pool.query(
        'INSERT INTO academic_info (account_id) VALUES ($1)', [user.rows[0].id]
      )
      const industry_info = await pool.query(
        'INSERT INTO industry_info (account_id) VALUES ($1)', [user.rows[0].id]
      )
      const updates = await pool.query(
        'UPDATE account SET personal_id = (SELECT id FROM personal_info WHERE account_id = $1), academic_id = (SELECT id FROM academic_info WHERE account_id = $1), industry_id = (SELECT id FROM industry_info WHERE account_id = $1) WHERE id = $1', [user.rows[0].id]
      )
    }
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
    console.error(error);
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
