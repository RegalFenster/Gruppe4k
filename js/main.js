/** Global variables */
var content;

/** READS FILE - USED FOR FILES IN FOLDER CACHE */
async function readFile(filename) {
  await fetch(filename)
    .then(response => response.text())
    .then(text => content = text);

  await setContent(content);

}
/** STORES DATA IN GLOBAL VARIABLE CONTENT */
function setContent(data) {
  content = data;
}


/** INSERTS ALL NECESSARY DATA OF EACH CUSTOMER INTO THE TABLE */
function addToTable() {
  var customerTable = document.getElementById('customerTable');
  var customers = content.split(";");

  for (let i = 0; i < customers.length-1; i++) {
    let row = document.createElement('tr');
    let customerValues=customers[i].split(',');
    for (let k = 1; k < customerValues.length; k++) {
      let cell = document.createElement('td');
      cell.innerText = customerValues[k];
      row.appendChild(cell);
    }
    customerTable.append(row);
  }

}

/** FUNCTION THAT LOADS DATA TO HTML FILE */
async function getCustomersContent() {

  await readFile("cache/customers.txt");
  await addToTable();
  await console.log("Finish");

}


/** Call Functions */
getCustomersContent();
