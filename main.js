const simonGame = (function() {
  const MAXROUND = 3, GAMESPEED = 1000;
  const sound = {
    blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
    error: new Audio('http://ia601500.us.archive.org/4/items/simo_game_audio/error.mp3')
  };
  const game = {
    start: false,
    strictMode: false,
    power: false,
    sequence: [],
    round: 1
  };

  function init() {
    game.start = true;
    reset();
    formatRound();
    addStep();
    playSequence();
  }

  function reset() {
    game.sequence = [];
    game.round = 1;
  }

  function addStep() {
    const colors = ['blue', 'red', 'yellow', 'green'];
    game.sequence.push(colors[Math.floor(Math.random()*4)]);
  }

  function formatRound() {
    if(game.round < 10) {
      $('#score').text('0' + game.round);
    } else {
      $('#score').text(game.round);
    }
  }

  function playersTurn() {
    let counter = 0;
    $('.section').removeClass('animate-section').addClass('active');
    $('.section').on('click', function() {
      let move = $(this).attr('id');
      // ERROR CHECKING
      if(game.sequence[counter] !== move) {
        $('.section').off();
        playError();
        if(game.strictMode) {
          setTimeout(function() {
            init();
          }, 100);
          counter = 0;
        } else {
          setTimeout(function() {
            playSequence();
          }, 100);
          counter = 0;
        }
      } else {
        counter++; // correct move
      }
      // GAME CHECKING
      if(counter === MAXROUND) {
        $('.modal-backdrop').show();
      } else if(counter === game.sequence.length) {
        $('.section').off();
        game.round++;
        formatRound();
        addStep();
        playSequence();
      }
    });
  }

  function playSequence() {
    // player cannot make a move while sequence is playing
    $('.section').removeClass('active');
    let counter = 0;
    let intervals = setInterval(function() {
      if(!game.start) { // if player suddenly turns off start/power
        clearInterval(intervals);
      } else if(counter === game.sequence.length) {
        clearInterval(intervals);
        playersTurn();
      } else {
        playCurrent(game.sequence[counter]);
        counter++;
      }
    }, GAMESPEED);
  }

  function playError() {
    $('.game').removeClass('animate-error');
    setTimeout(function () {
      sound.error.load();
      sound.error.play();
      $('.game').addClass('animate-error');
    }, 100);
  }

  function playCurrent(color) {
    $('.section').removeClass('animate-section');
    setTimeout(function() {
      switch(color) {
        case 'blue':
          sound.blue.load();
          sound.blue.play();
          $('#blue').addClass('animate-section');
          break;
        case 'red':
          sound.red.load();
          sound.red.play();
          $('#red').addClass('animate-section');
          break;
        case 'yellow':
          sound.yellow.load();
          sound.yellow.play();
          $('#yellow').addClass('animate-section');
          break;
        case 'green':
          sound.green.load();
          sound.green.play();
          $('#green').addClass('animate-section');
          break;
      }
    }, 100);
  }

  function togglePower(power) {
    if(power) {
      game.power = true;
    } else {
      game.strictMode = false;
      game.start = false;
      game.power = false;
      reset();
    }
  }

  function toggleStart(start) {
    if(start) {
      game.start = true;
      init();
    } else {
      game.start = false;
    }
  }

  function toggleStrict(strict) {
    game.strictMode = strict ? true : false;
  }

  return {
    init: init,
    togglePower: togglePower,
    toggleStart: toggleStart,
    toggleStrict: toggleStrict
  };
})();

$(document).ready(function() {
  // POWER BUTTON
  $('.switch').on('click', function() {
    if($('.switch').hasClass('move-switch-right')) {
      simonGame.togglePower(false); // turn off
      $('.switch').removeClass('move-switch-right').addClass('move-switch-left');
      $('.red, .yellow').removeClass('red--active yellow--active').prop('disabled', true);
      $('#score').text('');
    } else {
      simonGame.togglePower(true); // turn on
      $('.switch').removeClass('move-switch-left').addClass('move-switch-right');
      $('.red, .yellow').prop('disabled', false);
      $('#score').text('--');
    }
  });

  // STRICT BUTTON
  $('.yellow').on('click', function() {
    if($('.yellow').hasClass('yellow--active')) {
      simonGame.toggleStrict(false); // turn off
      $('.yellow').removeClass('yellow--active');
    } else {
      simonGame.toggleStrict(true); // turn on
      $('.yellow').addClass('yellow--active');
    }
  });

  // START BUTTON
  $('.red').on('click', function() {
    if($('.red').hasClass('red--active')) {
      simonGame.toggleStart(false); // turn off
      $('.red').removeClass('red--active');
      $('#score').text('--');
    } else {
      simonGame.toggleStart(true); // turn on
      $('.red').addClass('red--active');
    }
  });

  // RESTART BUTTON
  $('#restart').on('click', function() {
    $('.modal-backdrop').hide();
    simonGame.init();
  });
});