$(document).ready(onload);

let images = new Images();
let text = new Text();
let music = new MusicPlayer();

function onload(){
  $('#fullpage').hide();
  $(".happy").on("click",function(){switchToAmbience("happy");});
  $(".sad").on("click",function(){switchToAmbience("sad");});
  $(".chill").on("click",function(){switchToAmbience("chill");});
  $(".hype").on("click",function(){switchToAmbience("hype");});
  $(".romantic").on("click",function(){switchToAmbience("romantic");});
  $(".confident").on("click",function(){switchToAmbience("confident");});
  $(".goback").on("click", function(){returnToMain();});
  $(".main-title").on("click", function(){returnToMain();});
}
function switchToAmbience(mood){
  $(".home-screen").hide();
  $('#fullpage').show();
  images.getImages(mood);
  text.getNewsData(mood);
  text.getPoems(mood);
  music.getMusic(mood);
}
function returnToMain(){
  $(".home-screen").show();
  $('#fullpage').hide();
}