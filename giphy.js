
class Giphy{
    constructor(){

    }
    getData(){
        $.ajax({
            url: "http://api.giphy.com/v1/gifs/random",
            method: 'get',
            dataType: "json",
            data: {'api_key':'YLjpVMp6srGgsLBYTk6S27FLYQx9P9RR', 
                'tag': 'fun',
                'rating': 'g'
            },
            success: function(data) {
                console.log(data.data.image_url);
            }
         });
    }
}