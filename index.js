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

app.get("/api/department", (req, res) => {
  const query = `SELECT * FROM department`;
  connection.query(query, function (error, rows, fields) {
    if (error) res.send(`Error fetching data ${error}`);
    res.send(rows);
  });
});

app.post("/api/department", (req, res) => {
  const query = `INSERT INTO department (name) VALUE(?);`;
  let values = [req.body["name"]];

  connection.query(query, values, function (err, rows, fields) {
    if (err) res.send("Error inserting data");
    res.json("Successful");
  });
});

app.put("/api/department", (req, res) => {
  const query = `UPDATE department SET name=? WHERE id=?`;
  let values = [req.body["name"], [req.body["id"]]];
  connection.query(query, values, function (err, rows, fields) {
    if (err) res.send("Error updating Department");
    res.json("Successfull update");
  });
});

app.delete("/api/department", (req, res) => {
  const query = `DELETE FROM department WHERE id=?`;
  let values = [req.body["id"]];
  connection.query(query, values, function (err, rows, fields) {
    if (err) res.send("Error deleting department");
    res.json("Successfully Deleted");
  });
});
