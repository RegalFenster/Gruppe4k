//import {Customer} from  "./Customer.js";
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
async function addToTable (key,value) {
  var customerTable = document.getElementById('customerTable');
  let customers= await getCustomers(key,value);
  let customerKeys=["cust_id","firstname","lastname","address","phonenumber","email","gender"];

  while (customerTable.children.length>1)// body and header still there
  {
    customerTable.removeChild(customerTable.lastChild);
  }
if(key===undefined||value===undefined){return;}

if(customers===undefined||customers.length<1){return;}

  for (let i = 0; i < customers.length ; i++) {
    let row = document.createElement('tr');
    let customerValues = customers[i];
    for (let k = 1; k < customerKeys.length; k++) {
      let cell = document.createElement('td');
      cell.innerText = customerValues[customerKeys[k]];

      row.appendChild(cell);
    }
    customerTable.append(row);
  }
}

/** RETURNS ALL CUSTOMERS SPECIFIED BY A KEY AND A VALUE
 *
 * @param key
 * @param value
 * @param contains indicates if key should contain the value or be equals to it
 * */
async function getCustomers(key, value) {
  if(content===undefined||content===""){return;}
  let customers = content.substring(0, content.length - 1).split(";");
  let filteredCustomers = [];
  key=getKey(key);

  customers.forEach((column, index) => {
      column = column.split(",");
      let custo = {
        "custid": column[0],
        "firstname": column[1],
        "lastname": column[2],
        "address": column[3],
        "phonenumber": column[4],
        "email": column[5],
        "gender": column[6],
      }

      let filt = custo[key];

      if(key===""){
        filteredCustomers[filteredCustomers.length] = custo;
      }
        else if(filt.toLowerCase().includes(value.toLowerCase())){
          filteredCustomers[filteredCustomers.length] = custo;
        }

  });

  filteredCustomers.forEach((value, index) => {
  });

  return filteredCustomers;
}

/** FUNCTION THAT LOADS DATA TO HTML FILE */
async function getCustomersContent() {

  await readFile("cache/customers.txt");
  await addToTable("","");
  await filter();
  await console.log("Finish");

}


async function filter() {
  let attribute = document.getElementById('selected');
  let searchImg = document.getElementById('searchImg');
  let filterText = document.getElementById('filterInput');
  searchImg.addEventListener('click', async () => {
    let key = attribute.innerText;
    if (key.trim() === "-- Attribute --") {
      key = "";
    }
    await addToTable(key,filterText.value);


  });


}

/** Formats checkbox attribute to json key */
function getKey(attribute){

  switch (attribute.toLowerCase()){
    case "first name":{return "firstname";}
    case "last name":{return "lastname";}
    case "address":{return "address";}
    case "phone number":{return "phonenumber";}
    case "email":{return "email";}
    default: return "";
  }

}

/** Call Functions */
getCustomersContent();


