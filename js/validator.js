// Defining a function to display error message
function printError(elemId, hintMsg) {
    document.getElementById(elemId).innerHTML = hintMsg;
  }
  
  // Defining a function to validate form
  function validateForm() {
    // Retrieving the values of form elements
    var firstname = document.insertion.fname.value;
    var email = document.insertion.email.value;
    var adress = document.insertion.adress.value;
    var phonenumber = document.insertion.ph_number.value;
    var lastname = document.insertion.lname.value;
    
  
    // Defining error variables with a default value
    var firstnameErr = (emailErr = adressErr = true);
  
    // Validate firstname
    if (firstname == "") {
      printError("firstnameErr", "Please enter your first name");
      document.getElementById("fname").style.borderColor = "red";
    } else {
      var regex = /^[a-zA-Z\s]+$/;
      if (regex.test(firstname) === false) {
        printError(
          "firstnameErr",
          "Please enter a valid first name with min. 3 characters ."
        );
        document.getElementById("fname").style.borderColor = "red";
      } else {
        printError("firstnameErr", "");
        document.getElementById("fname").style.borderColor = "green";
        firstnameErr = false;
      }
    }
  
    // Validate last name
    if (lastname == "") {
      printError("lastnameErr", "Please enter your last name");
      document.getElementById("lname").style.borderColor = "red";
    } else {
      var regex = /^[a-zA-Z\s]+$/;
      if (regex.test(lastname) === false) {
        printError(
          "lastnameErr",
          "Please enter a valid last name min. 3 characters."
        );
        document.getElementById("lname").style.borderColor = "red";
      } else {
        printError("lastnameErr", "");
        document.getElementById("lname").style.borderColor = "green";
        lastnameErr = false;
      }
    }
  
    // Validate adress
    if (adress == "") {
      printError(
        "adressErr",
        "Please enter your adress"
      );
      document.getElementById("adress").style.borderColor = "red";
    } else {
      var regex = /^[a-zA-Z0-9\s]+$/;
      if (regex.test(adress) === false) {
        printError("adressErr", "Please enter a valid adress.");
        document.getElementById("adress").style.borderColor = "red";

      } else {
        printError("adressErr", "");
        document.getElementById("adress").style.borderColor = "green";
        adressErr = false;
      }
    }

    // Validate phone number
    if (phonenumber == "") {
      printError(
        "ph_numberErr",
        "Please enter your phone number"
      );
      document.getElementById("ph_number").style.borderColor = "red";
    } else {
      var regex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
      if (regex.test(phonenumber) === false) {
        printError("ph_numberErr", "Please enter a valid phone number.");
        document.getElementById("ph_number").style.borderColor = "red";
      } else {
        printError("ph_numberErr", "");
        document.getElementById("ph_number").style.borderColor = "green";
        ph_numberErr = false;
      }
    }

    // Validate email address
    if (email == "") {
      printError("emailErr", "Please enter your email address");
      document.getElementById("email").style.borderColor = "red";
    } else {
      // Regular expression for basic email validation
      var regex = /^\S+@\S+\.\S+$/;
      if (regex.test(email) === false) {
        printError("emailErr", "Please enter a valid email address ex: maxmustermann@email.com");
        document.getElementById("email").style.borderColor = "red";
      } else {
        printError("emailErr", "");
        document.getElementById("email").style.borderColor = "green";
        emailErr = false;
      }
    }
    var g = document.getElementById("gender");
    var gender = g.value;
  
    // Prevent the form from being submitted if there are any errors
    if ((firstnameErr || emailErr || adressErr || lastnameErr || ph_numberErr) == true) {
      return false;
     } 
    //else {
    //  // Creating a string from input data for preview
    //   var dataPreview =
    //     "Data entered! \n" +
    //     "first name: " +
    //     firstname + "\n" +
    //     "last name: " +
    //     lastname +
    //     "\n" +
    //     "adress : " +
    //     adress +
    //     "\n";
    //   "Email Address: " + email + "\n"+
    //   "phone number: " +
    //   phonenumber +
    //   "\n" +
    //   "email adress : " +
    //   email +"\n" +
    //   "Gender : " +
    //   gender ;
     
     
     
    //   // Display input data in a dialog box before submitting the form
    //   alert(dataPreview);
    // }
  }
  