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
    } else if($('.switch').hasClass('move-switch-left')) {
      $('.switch').removeClass('move-switch-left').addClass('move-switch-right');
    } else {
      $('.switch').addClass('move-switch-right');
    }
  });
});