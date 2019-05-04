
class Giphy{
    constructor(){
        this.ambience = {};
        this.getData = this.getData.bind(this);
        this.getDataSuccess = this.getDataSuccess.bind(this);
        this.newGif;
        this.newDiv;
        this.mood;
    }
    getData(mood){
        this.ambience = {
            'happy': ['fun', 'happy'],
            'sad': ['sad', 'gloomy'],
            'motivated': ['successful', 'achievement'],
            'chill': ['chill', 'free'],
            'romantic': ['lovely', 'rose', 'wedding'],
            'hype': ['urban', 'hype', 'city']
        };
        var randomIndex = Math.floor(Math.random()*this.ambience[this.mood].length);
        var ajaxOptions = {
            url: "http://api.giphy.com/v1/gifs/random",
            method: 'get',
            dataType: "json",
            data: {'api_key':'', 
                // 'tag': 'fun',
                'rating': 'g'
            },
            success: this.getDataSuccess
         };
        ajaxOptions.data['api_key'] = keys.giphy;
        ajaxOptions.data['tag'] = this.ambience[this.mood][randomIndex];
        $.ajax( ajaxOptions );  
    }
    getDataSuccess(data){
        console.log('data.data :', data.data);
        console.log('giphy: ', data.data.image_url);
        this.newGif = data.data.image_url;
        this.newDiv = $('<div>').addClass('gifs').css("background-image", "url(" + this.newGif + ")");
        $('.gif-container').append(this.newDiv);
    }
}