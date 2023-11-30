const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const fileupload = require("express-fileupload");
const fs = require("fs");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(fileupload());
app.use("/Photos", express.static(__dirname + "/Photos"));

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

app.delete("/api/department/:id", (req, res) => {
  const query = `DELETE FROM department WHERE id=?`;
  let values = [parseInt(req.params.id)];
  connection.query(query, values, function (err, rows, fields) {
    if (err) res.send("Error deleting department");
    res.json("Successfully Deleted");
  });
});

app.get("/api/employee", (req, res) => {
  const query = `SELECT * FROM employee`;
  connection.query(query, function (error, rows, fields) {
    if (error) res.send(`Error fetching data ${error}`);
    res.send(rows);
  });
});

app.post("/api/employee", (req, res) => {
  const query = `INSERT INTO employee (name, dept_id, date_of_joining, profile_photo) VALUE(?,?,?,?);`;
  let values = [
    req.body["name"],
    req.body["dept_id"],
    req.body["date_of_joining"],
    req.body["profile_photo"],
  ];

  connection.query(query, values, function (err, rows, fields) {
    if (err) res.send("Error inserting data");
    res.json("Successful");
  });
});

app.put("/api/employee", (req, res) => {
  const query = `UPDATE employee SET name=?, dept_id=?, date_of_joining=?, profile_photo=? WHERE id=?`;
  let values = [
    req.body["name"],
    req.body["dept_id"],
    req.body["date_of_joining"],
    req.body["profile_photo"],
    req.body["id"],
  ];
  connection.query(query, values, function (err, rows, fields) {
    if (err) res.send("Error updating Department");
    res.json("Successfull update");
  });
});

app.delete("/api/employee/:id", (req, res) => {
  const query = `DELETE FROM employee WHERE id=?`;
  let values = [parseInt(req.params.id)];
  connection.query(query, values, function (err, rows, fields) {
    if (err) res.send("Error deleting employee");
    res.json("Successfully Deleted");
  });
});

app.post("/api/employee/savefile", (req, res) => {
  fs.writeFile(
    "./Photos/" + req.files.file.name,
    req.files.file.data,
    function (err) {
      if (err) return console.log(`Error uploading file ${err}`);
    }
  );
  res.send("File uploaded successfully");
});
