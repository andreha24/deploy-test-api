const express = require("express");
const mssql = require("mssql");
const cors = require("cors");
const app = express();
require("dotenv").config();

const dbConfig = {
  server: process.env.SERVER_NAME,
  port: Number(process.env.PORT_DB),
  user: process.env.USERNAME_DB,
  password: process.env.USER_PASSWORD,
  database: process.env.DATABASE_NAME,
  options: {
    trustServerCertificate: true,
  }
}

app.use(cors());

app.get("/api", async (req, res) => {
  try {
    const pool = await mssql.connect(dbConfig);
    const result = await pool.request().query("SELECT * FROM Users");
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving data");
  }
});

app.listen(process.env.PORT_SERVER, async () => {
  console.log(`Listening on port ${process.env.PORT_SERVER}`);
});
