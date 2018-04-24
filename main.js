const simonGame = (function() {
  const MAXROUND = 20;
  const sound = {
    blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
  };
  const game = {
    start: false,
    strictMode: false,
    power: false,
    sequence: [],
    round: 0
  };

  function init() {
    game.start = true;
    reset();
    addStep();
  }

  function reset() {
    game.sequence = [];
    game.round = 0;
  }

  function addStep() {
    const colors = ['blue', 'red', 'yellow', 'green'];
    game.sequence.push(colors[Math.floor(Math.random()*4)]);
  }

  function playSequence() {

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
      $('#score').text('01');
    }
  });
});