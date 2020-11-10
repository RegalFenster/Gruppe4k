const mysql = require("mysql");
const fs = require('fs');
const Customer = require("../Customer.js").Customer;
var con;

module.exports.db_com = class database_com {

  /** CREATES CONNECTION  TO MYSQL SERVER */
  setUp() {
    con = mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE
    });


    con.connect(function (err) {
      if (err) throw err;

      console.log("Connected to " + con.database + "!");
    });

    con.end();
  }
/** MAKES SQL CALL - SELECT ALL */
  selectAll(table) {
    if (con === undefined) console.log("No connection to database!");

    var sql = "SELECT * FROM " + table;

    con.query(sql, (err, result) => {
      if (err) throw err;

      return this.formatResult(result);
    });
  }

/** FORMATS DATA FROM DATABASE TO FIT FOR HTML AND JAVASCRIPT */
  async formatResult(result) {
    var customers_info = ["cust_id", "firstname", "lastname", "address", "phone_number", "email", "gender"];
    const customers = new Customer(result.length);


    result.forEach((column, index) => {
      let id = column[customers_info[0]];
      let fn = column[customers_info[1]];
      let ln = column[customers_info[2]];
      let ad = column[customers_info[3]];
      let pn = column[customers_info[4]];
      let em = column[customers_info[5]];
      let ge = column[customers_info[6]];

      customers[index] = new Customer(id, fn, ln, ad, pn, em, ge);

    });

    var customersList = "";
    for (var i = 0; i < result.length; i++) {
      customersList += customers[i].toString();
    }

    /** ONLY WHEN REFRESHING PAGE ELSE TAKES DATA FROM FOLDER CACHE*/
    updateCache("cache/customers.txt", customersList);

    return customers;
  }
}


/** FUNCTION THAT DECIDES IF CACHE NEEDS TO BE UPDATED */
async function updateCache(filename, listFromDB) {
  var isEqual;
  await new Promise((resolve, reject) => {
    console.log("start");
  }).then(readFile(filename))
    .then(text => compare(text, listFromDB))
    .then(Equality => isEqual = Equality)
    .then(writeToFile(filename, listFromDB, isEqual));

}


function writeToFile(filename, data, equal) {
  if (equal) {
    console.log("Equal");
    return;
  }
  fs.writeFile(filename, data, function (err) {
    if (err) throw err;
    console.log('File ' + filename + ' updated!');
  });

}

function readFile(filename) {
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) throw err;
    return data;
  });
}


/** IMPORTANT FOR CACHE UPDATES IF CHANGES ARE MADE */
function compare(data1, data2) {
  console.log("Data1: " + data1);
  console.log("Data2: " + data2);

  if (data1 == data2) {
    console.log("IS EQUAL");
    return true
  }
  console.log("IS NOT EQUAL");
  return false
}
