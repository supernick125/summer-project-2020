const express = require("express")
const app = express()
const port = process.env.PORT || 3001

//MIDDLEWARE
app.use(express.json())
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers");
  next();
});

//API ROUTERS
const mainRouter = require('./routes/index');

app.use('/api', mainRouter);

//PORT LISTENER
app.listen(port, () => console.log(`App running on port ${port}.`));