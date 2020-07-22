const Pool = require("pg").Pool
const pool = new Pool({
  user: "nick",
  host: "localhost",
  database: "accounts",
  password: "root",
  port: 5432,
});

const getStudents = () => {
  return new Promise(function(resolve, reject) {
    pool.query("SELECT * FROM students ORDER BY id ASC", (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}

const createStudent = (body) => {
  return new Promise(function(resolve, reject) {
    const { name, email } = body
    pool.query(`INSERT INTO students (name, email) VALUES ($1, $2) RETURNING *`, [name, email], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new student has been added: ${results.rows[0]}`)
    })
  })
}

const deleteStudent = (id) => {
  return new Promise(function(resolve, reject) {
    pool.query("DELETE FROM students WHERE id = $1", [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Student deleted with ID: ${id}`)
    })
  })
}

module.exports = {
  getStudents,
  createStudent,
  deleteStudent
}
