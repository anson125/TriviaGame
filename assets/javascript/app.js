$(document).ready(function() {
    $("#introSection").hide();
    $("#messageSection").hide();
    $('#instructionModal').modal();
    $('.parallax').parallax(); 
    $('.tooltipped').tooltip({ 
        delay: 50
    });


    $("#introSection").fadeIn(1000 * 5, function() { 
    });

    $("#questionSpace").hide()
    var correctCounter = 0,
        incorrectCounter = 0,
        unansweredCounter = 0,
        currentQuestionIndex = 0;

        


    var congratsMessages = ['Great going cadet', 'On the money astrophysicist', "To Infinity!"];

    function randomNum(x) {
        var roll = Math.floor(Math.random() * x);
        return roll;
    }

    function randomCongrats() {
        var messageRoll = randomNum(congratsMessages.length);
    }

    function countDown() {
        $('.pickAnswer').click(function() {
            $(this).data('clicked', true);
        });
        var i = 10;
        var myInterval = setInterval(function() {

            if (i < 10) {
                $('#timerSeconds').html("0" + i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            } else {
                $('#timerSeconds').html(i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            }

            if (i === 0) {
                unansweredCounter++;
                clearInterval(myInterval);
                currentQuestionIndex++;
                $('#timer').effect("pulsate", {
                    times: 25
                }, 1000 * 5);
                i = 10;
                postQuestion(currentQuestionIndex);
            } else {
                i--;
            }
        }, 1000);
    }

    var questions = [
      
        {
            "q": "Which of the following teams have not won a Super Bowl?",
            "c": ["Cincinnati Bengals", "Carolina Panthers", "Miami Dolphins"],
            "answer": 0
        },
       
        {
            "q": "In what round was Tom Brady selected?",
            "c": ["6th", "4nd", "8th"],
            "answer": 0
        },
       
        {
            "q": "Besides the Cleveland Brown, what other NFL team have went 0-16?",
            "c": ["San Diego Chargers", "St. Louis Rams", "Detriot Lions"],
            "answer": 2
        },
       
        {
            "q": "Which state has the most NFL team?",
            "c": ["Florida", "California", "New York"],
            "answer": 2
        },
       
        {
            "q": "Which team has the most Super Bowl wins?",
            "c": ["Dallas Cowboys", "Green Bay Packers", "New York Giants"],
            "answer": 0
        },
       
        {
            "q": "How many teams are in the NFL as of 1993",
            "c": ["28", "32", "34"],
            "answer": 1
        },
       
        {
            "q": "Who has the fastest 40 yard dash at the NFL Combine?",
            "c": ["Antonio Brown", "John Ross", "Chris Johnson"],
            "answer": 1
        },
        
        {
            "q": "What division has won the most Super Bowls??",
            "c": ["NFC West", "AFC East", "NFC East"],
            "answer": 2
        },
        
        {
            "q": "What NFL team is called America's team",
            "c": ["Dallas Cowboys", "Washington Redskin", "Houston Texans"],
            "answer": 0
        },
       
        {
            "q": "What was the last year that the Cleveland Browns made it to the playoffs?",
            "c": ["2002", "2005", "2000"],
            "answer": 1
        }
    ];


    function postQuestion(n) {

        if (currentQuestionIndex < questions.length) {
            $('#question').remove();
            $('.pickAnswer').remove();
            countDown();
            $('#questionContainer').append("<div id='question'>" + questions[n].q + "</div>");
            for (var i = 0; i < questions[n].c.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("pickAnswer").attr("indexnum", i).text(questions[n].c[i]);
                $('#choices').append(newDiv);
            }


        } else {
            resetGame(); 
        }

        $(".pickAnswer").on("click", function() {
            var userChoice = $(this).attr('indexnum'); 
            userChoice = parseInt(userChoice);

            if (userChoice === questions[currentQuestionIndex].answer) {
                correctCounter++;
                currentQuestionIndex++
                randomCongrats();

            } else {
                incorrectCounter++;
                currentQuestionIndex++;

            }
            postQuestion(currentQuestionIndex);
        })
    }

    function startTrivia() {
        $('#messageSection').hide();
        $('#gameMessage').empty()
        $('#questionContainer').show();
        $('#choices').show();
        $("#timer").show();
        correctCounter = 0;
        incorrectCounter = 0;
        unansweredCounter = 0;
        currentQuestionIndex = 0;

        postQuestion(currentQuestionIndex);

    }

    function resetGame() {
        $('#messageSection').show();
        $('#questionContainer').hide();
        $('#choices').hide();
        $('#timer').hide()

        $('#gameMessage').append("<h2>You have completed the game!</h2>");
        $('#gameMessage').append("<h4>Total Correct: " + correctCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Incorrect: " + incorrectCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Unanswered: " + unansweredCounter + "</h4>");

        setTimeout(startTrivia, 1000 * 10);

    }



    $("#startButton").on("click", function() {
        $("#buttonRow").hide();
        $("#introCard").remove();
        $("#timer").append("<span id='timerMinutes'>00</span>:<span id='timerSeconds'>00</span>");
        $("#questionSpace").show();

        startTrivia();


    })


});