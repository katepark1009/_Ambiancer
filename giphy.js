
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
        this.mood = mood;
        this.ambience = {
            'happy': ['fun', 'happy'],
            'sad': ['sad', 'gloomy'],
            'motivated': ['successful', 'achievement'],
            'chill': ['chill', 'free'],
            'romantic': ['lovely', 'rose', 'wedding'],
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
    getDataSuccess(data){
        this.newGif = data.data.image_url;
        this.newDiv = $('<div>').addClass('gifs').css("background-image", "url(" + this.newGif + ")");
        $('.gif-container').append(this.newDiv);
    }
}
