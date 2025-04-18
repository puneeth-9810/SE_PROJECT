const { Pool } = require("pg");

const pool = new Pool({
    user: "puneeth",
    host: "localhost",
    database: "patient",
    password: "puneeth", // Replace with your actual password
    port: 5432,
  });
  

pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL ✅"))
  .catch((err) => console.error("Connection error ❌", err));

module.exports = pool;
