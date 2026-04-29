function login(){
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
 
  if(email === "admin@gmail.com" && password === "12345"){
    alert("Login Successful");
    window.location.href = "setup.html";
  }
  else{
    alert("Invalid Email or Password");
  }
}
 
function saveSetup(){
  let bank = document.getElementById("bank").value;
  let accountType = document.getElementById("accountType").value;
  let balance = document.getElementById("balance").value;
 
  if(bank === "" || accountType === "" || balance === ""){
    alert("Please fill all bank details");
  }
  else{
    localStorage.setItem("bank", bank);
    localStorage.setItem("accountType", accountType);
    localStorage.setItem("balance", balance);
 
    alert("Bank setup saved successfully");
    window.location.href = "dashboard.html";
  }
}
