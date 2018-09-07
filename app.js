$(document).ready(function(){
  
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {

    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
  
    questions: {
      q1: "When was the last year the Lakers won a championship?",
      q2: "Who won NBA MVP in 2016?",
      q3: "Who is the best NBA player of all time?",
      q4: 'Which player won 6 NBA championships?',
      q5: "Which team did Shaq not play for?",
      q6: 'What is the home stadium the Lakers play in?',
      q7: "How many rings did Kobe Bryant win?"
    },
    options: {
      q1: ["2018", "2010", "2002", "2003"],
      q2: ["Steph Curry", "Michael Jordan", "Kobe Bryant", "Lebron James"],
      q3: ["Steph Curry", "Kobe Bryant", "Shaq", "Michael Jordan"],
      q4: ["Kobe Bryant", "Michael Jordan", "Kevin Durant"],
      q5: ["Suns", "Cavs", "Celtics", "Knicks"],
      q6: ["Madison Square Garden", "Dodgers Stadium", "Staples Center", "AT&T Park"],
      q7: ["5", "3", "6", "7"]
    },
    answers: {
      q1: "2010",
      q2: "Steph Curry",
      q3: "Michael Jordan",
      q4: 'Michael Jordan',
      q5: 'Knicks',
      q6: 'Staples Center',
      q7: '5'
    },
    
    startGame: function(){
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);

      $('#game').show();
      
  
      $('#results').html('');
      
      $('#timer').text(trivia.timer);
      
      $('#start').hide();
  
      $('#remaining-time').show();
    
      trivia.nextQuestion();
      
    },

    nextQuestion : function(){
      
      trivia.timer = 10;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);

      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
 
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
    timerRunning : function(){
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
      
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
       
        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
        
     
        $('#game').hide();
        
      
        $('#start').show();
      }
      
    },
  
    guessChecker : function() {
      
    
      var resultId;
      
 
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      
      
      if($(this).text() === currentAnswer){
        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }
      else{
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
      }
      
    },

    guessResult : function(){
   
      trivia.currentSet++;
  
      $('.option').remove();
      $('#results h3').remove();

      trivia.nextQuestion();
       
    }
  
  }