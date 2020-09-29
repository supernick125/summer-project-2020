const express = require('express');
const cors = require('cors');
const app = express();

//Set env variables from .env file
const dotenv = require('dotenv');
dotenv.config();
// if (app.get('env') == 'development') {
//   require('dotenv').config();
//   console.log('Starting in dev mode.');
// }

//Port setup
const port = process.env.PORT || 5000;
const path = require('path');

//MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers");
  next();
});

//API ROUTERS
const mainRouter = require('./routes/index');

app.use('/api', mainRouter);

//STATIC FILES SERVED
app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// if (process.env.NODE_ENV === 'production') {
//   App.use(Express.static(path.join(__dirname, '../client/dist')))
//   App.use('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/dist/index.html'))
//   })
// }

//PORT LISTENER
app.listen(port, () => console.log(`App running on port ${port}.`));
