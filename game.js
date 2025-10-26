let questions = [
  ["Who is the protagonist of One Piece?", 0, "Monkey D. Luffy", "Yusuke Urameshi", "Son Goku"],
  ["Which character has a signature technique called the Spirit Gun?", 1, "Monkey D. Luffy", "Yusuke Urameshi", "Son Goku"],
  ["Which character is a father?", 2, "Monkey D. Luffy", "Yusuke Urameshi", "Son Goku"]
];

const TOTAL = questions.length;   
let count = 0;                   

let lastQText = "";
let lastAnswers = [];           
let lastCorrectIndex = -1;

function setPrompt(html)  { document.getElementById("prompt").innerHTML   = html; }
function setQuestion(txt) { document.getElementById("question").textContent = txt; }
function setAnswers(html) { document.getElementById("answers").innerHTML  = html; }

function loadStartButton() {
  setQuestion("");
  setAnswers("");
  setPrompt(`<button onClick="playGame()">Play Game</button>`);
}

function playGame() {
  if (questions.length === 0) {
    setPrompt(`<button onClick="location.reload()">Restart Game</button>`);
    return;
  }


  const peek = questions[count]; 

  let row = questions.shift();        
  const qText = row.shift();         
  const correctIndex = row.shift();    
  const answers = row;                

  lastQText = qText;
  lastAnswers = answers;
  lastCorrectIndex = Number(correctIndex);

  setQuestion(qText);

  let listItems = "";
  for (let i = 0; i < answers.length; i++) {
    listItems += `<li><a href="#" onClick="return checkAnswer(${i}, ${lastCorrectIndex});">${answers[i]}</a></li>`;
  }
  setAnswers(listItems);

  setPrompt(`<em>Pick Your Best Guess.</em>`);
}

function checkAnswer(chosenIndex, correctIndex) {
  const chosen  = Number(chosenIndex);
  const correct = Number(correctIndex);
  const isCorrect = chosen === correct;

  const userAnswer    = lastAnswers[chosen];
  const correctAnswer = lastAnswers[correct];

  const feedback = isCorrect
    ? `<p class="success">Correct! <br>You answered: ${userAnswer}</p>`
    : `<p class="error">Wrong! <br>You chose: ${userAnswer}<br>The correct answer is: ${correctAnswer}</p>`;

  setPrompt(feedback);

  count++;

  if (count >= TOTAL || questions.length === 0) {
    setPrompt(
      `${feedback}
       <button onClick="location.reload()">Restart Game</button>`
    );
    return false; 
  }
  setPrompt(
    `${feedback}
     <button onClick="playGame()">Next Question</button>`
  );
  return false;
}
loadStartButton();
