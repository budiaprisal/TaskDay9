const { Pool } = require("pg");

const dbpool = new Pool({
  database: "personal_web_b39",
  port: 5432,
  user: "postgres",
  password: "123",
});

module.exports = dbpool;
