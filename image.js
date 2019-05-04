
class Images {
    constructor() {
      this.api_KEY = "12346261-e063da4b76d894b5549aed673";
      this.url = "https://pixabay.com/api/?key="+this.api_KEY+"&q="+encodeURIComponent('baloon');
      this.images = [];
      this.randomImage;
      this.ambience = {
          'happy': ['happy', 'joy'],
          'sad': ['sad', 'gloomy','rainy'],
          'motivated': ['successful', 'motivational'],
          'chill': ['ambience', 'free', 'adventurous'],
          'romantic': ['rose', 'wedding'],
          'hype': ['urban', 'courageous', 'city']
      }
      this.randomImages = this.randomImages.bind(this);
    }
    getImages(mood) {
      console.log('key.image :', keys.images);
        var randomIndex = Math.floor(Math.random()*this.ambience[mood].length);
        console.log('random mood-image search keyword :', this.ambience[mood][randomIndex]);
        this.url = "https://pixabay.com/api/?key="+this.api_KEY+"&q="+encodeURIComponent(this.ambience[mood][randomIndex]);
      $.getJSON(this.url, data => {
        if (parseInt(data.totalHits) > 0) {
          $.each(data.hits, (i, hit) => {
            this.images.push(hit.largeImageURL);
          });
          console.log("images array:", this.images);
          this.randomImages();
        } else {
          $('.section1').css("background-image", 'url("images/bg1.jpg")');
          $('.section2').css("background-image", 'url("images/bg2.jpg")');
          $('.section3').css("background-image", 'url("images/bg3.jpg")');
          $('.section4').css("background-image", 'url("images/bg4.jpg")');
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
      $('.section1').css("background-image", "url(" + newImageArray[0] + ")");
      $('.section2').css("background-image", "url(" + newImageArray[1] + ")");
      $('.section3').css("background-image", "url(" + newImageArray[2] + ")");
      $('.section4').css("background-image", "url(" + newImageArray[3] + ")");  
    }
  }
