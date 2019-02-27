"use strict";

$(document).ready(function() {
  $(".gameSpace").hide();
  $(".stats").hide();

  var correct;
  var wrong;
  var answer;
  var counter;
  var count;
  var timeout;
  var i = 0;

  var activeQuestion = {
    question: "",
    answer: "",
    choices: []
  };

  var questions = {};

  function setQuestions() {
    questions = {
      q1: {
        question: "Which one is a Barqoue Era Composer?",
        answer: "Johann Sebastian Bach",
        choices: [
          "Ludwig Van Beethoven",
          "Wolfgang Amadeus Mozart",
          "Johann Sebastian Bach",
          "Igor Stravinksky",
          "Felix Mendelssohn"
        ]
      },
      q2: {
        question: "Who composed 10 symphonies by the time they were 12?",
        answer: "Wolfgang Amadeus Mozart",
        choices: [
          "Ludwig Van Beethoven",
          "Wolfgang Amadeus Mozart",
          "Johann Sebastian Bach",
          "Igor Stravinksky",
          "Felix Mendelssohn"
        ]
      },
      q3: {
        question: "Which composer was the grandson of a famous philosopher?",
        answer: "Felix Mendelssohn",
        choices: [
          "Ludwig Van Beethoven",
          "Wolfgang Amadeus Mozart",
          "Johann Sebastian Bach",
          "Igor Stravinksky",
          "Felix Mendelssohn"
        ]
      },
      q4: {
        question: "Which composer lived in 5 different countries in his life?",
        answer: "Igor Stravinksky",
        choices: [
          "Ludwig Van Beethoven",
          "Wolfgang Amadeus Mozart",
          "Johann Sebastian Bach",
          "Igor Stravinksky",
          "Felix Mendelssohn"
        ]
      },
      q5: {
        question: "This composer went deaf and still composed",
        answer: "Ludwig Van Beethoven",
        choices: [
          "Ludwig Van Beethoven",
          "Wolfgang Amadeus Mozart",
          "Johann Sebastian Bach",
          "Igor Stravinksky",
          "Felix Mendelssohn"
        ]
      },
      q6: {
        question: "This composer went blind and still composed",
        answer: "Johann Sebastian Bach",
        choices: [
          "Ludwig Van Beethoven",
          "Wolfgang Amadeus Mozart",
          "Johann Sebastian Bach",
          "Igor Stravinksky",
          "Felix Mendelssohn"
        ]
      },
      q7: {
        question: "Which composer incorporated jazz into his works?",
        answer: "Igor Stravinksky",
        choices: [
          "Ludwig Van Beethoven",
          "Wolfgang Amadeus Mozart",
          "Johann Sebastian Bach",
          "Igor Stravinksky",
          "Felix Mendelssohn"
        ]
      },
      q8: {
        question:
          "Which composer is played a lot on Charlie Brown's 'Peanuts'?",
        answer: "Ludwig Van Beethoven",
        choices: [
          "Ludwig Van Beethoven",
          "Wolfgang Amadeus Mozart",
          "Johann Sebastian Bach",
          "Igor Stravinksky",
          "Felix Mendelssohn"
        ]
      },
      q9: {
        question: "Which composer was influenced by England and Scotland?",
        answer: "Felix Mendelssohn",
        choices: [
          "Ludwig Van Beethoven",
          "Wolfgang Amadeus Mozart",
          "Johann Sebastian Bach",
          "Igor Stravinksky",
          "Felix Mendelssohn"
        ]
      },
      q10: {
        question:
          "Which composer is considered the most prolific of the Classical Era?",
        answer: "Wolfgang Amadeus Mozart",
        choices: [
          "Ludwig Van Beethoven",
          "Wolfgang Amadeus Mozart",
          "Johann Sebastian Bach",
          "Igor Stravinksky",
          "Felix Mendelssohn"
        ]
      }
    };
  }

  var questionTimer = {
    time: 15,
    reset: function(t) {
      questionTimer.time = t;
      $(".timeLeft").html("Time Left: " + questionTimer.time);
    },
    gameTimeout: function() {
      timeout = setTimeout(questionTimer.timeUp, 1000 * 16);
    },
    count: function() {
      $(".timeLeft").html("Time Left: " + questionTimer.time);
      questionTimer.time--;
    },
    countDown: function() {
      counter = setInterval(questionTimer.count, 1000);
    },
    stopTimer: function() {
      clearInterval(counter);
    },
    timeUp: function() {
      wrong++;
      questionTimer.reset(5);
      $(".answer").html(
        "<h3>Wrong! The answer is " + activeQuestion.answer + " </h3>"
      );
      setTimeout(game, 5000);
    }
  };

  function gameOver() {
    if (Object.keys(questions).length == 0) {
      questionTimer.stopTimer();
      $(".gameSpace").hide();
      $(".stats").show();
      $(".right").html("Number right: " + correct);
      $(".wrong").html("Number Wrong: " + wrong);
      activeQuestion = false;
    }
  }

  function answerCheck() {
    if (answer == activeQuestion.answer && questionTimer.time > 0) {
      correct++;
      questionTimer.reset(5);
      $(".answer").html(
        "<h2>Correct! The answer is " + activeQuestion.answer + " </h2>"
      );
      setTimeout(game, 5000);
    }

    if (answer != activeQuestion.answer) {
      questionTimer.timeUp();
    }
  }

  function randomize() {
    activeQuestion.choices.sort(function() {
      return 0.5 - Math.random();
    });
  }

  function game() {
    gameOver();

    if (Object.keys(questions).length > 0) {
      var keys = Object.keys(questions);
      var objIndex = keys[(keys.length * Math.random()) << 0];
      activeQuestion = questions[objIndex];

      randomize();

      delete questions[objIndex];

      $(".answer").empty();

      questionTimer.stopTimer();
      questionTimer.reset(15);
      questionTimer.gameTimeout();

      questionTimer.countDown();

      $(".question").html(activeQuestion.question);

      i = 0;

      $(activeQuestion.choices).each(function() {
        $(".answer").append(
          '<button class="btn btn-lg option text-center">' +
            activeQuestion.choices[i] +
            "</button>"
        );
        i++;
      });
    }

    $(".option").on("click", function() {
      answer = $(this).html();
      answerCheck();
      clearTimeout(timeout);
    });
  }

  function startGame() {
    $(".stats").hide();

    correct = 0;
    wrong = 0;
    $(".gameSpace").show();
  }

  $(".container").on("click", ".start", function() {
    setQuestions();
    startGame();

    game();
  });
});
