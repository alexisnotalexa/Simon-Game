const simonGame = (function() {
  const MAXROUND = 20;
  const game = {
    start: false,
    strictMode: false,
    power: false,
    sequence: [],
    round: 0
  };

  function init() {
    if(game.power) {
      game.start = true;
      console.log(game);
    }
  }

  function reset() {
    game.sequence = [];
    game.round = 0;
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

  function toggleStrict(strict) {
    game.strictMode = strict ? true : false;
    console.log(game);
  }

  return {
    togglePower: togglePower,
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
      $('#score').text('--');
    } else {
      simonGame.togglePower(true); // turn on
      $('.switch').removeClass('move-switch-left').addClass('move-switch-right');
      $('.red, .yellow').prop('disabled', false);
      $('#score').text('00');
    }
  });

  // STRICT BUTTON
  $('.yellow').on('click', function() {
    if($('.yellow').hasClass('yellow--active')) {
      simonGame.toggleStrict(false);
      $('.yellow').removeClass('yellow--active');
    } else {
      simonGame.toggleStrict(true);
      $('.yellow').addClass('yellow--active');
    }
  });
  // START BUTTON
  $('.red').on('click', function() {
    $('.red').toggleClass('red--active');
  });
});