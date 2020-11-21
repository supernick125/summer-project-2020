const Pool = require("pg").Pool;

const config = {
  host: process.env.DB_HOST,
  port: 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "ans_db"
};

const pool = new Pool(config);

module.exports = pool;
