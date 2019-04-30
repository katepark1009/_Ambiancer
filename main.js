var images = new Images();
var text = new Text();
var music = new bgMusic();

$(document).ready(onload);

function onload(){
  $(".happy").on("click",switchToAmbience);
  $(".sad").on("click",switchToAmbience);
  $(".chill").on("click",switchToAmbience);
  $(".hype").on("click",switchToAmbience);
  $(".romantic").on("click",switchToAmbience);
  $(".confident").on("click",switchToAmbience);
}
function switchToAmbience(mood){
  $(".home-screen").hide();
  images.getImages(mood);
  text.getNewsData(mood);
  text.getPoems(mood);
  music.getMusic(mood);
}
