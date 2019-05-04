$(document).ready(startApp);

let images = new Images();
let text = new TextDataHandler();
let music = new MusicPlayer();
let giphy = new Giphy();
let clock = new Clock();
let weather = new Weather();
let keys = new ApiKeys();

function startApp(){
  $('#fullpage').hide();
  addEventHandlers();
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

function generateHeaderText(mood) {
  const moodHeaderData = {
    happy: {
      video: 'Lift your spirit with a Song',
      news: 'Get some heartwarming news',
      poem: 'Think happy thoughts',
      other: 'How about a GIF from us to you, friend. -_o'
    },
    sad: {
      video: 'Sometimes you just gotta let it out',
      news: 'Some articles that may open the flood gates',
      poem: 'Let\'s go deep into the burrows of your heart',
      other: 'How about a GIF from us to you, friend. -_o'
    },
    motivated: {
      video: 'Get pumped up',
      news: 'Some articles to get you motivated',
      poem: 'Find inspiration from your soul',
      other: 'How about a GIF from us to you, friend. -_o'
    },
    hype: {
      video: 'Let\'s get the party started',
      news: 'What\'s poppin\' in the news',
      poem: 'Legit poems to check out. Cop it, yo',
      other: 'How about a GIF from us to you, friend. -_o'
    },
    chill: {
      video: 'Relax your mind with some smooth beats',
      news: 'Some casual reading for you',
      poem: 'Grab a cup o\' joe and have a seat',
      other: 'How about a GIF from us to you, friend. -_o'
    },
    romantic: {
      video: 'Set the mood right with a song',
      news: 'Love is in the air. Check out these stories',
      poem: 'My cherie, amour',
      other: 'How about a GIF from us to you, friend. -_o'
    },
  };
  $('.header-music h1').text(moodHeaderData[mood].video);
  $('.header-news h1').text(moodHeaderData[mood].news);
  $('.header-poem h1').text(moodHeaderData[mood].poem);
  $('.header-other h1').text(moodHeaderData[mood].other);
}

function addEventHandlers(){
  // Click handler for smooth scrolling
  $('a').on('click', event => {
    if (event.currentTarget.hash !== ''){
      event.preventDefault();
      let hash = event.currentTarget.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top - ($('#navigation-menu').height() + $('.header-music').height())
      }, 650);
    }
  });
  // Click handlers for setting the mood
  $(".happy").on("click",()=> {switchToAmbience("happy");});
  $(".sad").on("click",()=> {switchToAmbience("sad");});
  $(".chill").on("click",() => {switchToAmbience("chill");});
  $(".hype").on("click",()=> {switchToAmbience("hype");});
  $(".romantic").on("click",()=> {switchToAmbience("romantic");});
  $(".confident").on("click",()=> {switchToAmbience("motivated");});
  $(".goback").on("click", returnToMain);
  $(".main-title").on("click", returnToMain);
  $('.gif-goback').on("click", returnToMain);
}
