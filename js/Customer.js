var cust_id, firstname, lastname, address, phone_number, email, gender;


class Customer {

  constructor(cust_id, firstname, lastname, address, phone_number, email, gender) {
    this.cust_id = cust_id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.address = address;
    this.phone_number = phone_number;
    this.email = email;
    this.gender = gender;
  }


  getFirstname() {
    return firstname;
  }

  getLasttname() {
    return lastname;
  }

  getAddress() {
    return address;
  }

  getPhoneNumber() {
    return phone_number;
  }

  getEmail() {
    return email;
  }

  getGender() {
    return gender;
  }


  toString() {

    return this.cust_id + "," + this.firstname + "," + this.lastname + "," + this.address + "," + this.phone_number + "," + this.email + "," + this.gender + ";";

  }
}

module.exports.Customer =Customer;

