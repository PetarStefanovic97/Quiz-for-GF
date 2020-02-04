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
        document.getElementById("msg").innerHTML = "Šifra je vezana za jednu kuću u GoT-u :)";
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
    element.innerHTML = "Pitanje " + currentQuestionNumber + " od " + quiz.questions.length;
};



function showScores() {
    var gameOverHTML = "<h1>Rezultat</h1>";
    if(quiz.score <= 1) {
        gameOverHTML += "<h2 id='score'> Nisi ti za ovu vezu </h2>";
    }
    else if (quiz.score <= 2) {
        gameOverHTML += "<h2 id='score'> Moramo ozbiljno da razgovaramo </h2>";
    }
    else if (quiz.score <= 3) {
        gameOverHTML += "<h2 id='score'> Nisi loša </h2>";
    }
    else if (quiz.score <= 4) {
        gameOverHTML += "<h2 id='score'> Dobro je </h2>";
    }
    else {
        gameOverHTML =  "<div id='hp'><h1 style='margin:0; padding:0;'>Srećan rođendan	&#x2665;</h1><img src='./pic/vatromet.gif'> </div>"
    }
    //gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};
 
// create questions here
var questions = [
    new Question("Gde smo se upoznali?", ["Fakultet", "Biblioteka","Kafana", "Park"], "Kafana"),
    new Question("Kad smo počeli da se dopisujemo?", ["3. Decembar", "5. Decembar", "4. Decembar", "6. Decembar"], "4. Decembar"),
    new Question("Koliko dugo smo se dopisivali pre nego što smo se videli?", ["7 Dana", "10 Dana","14 Dana", "18 Dana"], "14 Dana"),
    new Question("Kad mi je rođendan?", ["15. Decembar", "18. Avgust", "13. Septembar", "11. Oktobar"], "18. Avgust"),
    new Question("Omiljena serija?", ["Game of Thrones", "Bela Lađa", "Srećni ljudi", "Bolji život"], "Game of Thrones")
];
 
// create quiz
var quiz = new Quiz(questions);
 
// display quiz
populate();