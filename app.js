// creates extern connection from webstorm ide

const db = require("./js/node/database_communication");
var db_com = new db.db_com();
const express = require('express');
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.static('./'));


/** WHEN SERVER STARTING -> CACHE WILL BE UPDATED  */
db_com.setUp();
db_com.selectAll("Customer");

app.get("/", (req, res) => {
  console.log("Redirect...");
  res.redirect("/Customers");
});

//Get request at start views
app.get("/Customers",  (req, res) => {
  /** uncommend if you want updates when refreshing page */
  //db_com.setUp();
  //await db_com.selectAll("Customer");
   res.sendFile(__dirname + "/index.html");
});

/** Customer will be added to database when post request is made to this route */
app.post("/addCustomer",  async (req,res)=>{
  await db_com.insert(req.body);
  await db_com.selectAll("Customer");
  await res.redirect("/");
});


const port = process.env.PORT || 3000;

var server = app.listen(port, function() {
  console.log("Server started successfully");
});


