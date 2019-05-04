
class Images {
    constructor() {
      this.url;
      this.api_KEY;
      this.images = [];
      this.randomImage;
      this.ambience = {
        'happy': ['happy', 'puppy'],
        'sad': ['gloomy', 'rainy'],
        'motivated': ['successful', 'motivational'],
        'chill': ['ambience', 'adventurous'],
        'romantic': ['rose', 'wedding'],
        'hype': ['hiphop','rapper']
      }
      this.randomImages = this.randomImages.bind(this);
    }
    getImages(mood) {
      this.api_KEY = keys.images;
      var random = Math.random() < 0.5 ? 1 : 0;
      this.url = "https://pixabay.com/api/?key="+this.api_KEY+"&q="+encodeURIComponent(this.ambience[mood][random]);
      $.getJSON(this.url, data => {
        if (parseInt(data.totalHits) > 0) {
          $.each(data.hits, (i, hit) => {
            this.images.push(hit.largeImageURL);
          });
          console.log("images array:", this.images);
          this.randomImages();
        } else {
          console.log('no hits');
        }
      })
    }
    randomImages() {
      var newImageArray = [];
      for (var i = 0; i < 5; i++) {
        this.random = Math.floor(Math.random() * this.images.length);
        this.randomImage = this.images.splice(this.random, 1);
        newImageArray.push(this.randomImage);
      } 
      for( var i = 0; i < 5; i++){
        var section = $('.section'+i);
        section.css('background-image', `url(${newImageArray[i]})`);
      }
      this.images=[];
    }
  }
