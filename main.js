$(document).ready(onload);

let images = new Images();
let text = new Text();
let music = new MusicPlayer();
let giphy = new Giphy();

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
  $(".confident").on("click",function(){switchToAmbience("confident");});
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
  giphy.getData();
  $('.current-mood').text(' ; '+mood)
  generateHeaderText(mood);
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

function generateHeaderText(mood){
  const videoHeader = $('.header-music h1');
  const newsHeader = $('.header-news h1');
  const poemHeader = $('.header-poem h1');
  const otherHeader = $('.header-other h1');

  switch(mood){
    case 'happy':
      videoHeader.text('Lift your spirit with a Song');
      newsHeader.text('Get some heartwarming news');
      poemHeader.text('');
      otherHeader.text('');
      break;
    case 'sad':
      videoHeader.text('');
      newsHeader.text('');
      poemHeader.text('');
      otherHeader.text('');
      break;
    case 'motivated':
      videoHeader.text('Get pumped with a song');
      newsHeader.text('');
      poemHeader.text('');
      otherHeader.text('');
      break;
    case 'hype':
      videoHeader.text('Let\'s get the party started..');
      newsHeader.text('');
      poemHeader.text('');
      otherHeader.text('');
      break;
    case 'chill':
      videoHeader.text('Relax your mind with some smooth beats');
      newsHeader.text('');
      poemHeader.text('');
      otherHeader.text('');
      break;
    case 'romantic':
      videoHeader.text('Set the mood right with a song');
      newsHeader.text('Love is in the air. Check out these stories');
      poemHeader.text('Mi cheri, mi amor');
      otherHeader.text('');
      break;
    default:
      videoHeader.text('Video');
      newsHeader.text('News');
      poemHeader.text('Poem');
      otherHeader.text('Other');
      break;
  }
}
