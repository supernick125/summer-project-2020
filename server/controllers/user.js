const pool = require('../db/');

//getUsers - return all users
const getUsers = async (req, res) => {
  try {
    const response = await pool.query(
      'SELECT * FROM account ORDER BY id ASC'
    )

    res.status(200).json({ data: response});
  } catch (error) {
    res.status(500).json({ message: 'There was an error while searching. Please try again later.'})
  }
}

//createUser - create new user
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, username, password } = req.body
    //check username
    //check email
    //hash password
    const user = await pool.query(
      'INSERT INTO account (first_name, last_name, email_address, username, password, registered) VALUES ($1, $2, $3, $4, $5, now()) RETURNING id',
      [firstName, lastName, email, username, password], (err, result) => {
        if (err) {
          return console.error('Error during query', err.stack)
        }
        //return result.rows[0];
      }
    )

    const response = {
      user: {
        id: user,
        username: username,
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
  try {

    const user = await pool.query(
      'DELETE FROM account WHERE student_id = $1', [id]
    )

  } catch (error) {
    res.status(500).json({ message: 'There was an error while deleting. Please try again later.' });
  }
}

//FUNCTIONS TO ADD

//getName - return user's name
const getName = async (req, res) => {
  try {
    const response = await pool.query(
      'SELECT NAME FROM account WHERE student_id = $1', [id]
    )
  } catch (error) {
    res.status(500).json({message: 'There was an error while retrieving name. Please try again later.'});
  }
}

//getEmail - return user's email
getEmail = () => {

}

//Export functions
module.exports = {
  getUsers,
  createUser,
  deleteUser,
  getName,
  getEmail
}



//OLD FUNCTIONS MIGHT BE USEFUL:

// const getStudents = () => {
//   return new Promise(function(resolve, reject) {
//     pool.query("SELECT * FROM students ORDER BY id ASC", (error, results) => {
//       if (error) {
//         reject(error)
//       }
//       resolve(results.rows);
//     })
//   })
// }
//
// const createStudent = (body) => {
//   return new Promise(function(resolve, reject) {
//     const { name, email } = body
//     pool.query(`INSERT INTO students (name, email) VALUES ($1, $2) RETURNING *`, [name, email], (error, results) => {
//       if (error) {
//         reject(error)
//       }
//       resolve(`A new student has been added: ${results.rows[0]}`)
//     })
//   })
// }
//
// const deleteStudent = (id) => {
//   return new Promise(function(resolve, reject) {
//     pool.query("DELETE FROM students WHERE id = $1", [id], (error, results) => {
//       if (error) {
//         reject(error)
//       }
//       resolve(`Student deleted with ID: ${id}`)
//     })
//   })
// }


// app.get('/', (req, res) => {
//   student_model.getStudents()
//   .then(response => {
//     res.status(200).send(response);
//   })
//   .catch(error => {
//     res.status(500).send(error);
//   })
// })
//
// app.post("/create", (req, res) => {
//   student_model.createStudent(req.body)
//   .then(response => {
//     res.status(200).send(response);
//   })
//   .catch(error => {
//     res.status(500).send(error);
//   })
// })
//
// app.delete("/students/:id", (req, res) => {
//   student_model.deleteStudent(req.params.id)
//   .then(response => {
//     res.status(200).send(response);
//   })
//   .catch(error => {
//     res.status(500).send(error);
//   })
// })

// router.get(url, async (req, res) => {
//   try {
//     let data = await handler(req);
//     res.status(200).json(data);
//   } catch (error) {
//     console.log(error)
//     res.status(400).json({ error: error.message || error });
//   }
// });
