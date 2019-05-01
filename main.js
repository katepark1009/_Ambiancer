$(document).ready(onload);

let images = new Images();
let text = new Text();
let music = new MusicPlayer();
let giphy = new Giphy();
let clock = new Clock();

function onload(){
  $('a').on('click', event => {
    if (event.currentTarget.hash !== ''){
      event.preventDefault();
      let hash = event.currentTarget.hash;
      console.log('this is the jquery hash: ', $(hash).offset().top);
      $('html, body').animate({
        scrollTop: $(hash).offset().top - $('#navigation-menu').height()
      }, 600);
    }
  });
  $('#fullpage').hide();
  $(".happy").on("click",function(){switchToAmbience("happy");});
  $(".sad").on("click",function(){switchToAmbience("sad");});
  $(".chill").on("click",function(){switchToAmbience("chill");});
  $(".hype").on("click",function(){switchToAmbience("hype");});
  $(".romantic").on("click",function(){switchToAmbience("romantic");});
  $(".confident").on("click",function(){switchToAmbience("motivated");});
  $(".goback").on("click", function(){returnToMain();});
  $(".main-title").on("click", function(){returnToMain();});
  clock.init();
}
function switchToAmbience(mood){
  $(".home-screen").css({
    'visibility': 'hidden',
    'opacity': 0,
    'transition': 'visibility 0s 2.5s, opacity 2s linear'
  });
  $('#fullpage').show();
  $('.loading').show();
  images.getImages(mood);
  text.getNewsData(mood);
  text.getPoems(mood);
  music.getMusic(mood);
  giphy.getData(mood);
  $('.current-mood').text(' ; '+mood)
}
function returnToMain(){
  $('.mini-div-video').empty();
  $(".home-screen").css({
    'opacity': 1,
    'visibility': 'visible',
    'transition': 'opacity 1.5s linear'
  });
  $('#fullpage').hide();
}