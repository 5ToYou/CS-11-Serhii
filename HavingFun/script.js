let data = [];

var correct = document.getElementById("correct")
var error = document.getElementById("error")

function check_register_form(){
    var username = document.getElementById("register_username").value;
    var password = document.getElementById("register_password").value;
    var repeat_password = document.getElementById("register_repeat_password").value;
    var output = document.getElementById("register_output");

    if (username.length < 1 && password.length < 1) {
        output.innerHTML = "";
        return;
    }
    if (username.length < 1) {
        output.innerHTML = "Enter the username";
        return;
    }
    if (username.length < 3) {
        output.innerHTML = "Username too short";
        return;
    }
    if (password.length < 1) {
        output.innerHTML = "Enter the password";
        return;
    }
    if (password.length < 3) {
        output.innerHTML = "Password too short";
        return;
    }
    if (password !== repeat_password) {
        output.innerHTML = "Passwords don't match";
        return;
    }


    output.innerHTML = "You registered";
    data = [username, password];
    window.location.href = "main.html";
    console.log(data);
    return data
}

function check_login_form(){
    var username = document.getElementById("login_username").value;
    var password = document.getElementById("login_password").value;
    var output = document.getElementById("login_output");

    if (data[0] === username && data[1] === password) {
        output.innerHTML = "You logged in";
        window.location.href = "main.html";
    } else {
        output.innerHTML = "Incorrect username or password";
    }
}

if(data[0]){
    document.getElementById("user").textContent = data[0];
}


function log_off(){
    window.location.href = "index.html";
}

