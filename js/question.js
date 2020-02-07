document.getElementById("grid").style.display = "none";

function Submit() {
    //event.preventDefault();
    var x = document.getElementById("forma");
    var sifra = "House Stark";
    var z = document.getElementById("sifra").value;
    console.log(z);
    if(sifra == z)
    {
        document.getElementById("grid").style.display = "block";
        document.getElementById("forma").style.display = "none";
    }
    else {
        document.getElementById("msg").innerHTML = "Password is related for one house from Game of Thrones";
    }
}


function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}
 
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}
 
Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
 
    this.questionIndex++;
}
 
Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}
 
 
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
 
Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}
 
 
function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
 
        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
 
        showProgress();
    }
};
 
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};
 
 
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " from " + quiz.questions.length;
};



function showScores() {
    var gameOverHTML = "<h1>Score</h1>";
    if(quiz.score <= 1) {
        gameOverHTML += "<h2 id='score'> You are not for this relatioship </h2>";
    }
    else if (quiz.score <= 2) {
        gameOverHTML += "<h2 id='score'> We have to talk seriously </h2>";
    }
    else if (quiz.score <= 3) {
        gameOverHTML += "<h2 id='score'> Not bad not bad </h2>";
    }
    else if (quiz.score <= 4) {
        gameOverHTML += "<h2 id='score'> It's ok </h2>";
    }
    else {
        gameOverHTML =  "<div id='hp'><h1 style='margin:0; padding:0;'>Happy birthday	&#x2665;</h1><img src='./pic/vatromet.gif'> </div>"
    }
    //gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};
 
// create questions here
var questions = [
    new Question("Where are we met?", ["Faculty", "Library","Pub", "Park"], "Pub"),
    new Question("When we started to text each other?", ["3. December", "5. December", "4. December", "6. December"], "4. December"),
    new Question("After how many days we saw each other?", ["7 Days", "10 Days","14 Days", "18 Days"], "14 Days"),
    new Question("When my birthday is?", ["15. December", "18. August", "13. September", "11. October"], "18. August"),
    new Question("What is my favorite show?", ["Game of Thrones", "Bela Lađa", "Srećni ljudi", "Bolji život"], "Game of Thrones")
];
 
// create quiz
var quiz = new Quiz(questions);
 
// display quiz
populate();