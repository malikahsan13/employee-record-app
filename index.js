const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyparser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(5000, (req, res) => {
  res.send("Hello World");
});
