let images = new Images();
let text = new Text();
let music = new bgMusic();

$(document).ready(onload);

function onload(){
  $('#fullpage').hide();
  $(".happy").on("click",function(){switchToAmbience("happy");});
  $(".sad").on("click",function(){switchToAmbience("sad");});
  $(".chill").on("click",function(){switchToAmbience("chill");});
  $(".hype").on("click",function(){switchToAmbience("hype");});
  $(".romantic").on("click",function(){switchToAmbience("romantic");});
  $(".confident").on("click",function(){switchToAmbience("confident");});
}
function switchToAmbience(mood){
  $(".home-screen").hide();
  $('#fullpage').show();
  images.getImages(mood);
  text.getNewsData(mood);
  text.getPoems(mood);
  music.getMusic(mood);
}
