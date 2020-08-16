const pool = require('../db/');

//getUsers - return all users
const getUsers = async (req, res) => {
  try {
    const response = await pool.query(
      'SELECT * FROM account ORDER BY id ASC'
    )

    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ message: 'There was an error while searching. Please try again later.'})
  }
}

//createUser - create new user
const createUser = async (req, res) => {
  try {
    const {userType, firstName, lastName, graduationYear, email, password } = req.body
    //check username
    //check email
    //hash password
    const user = await pool.query(
      'INSERT INTO account (account_type_id, school_id, graduation_year, first_name, last_name, email_address, password, registered) VALUES ($1, 1, $2, $3, $4, $5, $6, now()) RETURNING id',
      [userType, graduationYear, firstName, lastName, email, password], (err, result) => {
        if (err) {
          return console.error('Error during query', err.stack)
        }
        //return result.rows[0];
      }
    )

    const response = {
      user: {
        id: user,
        graduationYear: graduationYear,
        firstname: firstName,
        lastname: lastName
      }
    }

    console.log(response);
    //201
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: 'There was an error while registering. Please try again later.' });
  }
}

//deleteUser - delete a user
const deleteUser = async (req, res) => {
  // try {
  //
  //   const user = await pool.query(
  //     'DELETE FROM account WHERE id = $1', [id]
  //   )
  //
  // } catch (error) {
  //   res.status(500).json({ message: 'There was an error while deleting. Please try again later.' });
  // }
}

//getName - return user's name
const getName = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await pool.query(
      'SELECT first_name, last_name FROM account WHERE id = $1', [id]
    )
    if (response.rowCount == 0) return res.status(404).json({ message: 'User not found' });

    const name = {
      first_name: response.rows[0].first_name,
      last_name: response.rows[0].last_name
    }

    return res.status(200).json(name);
  } catch (error) {
    return res.status(500).json({ message: 'There was an error while retrieving name. Please try again later.'});
  }
}

//getEmail - return user's email
const getEmail = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await pool.query(
      'SELECT email_address FROM account WHERE id = $1', [id]
    )
    if (response.rowCount == 0) return res.status(404).json({ message: 'User not found' });

    const email = {
      email_address: response.rows[0].email_address
    }

    res.status(200).json(email);
  } catch (error) {
    res.status(500).json({ message: 'There was an error while retrieving email. Please try again later.'});
  }
}

//Export functions
module.exports = {
  getUsers,
  createUser,
  deleteUser,
  getName,
  getEmail
}
