const Pool = require("pg").Pool;

const config = {
  user: "nick",
  host: "localhost",
  database: "accounts",
  password: "root",
  port: 5432,
};

const pool = new Pool(config);

module.exports = pool;
