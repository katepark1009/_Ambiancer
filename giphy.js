
class giphy{
    constructor(){

    }
    getData(){
        $.ajax({
            url: "api.giphy.com",
            method: 'get',
            dataType: "jsonp",
            data: {'api_key':'YLjpVMp6srGgsLBYTk6S27FLYQx9P9RR', 
                'tag': 'fun',
                'rating': 'g'
            },
            success: function(data) {
                console.log(data);
            }
         });
    }
}