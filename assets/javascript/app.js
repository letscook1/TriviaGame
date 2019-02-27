"use strict";

$(document).ready(function() {

    $('.gameSpace').hide();
    $('.stats').hide();

    var correct;
    var wrong;
    var answer;
    var counter;
    var count;
    var timeout;
    var i = 0;

    var activeQuestion = {
        question: "",
        answer: '',
        choices: [],
    }

    var questions = {};

    function setQuestions(){
        question1: {
            question: "Which one is a Barqoue Era Composer?",
            answer: "Johann Sebastian Bach",
            choices: ["Ludwig Van Beethoven", "Wolfgang Amadeus Mozart", "Johann Sebastian Bach", "Igor Stravinksky", "Felix Mendelssohn"],
        }

    }

    var questionTimer = {
        time: 15,
        reset: function(t) {
            questionTimer.time = t;
            $('.timeLeft').html('Time Left: ' + questionTimer.time);
        },
        gameTimeout: function (){
            timeout = setTimeout(questionTimer.timeUp, 1000*16);
        },
        count: function(){
            $('.timeLeft').html('Time Left: ' +questionTimer.time);
            questionTimer.time--;
        },
        countDown: function(){
            counter = setInterveral(qestionTimer.count,1000);
        },
        stopTimer: function(){
            clearInterval(counter);
        },
        timeUp: function(){
            wrong++;
            questionTimer.reset(5)
            $('.answer').html('<h3>Wrong! The answer is ' + activeQuestion.answer + ' </h3>);
            setTimeout(game, 5000);
        },
    };

    function gameOver(){
        if (Object.keys(questions).length == 0){
            questionTimer.stopTimer();
            $('.gameSpace').hide();
            $('.results').show();
            $('.right').html('Number right: ' + right);
            $('.wrong').html('Number Wrong: ' + wrong);
            activeQuestion = false;
        };
    };

    function answerCheck() {
        if (answer == activeQuestion.answer && questionTimer.time > 0) {
          correct++;
          questionTimer.reset(5);
          $('.answers').html('<h2>Correct! The answer is ' + activeQuestion.answer + ' </h2>');
          setTimeout(game, 5000);   
        }
          
        if (answer != activeQuestion.answer){
          questionTimer.timeUp();
        }
      }
    
      
      function randomize() {
        activeQuestion.choices.sort(function() { 
          return 0.5 - Math.random(); 
        });
      };
    
    
      function game(){
    
   
        gameOver();
    
      
        if (Object.keys(questions).length > 0) {
    
     
          var keys = Object.keys(questions);
          var objIndex = keys[ keys.length * Math.random() << 0];
          activeQuestion = questions[objIndex];
    
     
          randomize();
    
        
          delete questions[objIndex];
    
          
          $('.answers').empty();
    
         
          questionTimer.stopTimer();
          questionTimer.reset(15);
          questionTimer.gameTimeout()
    
         
          questionTimer.countDown();
    
         
          $('.question').html(activeQuestion.question);
         
          i=0;
    
  
          $(activeQuestion.choices).each(function() {
          $('.answers').append('<button class="btn btn-lg option text-center">' + activeQuestion.choices[i] + '</button>');
          i++;
          });
        }; 
    
    
        $('.option').on('click', function(){
            answer = $(this).html();
            answerCheck();
            clearTimeout(timeout);
          });
      };
    
   
      function newGame() {
        $('.results').hide();
        
       right = 0;
        wrong = 0;
        $('.gameSpace').show();
      }
    
     
      $('.home').on('click','.start',function(){
        setQuestions();
        newGame();
        
        game();
      });
}