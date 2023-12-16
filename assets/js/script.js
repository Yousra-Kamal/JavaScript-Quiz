//  variables selecting elements by id
var startBtn = document.querySelector("#startBtn");
var quizQuestion = document.querySelector("#questions");
var answer1 = document.getElementById("1");
var answer2 = document.getElementById("2");
var answer3 = document.getElementById("3");
var answer4 = document.getElementById("4");
var returnAnswer = document.querySelector("#returnAnswer");
var finalAnswer = document.querySelector("#finalAnswer");
var timerDisplay = document.querySelector("#timer");
var finalScore = document.querySelector("#finalScore");
var submitBtn = document.querySelector("#submit");
var viewHighscores = document.querySelector("#viewHighScores");
var resetScoresBtn = document.querySelector("#resetScores");
var homePageSection = document.querySelector("#homePage");
var startQuizSection = document.querySelector("#startQuiz");
var endqQuizSection = document.querySelector("#endQuiz");
var showScore = document.querySelector("#highScores");
var initialsInput = document.getElementById("initials");
var scoreListEl = document.getElementById("scoreList");

// JavaScript Quiz question's array
var jsQuestionsArr = [
  {
    qnTitle: "How do we declare a conditional statement in JavaScript?",
    choice1: "difference...between",
    choice2: "while loop",
    choice3: "for loop",
    choice4: "if...else",
    answer: 4,
  },
  {
    qnTitle: "What operator is used to assign a value to a declared variable?",
    choice1: "Question mark (?)",
    choice2: "Double-equal (==)",
    choice3: "Equal sign (=)",
    choice4: "Colon (:)",
    answer: 3,
  },
  {
    qnTitle:
      "Inside the HTML document, where do you place your JavaScript code?",
    choice1: "Inside the <head> element",
    choice2: "Inside the <link> element",
    choice3: "In the <footer> element",
    choice4: "Inside the <script> element",
    answer: 4,
  },
  {
    qnTitle:
      "Which method is used to add an element to the end of an array in JavaScript?",
    choice1: "push()",
    choice2: "add()",
    choice3: "append()",
    choice4: "insert()",
    answer: 1,
  },
  {
    qnTitle: "Which index do arrays begin with?",
    choice1: "length-1",
    choice2: "0",
    choice3: "first",
    choice4: "1",
    answer: 2,
  },
  {
    qnTitle: "Which operator is used for strict equality in JavaScript?",
    choice1: "===",
    choice2: "==",
    choice3: "=",
    choice4: "!==",
    answer: 1,
  },
  {
    qnTitle:
      "How can you prevent the default behavior of an event in JavaScript?",
    choice1: "event.cancelDefault()",
    choice2: "event.stopPropagation()",
    choice3: "event.preventDefault()",
    choice4: "event.stopEvent()",
    answer: 3,
  },
];

var score = 0;
var timeLeft = 60;
var currentQuestion = 0;
var lastQuestion = jsQuestionsArr.length - 1;
var timer;
var clickedAnswer;
var scoreArr;

