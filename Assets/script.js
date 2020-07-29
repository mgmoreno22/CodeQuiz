// Document Selector Variables
var timeEl = document.getElementById("countdown")
var questionDiv = document.getElementById("questionDiv")
var questionEl = document.getElementById("question")
var answersEl = document.getElementById("answers")
var startBtn = document.querySelector("#start")
var submitBtn = document.getElementById("submit")
var feedbackEl = document.getElementById("feedback")
var feedbackDiv = document.getElementById("feedbackDiv")
var startScreen = document.querySelector(".container")
var gameOverDiv = document.getElementById("gameOver")
var gameEndEl = document.getElementById("gameEnd")
var scoreFinal = document.getElementById("finalScore")

// Document Selectors for choices
var c1 = document.getElementById("choice1");
var c2 = document.getElementById("choice2");
var c3 = document.getElementById("choice3");
var c4 = document.getElementById("choice4");

// Variables for functions
var score = 0;
var questionNum = 0;
var secondsLeft = 75;
var feedbackTimer = 2;
var quizOver = false;

// Start button function
startBtn.addEventListener("click", function(){
    // Set up questions and hide instructions
    startScreen.setAttribute("class", "hide");
    // Show the question div with container class for formatting
    questionDiv.removeAttribute("class");
    questionDiv.setAttribute("class", "container");

    quizOver = false;
    populateQuiz(0);
    startTimer();
    
})

// Render Questions into body
function populateQuiz(q) {
    questionEl.textContent = questionsArr[q].Question;
    c1.textContent = (questionsArr[q].Choices[0]);
    c2.textContent = (questionsArr[q].Choices[1]);
    c3.textContent = (questionsArr[q].Choices[2]);
    c4.textContent = (questionsArr[q].Choices[3]);

    // Determine which choice is correct answer per question
    if (c1.textContent == questionsArr[q].Answer) {
        c1.setAttribute("name", "answer");
    }
    else if (c2.textContent == questionsArr[q].Answer) {
        c2.setAttribute("name", "answer");
    }
    else if (c3.textContent == questionsArr[q].Answer) {
        c3.setAttribute("name", "answer");
    }
    else if (c4.textContent == questionsArr[q].Answer) {
        c4.setAttribute("name", "answer");
    }
    else {
        console.log("error");
        return;
    }
}

// Function to control timer
function startTimer() {
    secondsLeft = 75;
    timeEl.textContent = 75;

    var timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = secondsLeft;
  
      if(secondsLeft <= 0) {
        clearInterval(timerInterval);
        if (quizOver == false) {
            endQuiz();
        }
      }
  
    }, 1000);
}

// Check if answer is correct
function checkAnswer(e) {
    
    if(e == "answer") {
        questionNum++;
        sendFeedback(true);
        if (questionNum >= (questionsArr.length)) {
            endQuiz();
        }
    }
    //Deduct time for incorrect answers
    else {
        secondsLeft -= 10;
        questionNum++;
        sendFeedback(false);
        if (questionNum >= (questionsArr.length)) {
            endQuiz();
        }
    }

    resetButtons();
    populateQuiz(questionNum);
}

// Activate the quiz feedback
function sendFeedback(correct) {
    feedbackTimer = 1;

    if (correct) {
        feedbackEl.textContent = "Correct!"
        feedbackDiv.removeAttribute("class");
        feedbackDiv.setAttribute("class", "container");
    }
    else {
        feedbackEl.textContent = "Wrong"
        feedbackDiv.removeAttribute("class");
        feedbackDiv.setAttribute("class", "container");
    }

    var feedbackInterval = setInterval(function() {
        feedbackTimer--;

        if(feedbackTimer <= 0) {
          clearInterval(feedbackInterval);
          feedbackDiv.setAttribute("class", "hide")
        }
    
      }, 1000);
}

// Resets the "correct answer" of choices
function resetButtons() {
    c1.removeAttribute("name");
    c2.removeAttribute("name");
    c3.removeAttribute("name");
    c4.removeAttribute("name");
}

// Determines how the game should end (game over or all done)
function endQuiz() {
    quizOver = true;
    questionDiv.setAttribute("class", "hide");
    gameOverDiv.removeAttribute("class");
    gameOverDiv.setAttribute("class", "container");

    if (secondsLeft == 0) {
        gameEndEl.textContent = "Game Over!"
    }
    else {
        gameEndEl.textContent = "All Done!"
        score = secondsLeft;
        finalScore.textContent = score;
        secondsLeft = 1;
    }
}

// Stores information on initials screen
submitBtn.addEventListener("click", function (e) {
    e.preventDefault();

    var playerInitials = document.getElementById("initials").value;
    var savedScores = localStorage.getItem("scores")
    var playerResults = {name: playerInitials, score: score};

    if(savedScores !== null) {
        savedScores = JSON.parse(savedScores)
        savedScores.push(playerResults);

        localStorage.setItem("scores", JSON.stringify(savedScores));
        
    }
    else {
        savedScores = [];
        savedScores.push(playerResults);

        localStorage.setItem("scores", JSON.stringify(savedScores));
    }
})