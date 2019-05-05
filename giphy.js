
class Giphy{
    constructor(){
        this.ambience = {};
        this.getData = this.getData.bind(this);
        this.getDataSuccess = this.getDataSuccess.bind(this);
        this.newGif;
        this.newDiv;
        this.mood;
    }
    getData(mood){ //get Ajax data according to mood parameter
        this.mood = mood;
        this.ambience = {
            'happy': ['fun', 'happy'],
            'sad': ['sad', 'gloomy'],
            'motivated': ['successful', 'achievement'],
            'chill': ['chill', 'free'],
            'romantic': ['infatuated'],//, 'rose', 'wedding'],
            'hype': ['urban', 'hype', 'city']
        };
        var randomIndex = getRandomIndex(this.ambience[this.mood]);
        var ajaxOptions = {
            url: "http://api.giphy.com/v1/gifs/random",
            method: 'get',
            dataType: "json",
            data: {'api_key':'',
                'rating': 'g'
            },
            success: this.getDataSuccess,
            error: handleError
        };
        ajaxOptions.data['api_key'] = keys.giphy;
        ajaxOptions.data['tag'] = this.ambience[this.mood][randomIndex];
        $.ajax( ajaxOptions );
    }
    getDataSuccess(data){ //display gif on DOM
        if(presentationMode){
          switch(this.mood){
            case "happy":
              this.newGif = "https://media2.giphy.com/media/l41YbnQ2qRrBesVag/giphy.gif";
              break;
            case "sad":
              this.newGif = "https://media2.giphy.com/media/efYqX6r8prnd6/giphy.gif";
              break;
            case "chill":
              this.newGif = "https://media2.giphy.com/media/HpuTckGF0corm/giphy.gif";
              break;
            case "hype":
              this.newGif = "https://media3.giphy.com/media/cOIauOKrdWkiigzFSS/giphy.gif";
              break;
            case "romantic":
              this.newGif = "https://media3.giphy.com/media/46zBmNyfiLAV9OszUs/giphy.gif";
              break;
            case "motivated":
              this.newGif = "https://media0.giphy.com/media/MuHYrH0tOGF0DTjEMU/giphy.gif";
              break;
          }
        }
        else{
          this.newGif = data.data.image_url;
        }
        this.newDiv = $('<div>').addClass('gifs').css("background-image", "url(" + this.newGif + ")");
        $('.gif-container').append(this.newDiv);
    }
}