// Timer function that counts down from 60
function countDown() {
  timer = setInterval(function () {
    // Decrement timeLeft by 1 and display it
    timeLeft--;
    timerDisplay.textContent = timeLeft + " sec ";

    if (timeLeft <= 0) {
      // Stop execution of action at setInterval
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
  startQuiz();
  displayQuestion();
}

// Function to display question and answers
function displayQuestion() {
  //First question
  qn = jsQuestionsArr[currentQuestion];

  quizQuestion.textContent = qn.qnTitle;
  answer1.textContent = qn.choice1;
  answer2.textContent = qn.choice2;
  answer3.textContent = qn.choice3;
  answer4.textContent = qn.choice4;
}

// Go from home page to quiz section
function startQuiz() {
  homePageSection.style.display = "none";
  startQuizSection.style.display = "block";
}

function setClickedAnswer(button) {
  if (button.target.id === "1") {
    clickedAnswer = 1;
  } else if (button.target.id === "2") {
    clickedAnswer = 2;
  } else if (button.target.id === "3") {
    clickedAnswer = 3;
  } else {
    clickedAnswer = 4;
  }

  validateAnswer();
}

// Validate user's clicked answer with the correct quiz answer
function validateAnswer() {
  if (timeLeft > 0) {
    // if user clicked right answer
    if (clickedAnswer === qn.answer) {
      returnAnswer.setAttribute(
        "style",
        "color: green; font-size: 20px; font-weight: bold"
      );
      returnAnswer.textContent = "✔️CORRECT ANSWER! 😊";
      finalAnswer.setAttribute(
        "style",
        "color: green; font-size: 20px; font-weight: bold"
      );
      finalAnswer.textContent = "✔️CORRECT ANSWER! 😊";

      renderNextQuestion();
    } // if user clicked wrong answer
    else {
      returnAnswer.setAttribute(
        "style",
        "color: darkred; font-size: 20px; font-weight: bold"
      );
      returnAnswer.textContent = "❌WRONG ANSWER! 😥";
      finalAnswer.setAttribute(
        "style",
        "color: darkred; font-size: 20px; font-weight: bold"
      );
      finalAnswer.textContent = "❌WRONG ANSWER! 😥";
      // deduction of 10 seconds
      timeLeft -= 10;
      renderNextQuestion();
    }
  } else {
    endQuiz();
  }
}

// Function to render the next question
function renderNextQuestion() {
  if (currentQuestion < lastQuestion) {
    currentQuestion++;
    displayQuestion();
  } else endQuiz();
}

// Function to end game and display scores
function endQuiz() {
  clearInterval(timer);
  startQuizSection.style.display = "none";
  endqQuizSection.style.display = "block";

  if (timeLeft <= 0) {
    finalScore.textContent = "GAME OVER! 😁";
    finalScore.setAttribute(
      "style",
      "color:#3c2f13; font-weight: bold;font-size: 20px;"
    );
    timerDisplay.textContent = " 0 sec ";
    score = 0;
  } else {
    finalScore.textContent = "Awesome 👏 Your final score is " + timeLeft;
    finalScore.setAttribute(
      "style",
      "color:#3c2f13; font-weight: bold;font-size: 20px;"
    );
    score = timeLeft;
    timerDisplay.textContent = timeLeft;
  }
}

// Display highscores section and hide other sections
function showHighscores() {
  endqQuizSection.style.display = "none";
  showScore.style.display = "block";
  startQuizSection.style.display = "none";
  homePageSection.style.display = "none";
  viewHighscores.style.display = "none";

  renderScores();
}

// Function to store scores to localStorage
function storedScores(e) {
  scoreArr = localStorage.getItem("storedScores");
  if (scoreArr === null) {
    scoreArr = [];
  } else {
    scoreArr = JSON.parse(scoreArr);
  }
  var initials = initialsInput.value;

  // Stops submittion if no initials entered
  if (!initials) {
    e.preventDefault();
  }
  var playerScore = { initials, score };
  scoreArr.push(playerScore);
  localStorage.setItem("storedScores", JSON.stringify(scoreArr));
}

// Function to render stored scores and sort them as <li> elements
function renderScores() {
  scoreArr = JSON.parse(localStorage.getItem("storedScores"));
  if (scoreArr === null) {
    scoreArr = [];
  } else {
    scoreArr = scoreArr;
  }
  //  Sort and display the scores from largest to smallest
  scoreArr.sort((a, b) => b.score - a.score);
  for (var i = 0; i < scoreArr.length; i++) {
    // create and append list elements for eacg high score
    var liEl = document.createElement("li");
    liEl.textContent =
      scoreArr[i].initials.toUpperCase() + " - " + scoreArr[i].score;
    scoreListEl.appendChild(liEl);
  }
}

//Attach Event listeners for each answer clicked
answer1.addEventListener("click", setClickedAnswer);
answer2.addEventListener("click", setClickedAnswer);
answer3.addEventListener("click", setClickedAnswer);
answer4.addEventListener("click", setClickedAnswer);

// Listen for a click event on start , submit, reset score  and view score buttons
startBtn.addEventListener("click", countDown);

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  storedScores();
  showHighscores();
});

resetScoresBtn.addEventListener("click", function () {
  localStorage.clear();
  scoreListEl.innerHTML = "";
});

viewHighscores.addEventListener("click", function () {
  showHighscores();
  clearInterval(timer);
});
