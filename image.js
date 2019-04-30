
class Images {
    constructor() {
      this.ambience = ["happy", "sad", "chill", "urban","confident", "romantic"];
      this.api_KEY = "12346261-e063da4b76d894b5549aed673";
      this.url = "https://pixabay.com/api/?key="+this.api_KEY+"&q="+encodeURIComponent('baloon');
      this.images = [];
    }
    getImages() {
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
      var random;
      for (var i = 0; i < 10; i++) {
        random = Math.floor(Math.random() * this.images.length);
        var randomImage = this.images.splice(random, 1);
        var newDiv = $("<div>")
          .addClass("col-2 img")
          .css("background-image", "url(" + randomImage + ")");
        $(".wrap").append(newDiv);
      }
    }
  }
