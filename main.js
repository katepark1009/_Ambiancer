$(document).ready(onload);

function onload(){
  $(".happy").on("click",switchToAmbience);
  $(".sad").on("click",switchToAmbience);
  $(".chill").on("click",switchToAmbience);
  $(".hype").on("click",switchToAmbience);
  $(".romantic").on("click",switchToAmbience);
  $(".confident").on("click",switchToAmbience);
  var images = new Images();
  var text = new Text();
  var music = new bgMusic();
  images.getImages();
  text.getNewsData("happy");
  text.getPoems("happy");
  music.getMusic("happy");
}
function switchToAmbience(){
  $(".home-screen").hide();
}
