// creates extern connection from webstorm ide

const db = require("./js/node/database_communication");
var db_com = new db.db_com();
const express = require('express');
const app = express();
app.use(express.static('./'));

/** WHEN SERVER STARTING -> CACHE WILL BE UPDATED  */
db_com.setUp();
db_com.selectAll("Customer");

app.get("/", (req, res) => {
  console.log("Redirect...");
  res.redirect("/Customers");
});

//Get request at start views
app.get("/Customers", (req, res) => {
  /** uncommend if you want updates when refreshing page */
  //db_com.setUp();
  //db_com.selectAll("Customer");

  res.sendFile(__dirname + "/index.html");
});

var server = app.listen(3000, () => console.log("Listening Port: 3000 ..."));


