const password = 531844;

function processPasscode() {
    //let password = 531844;
    input = prompt("Speak friend and enter.");
    var elem = document.getElementById("guardian");
    if (input == password) { // parseInt() was not necessary in my testing
        document.getElementById("greeting").innerHTML = "Welcome, friend.";
        elem.style.color = "white";
        document.body.style.backgroundImage = "url('images/openAll.png')";
        document.body.style.backgroundSize = "cover";
    } else {
        elem.style.color = "red";
    }
    //console.log(input)
}