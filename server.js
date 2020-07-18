// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();

//heroku app handling port
var PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// DATA
// =============================================================
var tables = [
];

var waitlist = [
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/add", function (req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

// Displays all tables data in json
app.get("/api/tables", function (req, res) {
  return res.json(tables);
});

app.get("/api/waitlist", function (req, res) {
  return res.json(waitlist);
});

app.post("/api/clear", function (req, res) {
  tables = [];
  waitlist = [];

  res.end();
});


// Create New Characters - takes in JSON input
app.post("/api/tables", function (request, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware

  var newTable = request.body;

  if (tables.length < 5) {

    console.log(newTable);

    tables.push(newTable);

    res.json(newTable);

  }
  else {

    waitlist.push(newTable);

    res.end();
  }

});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
