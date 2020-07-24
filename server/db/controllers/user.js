const pool = require('../index');

//Return all students
const getStudents = async (req, res) => {
  try {
    const students = await pool.query(
      'SELECT * FROM STUDENTS ORDER BY student_id ASC'
    )

  } catch (error) {
    return res.status(500).json({ message: 'There was an error while searching. Please try again later.'})
  }
}

//Register a new student
const createStudent = async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body
  try {
    //check username
    //check email
    //hash password
    const user = await pool.query(
      'INSERT INTO STUDENTS (first_name, last_name, username, email_address, password, registered_on) VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id',
      [firstname, lastname, username, email, password, Date.now()]
    )

  } catch (error) {
    return res.status(500).json({ message: 'There was an error while registering. Please try again later.' });
  }
}

//Delete a student
const deleteStudent = async (req, res) => {
  try {

    const user = await pool.query(
      'DELETE FROM STUDENTS WHERE student_id = $1', [id]
    )

  } catch (error) {
    return res.status(500).json({ message: 'There was an error while deleting. Please try again later.' });
  }
}

module.exports = {
  getStudents,
  createStudent,
  deleteStudent
}

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
