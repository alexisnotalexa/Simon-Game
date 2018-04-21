$(document).ready(function() {
  $('.yellow').on('click', function() {
    $('.yellow').toggleClass('yellow--active');
  });

  $('.red').on('click', function() {
    $('.red').toggleClass('red--active');
  });

  $('.switch').on('click', function() {
    if($('.switch').hasClass('move-switch-right')) {
      $('.switch').removeClass('move-switch-right').addClass('move-switch-left');
      $('#score').text('--');
    } else if($('.switch').hasClass('move-switch-left')) {
      $('.switch').removeClass('move-switch-left').addClass('move-switch-right');
      $('#score').text('00');
    } else {
      $('.switch').addClass('move-switch-right');
      $('#score').text('00');
    }
  });
  // need to work on this
  $('.section').on('click', function() {
    $(this).addClass('animate');
  });
});