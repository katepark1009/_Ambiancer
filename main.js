var images = new Images();
var text = new Text();
var music = new bgMusic();

$(document).ready(onload);

function onload(){
  $(".happy").on("click",function(){switchToAmbience("happy")});
  $(".sad").on("click",function(){switchToAmbience("sad")});
  $(".chill").on("click",function(){switchToAmbience("chill")});
  $(".hype").on("click",function(){switchToAmbience("hype")});
  $(".romantic").on("click",function(){switchToAmbience("romantic")});
  $(".confident").on("click",function(){switchToAmbience("confident")});
}
function switchToAmbience(mood){
  $(".home-screen").hide();
  images.getImages();
  text.getNewsData(mood);
  text.getPoems(mood);
  music.getMusic(mood);
}
