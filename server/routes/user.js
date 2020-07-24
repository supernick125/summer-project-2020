const {
  getStudents,
  createStudent,
  deleteStudent
} = require('../controllers/users');
const router = require('express').Router();

//Register
app.get('/register', createStudent);



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

module.exports = router;
