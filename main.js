$(document).ready(onload);

let images = new Images();
let text = new Text();
let music = new MusicPlayer();
let giphy = new Giphy();
let clock = new Clock();
let weather = new Weather();

function onload(){
  $('a').on('click', event => {
    if (event.currentTarget.hash !== ''){
      event.preventDefault();
      let hash = event.currentTarget.hash;
      console.log('this is the position of the target: ', $(hash).offset().top);
      $('html, body').animate({
        scrollTop: $(hash).offset().top - ($('#navigation-menu').height() + $('.header-music').height())
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
  $('.gif-goback').on("click", function(){returnToMain();});
  clock.init();
  weather.init();
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
  generateHeaderText(mood);
}
function returnToMain(){
  $('.mini-div-video').empty();
  $('.gif-container').empty();
  $(".home-screen").css({
    'opacity': 1,
    'visibility': 'visible',
    'transition': 'opacity 1.5s linear'
  });
  $('#fullpage').hide();
  text.resetNewsFeed();
}

function generateHeaderText(mood){
  let videoHeader = $('.header-music h1');
  let newsHeader = $('.header-news h1');
  let poemHeader = $('.header-poem h1');
  let otherHeader = $('.header-other h1');

  switch(mood){
    case 'happy':
      videoHeader.text('Lift your spirit with a Song');
      newsHeader.text('Get some heartwarming news');
      poemHeader.text('Think happy thoughts');
      otherHeader.text('How about a little bit of fun!');
      break;
    case 'sad':
      videoHeader.text('Sometimes you just gotta let it out');
      newsHeader.text('Some articles that may open the flood gates');
      poemHeader.text('Let\'s go deep into the burrows of your heart');
      otherHeader.text('How about a little bit of fun!');
      break;
    case 'motivated':
      videoHeader.text('Get pumped up');
      newsHeader.text('Some articles to get you motivated');
      poemHeader.text('Find inspiration from your soul');
      otherHeader.text('How about a little bit of fun!');
      break;
    case 'hype':
      videoHeader.text('Let\'s get the party started..');
      newsHeader.text('What\'s poppin\' in the news');
      poemHeader.text('Legit poems to check out. Cop it, yo');
      otherHeader.text('How about a little bit of fun!');
      break;
    case 'chill':
      videoHeader.text('Relax your mind with some smooth beats');
      newsHeader.text('Some casual reading for you');
      poemHeader.text('Grab a cup o\' joe and have a seat');
      otherHeader.text('How about a little bit of fun!');
      break;
    case 'romantic':
      videoHeader.text('Set the mood right with a song');
      newsHeader.text('Love is in the air. Check out these stories');
      poemHeader.text('Mi cheri, mi amor');
      otherHeader.text('How about a little bit of fun!');
      break;
    default:
      videoHeader.text('Video');
      newsHeader.text('News');
      poemHeader.text('Poem');
      otherHeader.text('Other');
      break;
  }
}
