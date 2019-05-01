
class Giphy{
    constructor(){
        this.ambience = {
            'happy': ['fun', 'happy'],
            'sad': ['sad', 'gloomy','rainy'],
            'motivated': ['successful', 'achievement'],
            'chill': ['chill', 'ambience', 'free'],
            'romantic': ['lovely', 'rose', 'wedding'],
            'hype': ['urban', 'hype', 'city']
        }
    }
    getData(mood){
        var ajaxOptions = {
            url: "http://api.giphy.com/v1/gifs/random",
            method: 'get',
            dataType: "json",
            data: {'api_key':'YLjpVMp6srGgsLBYTk6S27FLYQx9P9RR', 
                // 'tag': 'fun',
                'rating': 'g'
            },
            success: function(data) {
                console.log('giphy: ', data.data.image_url);
            }
         };
        var randomIndex = Math.floor(Math.random()*this.ambience[mood].length);
        ajaxOptions.data['tag'] = this.ambience[mood][randomIndex];
        $.ajax( ajaxOptions );   
    }
}