
class Images {
    constructor(mood) {
    //   this.ambience = ["happy", "sad", "cafe", "urban", "ambience", 'successful','courageous','adventurous'];
      this.api_KEY = "12346261-e063da4b76d894b5549aed673";
      this.url = "https://pixabay.com/api/?key="+this.api_KEY+"&q="+encodeURIComponent('baloon');
      this.images = [];
      this.ramdom;
      this.randomImage;
      this.newDiv;
      this.mood = mood;
      this.ambience = {
          'happy': ['happy', 'joy'],
          'sad': ['sad'],
          'confident': ['successful'],
          'chill': ['cafe', 'ambience'],
          'romantic': ['adventurous'],
          'hype': ['urban', 'courageous']
      }
    }
    getImages(mood) {
        var randomIndex = Math.floor(Math.random()*this.ambience[mood].length);
        this.url = "https://pixabay.com/api/?key="+this.api_KEY+"&q="+encodeURIComponent(this.ambience[mood][randomIndex]);
      $.getJSON(this.url, data => {
        if (parseInt(data.totalHits) > 0) {
          $.each(data.hits, (i, hit) => {
            this.images.push(hit.largeImageURL);
          });
          console.log("images array:", this.images);
          this.randomImages();
        } else {
          console.log("No hits");
        }
      });
    }
    randomImages() {
      var newImageArray = [];
      for (var i = 0; i < 10; i++) {
        this.random = Math.floor(Math.random() * this.images.length);
        this.randomImage = this.images.splice(this.random, 1);
        newImageArray.push(this.randomImage);
        // this.newDiv = $("<div>")
        //   .addClass("col-2 img")
        //   .css("background-image", "url(" + this.randomImage + ")");
      }
      $('.section1').css("background-image", "url(" + newImageArray[0] + ")");
      $('.section2').css("background-image", "url(" + newImageArray[1] + ")");
      $('.section3').css("background-image", "url(" + newImageArray[2] + ")");
      $('.section4').css("background-image", "url(" + newImageArray[3] + ")");
    }
    renderImage(str){ //Parent class name in parameter, will append new div.
        str = '.' + str;
        $(str).append(newDiv);
    }
  }
