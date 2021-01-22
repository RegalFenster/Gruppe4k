// creates extern connection from webstorm ide

const jspdf = require('jspdf');
const db = require("./js/node/database_communication");
let db_com = new db.db_com();
let html_to_pdf = require('html-pdf-node');
var pdf = require('html-pdf');
var fs = require('fs');
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

// could do it as post also
app.post('/download', (req, res) => {
  var html = fs.readFileSync('./index.html', 'utf8');
  var options = { format: 'Letter' };

  pdf.create(html, options).toFile('./index.pdf', function(err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
  });

  res.download('./index.pdf');
} )
const port = process.env.PORT || 3000;

var server = app.listen(port, function() {
  console.log("Server started successfully");
});


