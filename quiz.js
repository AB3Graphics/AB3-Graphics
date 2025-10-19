var questions = ['One Piece', 'Dragonball Z', 'Yu Yu Hakusho'];
var answers   = ['Monkey D. Luffy', 'Son Goku', 'Yusuke Urameshi'];
function quiz() {
  var points = 0;
  for (var i = 0; i < 3; i++) {
    var attempts = 3;
    while (attempts > 0) {
      var ans = prompt('Name the protagonist (full name) for: ' + questions[i] +
                       '\n(Attempts left: ' + attempts + ')');
      if (ans === null) {
        alert('No answer entered.');
        break;
      }
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
  return points;
}
