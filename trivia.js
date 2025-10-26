function capitalizeFirst(name) {
  if (!name) return "";
  name = name.trim();
  var first = name.charAt(0).toUpperCase();      
  var rest  = name.substring(1).toLowerCase();  
  return first + rest;
}

function friendlyDateString() {
  var date = new Date();
  var days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  var dName = days[date.getDay()];           
  var mName = months[date.getMonth()];        
  var day   = date.getDate();                 
  var year  = date.getFullYear();             

  var hours   = date.getHours();            
  var minutes = date.getMinutes();          
  var ampm    = (hours >= 12) ? "pm" : "am";
  var hour12  = hours % 12;
  if (hour12 === 0) hour12 = 12;

  var mins = minutes < 10 ? ("0" + String(minutes)) : String(minutes);

  return "Today is " + dName + ", " + mName + " " + (day) + ", " + year +
         ". It is " + hour12 + ":" + mins + " " + ampm + ".";
}

function timeGreeting() {
  var hr = new Date().getHours();
  var label;

  switch (true) {
    case (hr >= 5 && hr < 12):  label = "Good Morning"; break;
    case (hr >= 12 && hr < 18): label = "Good Afternoon"; break;
    default:                    label = "Good Evening";
  }
  return label;
}

function validEmail() {
  var emailRegex = /^[-\w.]+@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,4}$/;

  while (true) {
    var email = prompt("Enter your email address:");
    if (email === null) { alert("Email is required."); continue; }

    email = email.trim();
    if (!emailRegex.test(email)) {
      alert("Not a valid email. Try again.");
      continue;
    }

    var parts = email.split("@");
    var username = parts[0].toUpperCase();
    var domain = parts[1];

    var userBox = document.getElementById("user");
    userBox.innerHTML =
      "<strong>Email Information:</strong> " +
      " USERNAME - <code style='text-decoration: underline;'>" + username + "</code>" +
      " DOMAIN - <code style='text-decoration: underline;'>" + domain + "</code>";
    return email;
  }
}

function showRandomQuote() {
  var quotes = [
    "Do you know what heroes are? Say there is a chunk of meat. Pirates will have a banquet and eat it but heroes will share it with other people. I want all of the meat! | Monkey D. Luffy",
    "I'm not gonna run away, I never go back on my word! That's my nindo: my ninja way! | Naruto Uzumaki",
    "No matter what you have you always want what's out of reach. Crying for the moon. Like, like a stupid pack of wolves. | Yusuke Urameshi",
    "Spend most of your life ruled by another! Watch your race dwindle to a handful! AND THEN, tell me what has more meaning than your own strength! | Vegeta",
  ];
  var idx = Math.floor(Math.random() * 4); 
  document.getElementById("quote").innerHTML =
  '<strong>Mainstream Anime Quote:</strong> "' + quotes[idx] + '"';
}

function runTriviaQuiz() {
  var questions = ['One Piece', 'Dragonball Z', 'Yu Yu Hakusho'];
  var answers   = ['monkey d. luffy', 'son goku', 'yusuke urameshi'];

  var points = 0;

  for (var i = 0; i < 3; i++) {
    var attempts = 3;
    while (attempts > 0) {
      var raw = prompt(
        'Name the protagonist (full name) for: ' + questions[i] +
        '\n(Attempts left: ' + attempts + ')'
      );
      if (raw === null) { alert('No answer entered.'); break; }

      var ans = raw.toLowerCase().trim();

      if (ans === answers[i]) {
        points = points + attempts; 
        alert('Correct! +' + attempts + ' point(s).');
        attempts = 0;
      } else {
        alert('Incorrect.');
        attempts = attempts - 1;
        if (attempts === 0) {
          alert('Wrong. The correct answer was: "' + answers[i] + '".');
        }
      }
    }
  }

  var pct = ((points / 9) * 100).toFixed(2);

  document.getElementById("score").innerHTML =
    "Score: " + points + " / 9 (" + pct + "%)";

  return points;
}

document.addEventListener("DOMContentLoaded", function () {
  var name = prompt("What is your name?");
  name = capitalizeFirst(name || "friend");
  var greet = timeGreeting() + ", " + name + "!";
  document.getElementById("greeting").innerHTML = "<strong>" + greet + "</strong>";
  document.getElementById("date").innerHTML = friendlyDateString();
  validEmail();
  showRandomQuote();
  runTriviaQuiz();
});
