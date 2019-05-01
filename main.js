$(document).ready(onload);

let images = new Images();
let text = new Text();
let music = new MusicPlayer();
let giphy = new Giphy();

function onload(){
  $('#fullpage').hide();
  $(".happy").on("click",function(){switchToAmbience("happy");});
  $(".sad").on("click",function(){switchToAmbience("sad");});
  $(".chill").on("click",function(){switchToAmbience("chill");});
  $(".hype").on("click",function(){switchToAmbience("hype");});
  $(".romantic").on("click",function(){switchToAmbience("romantic");});
  $(".confident").on("click",function(){switchToAmbience("motivated");});
  $(".goback").on("click", function(){returnToMain();});
  $(".main-title").on("click", function(){returnToMain();});
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
  $(".home-screen").css({
    'opacity': 1,
    'visibility': 'visible',
    'transition': 'opacity 1.5s linear'
  });
  $('#fullpage').hide();
}