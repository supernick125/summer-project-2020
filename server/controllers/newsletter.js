const pool = require('../db/');

//getNewsLetterUsers - return all users
const getNewsLetterUsers = async (req, res) => {
  try {
    const response = await pool.query(
      'SELECT * FROM newsletter_account ORDER BY id ASC'
    )

    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ message: 'There was an error while searching. Please try again later.'})
  }
}

//createNewsLetterUsers - create new user
const createNewsLetterUsers = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body
    //check username
    //check email
    //hash password
    const user = await pool.query(
      'INSERT INTO newsletter_account (account_type_id, school_id, first_name, last_name, email_address) VALUES (1, 1, $1, $2, $3) RETURNING id',
      [firstName, lastName, email], (err, result) => {
        if (err) {
          return console.error('Error during query', err.stack)
        }
        //return result.rows[0];
      }
    )

    const response = {
      user: {
        id: user,
        firstname: firstName,
        lastname: lastName,
        email: email
      }
    }

    console.log(response);
    //201
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: 'There was an error while registering. Please try again later.' });
  }
}

//deleteNewsLetterUsers - delete a user
const deleteNewsLetterUsers = async (req, res) => {
  // try {
  //
  //   const user = await pool.query(
  //     'DELETE FROM newsletter_account WHERE id = $1', [id]
  //   )
  //
  // } catch (error) {
  //   res.status(500).json({ message: 'There was an error while deleting. Please try again later.' });
  // }
}

//getNewsLetterUsersName - return user's name
const getNewsLetterUsersName = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await pool.query(
      'SELECT first_name, last_name FROM newsletter_account WHERE id = $1', [id]
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

//getNewsLetterUsersEmail - return user's email
const getNewsLetterUsersEmail = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await pool.query(
      'SELECT email_address FROM newsletter_account WHERE id = $1', [id]
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
  getNewsLetterUsers,
  createNewsLetterUsers,
  deleteNewsLetterUsers,
  getNewsLetterUsersName,
  getNewsLetterUsersEmail
}