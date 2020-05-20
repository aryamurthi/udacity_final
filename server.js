// Setup empty JS object to act as endpoint for all routes
const projectData = [];

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Serverconst

port = 8000;

// //spin up server
const server = app.listen(port, listening);

function listening() {
  console.log("server is running");
  console.log(`running on localhost: ${port}`);
}

//post new user entry
app.post("/addUserEntry", addUserEntry);

function addUserEntry(req, res) {
  newEntry = {
    temp: req.body.temp,
    date: req.body.date,
    feelings: req.body.feelings,
  };

  projectData.push(newEntry);
  res.send(projectData);
}

//return projectData
app.get("/projectData", getProjectData);

function getProjectData(req, res) {
  res.send(projectData);
}

app.get('/all',getAllData)
function getAllData(req,res){
    res.send(projectData)
    console.log(projectData)
}
