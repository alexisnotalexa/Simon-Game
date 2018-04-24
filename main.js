const simonGame = (function() {
  const MAXROUND = 20, GAMESPEED = 1000;
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
    addStep();
    addStep();
    addStep();
    playSequence();
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
    console.log(game.sequence);
    let counter = 0;
    let intervals = setInterval(function() {
      if(counter === game.sequence.length) {
        clearInterval(intervals);
      } else {
        playCurrent(game.sequence[counter]);
        counter++;
      }
    }, GAMESPEED);
  }

  function playCurrent(color) {
    $('.section').removeClass('animate');
    setTimeout(function() {
      switch(color) {
        case 'blue':
          sound.blue.load();
          sound.blue.play();
          $('#blue').addClass('animate');
          break;
        case 'red':
          sound.red.load();
          sound.red.play();
          $('#red').addClass('animate');
          break;
        case 'yellow':
          sound.yellow.load();
          sound.yellow.play();
          $('#yellow').addClass('animate');
          break;
        case 'green':
          sound.green.load();
          sound.green.play();
          $('#green').addClass('animate');
          break;
      }
    }, 100);
    // switch(color) {
    //   case 'blue':
    //     sound.blue.load();
    //     sound.blue.play();
    //     $('#blue').removeClass('animate');
    //     setTimeout(function() {
    //       $('#blue').addClass('animate');
    //     }, 100);
    //     // $('#blue').removeClass('animate').addClass('animate');
    //     break;
    //   case 'red':
    //     sound.red.load();
    //     sound.red.play();
    //     $('#red').removeClass('animate');
    //     setTimeout(function() {
    //       $('#red').addClass('animate');
    //     }, 100);
    //     // $('#red').removeClass('animate').addClass('animate');
    //     break;
    //   case 'yellow':
    //     sound.yellow.load();
    //     sound.yellow.play();
    //     $('#yellow').removeClass('animate');
    //     setTimeout(function() {
    //       $('#yellow').addClass('animate');
    //     }, 100);
    //     // $('#yellow').removeClass('animate').addClass('animate');
    //     break;
    //   case 'green':
    //     sound.green.load();
    //     sound.green.play();
    //     $('#green').removeClass('animate');
    //     setTimeout(function() {
    //       $('#green').addClass('animate');
    //     }, 100);
    //     // $('#green').removeClass('animate').addClass('animate');
    //     break;
    // }
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