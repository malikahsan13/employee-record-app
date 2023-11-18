const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "department-db",
});

// console.log(connection);

app.listen(5000, () => {
  connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to DB");
  });
  console.log("Server listening on Port 5000");
});

app.get("/", (req, res) => {
  res.send("Welcome to Employees Database");
});
