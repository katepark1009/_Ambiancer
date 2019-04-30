

class bgMusic{
    constructor( ) {
        this.handleAjaxError = this.handleAjaxError.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
    }
    getMusic( mood ) {
        let ajaxOptions = {
            url: 'http://s-apis.learningfuze.com/hackathon/youtube/search.php',
            method: 'post',
            dataType: 'json',
            data: {
                q: `${mood} songs`,  // the string to search for
                maxResults: 10, // how many results to get
                // detailLevel: 'verbose', // default is low. how much information you will get about the video
            },
            success: this.handleSuccess,
            error: this.handleAjaxError
        };
        $.ajax(ajaxOptions);
    }
    handleSuccess( result ){
        if (result.success) {
            console.log('the result is...', result);
            this.render(result);
        } else {
            console.log('connection made, but request was denied...', result);
        }
    }
    handleAjaxError( result ){
        console.log('the error object...', result);
    }
    render( result ){

    // <iframe id = "player" type = "text / html" width = "640" height = "360"
    //     src = "http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=http://example.com"
    //     frameborder = "0"> </ iframe>
    // <iframe width="560" height="315" src="https://www.youtube.com/embed/W9CLdkkNn20" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        let randomIndex = Math.floor(Math.random()*result.video.length);
        let randomVideo = result.video[randomIndex];

        let iFrame = $('<iframe>');
        iFrame.attr({
            src: `http://www.youtube.com/embed/${randomVideo.id}?autoplay=1`,
            id: 'player',
            type: 'text/html',
            width: 640, // 160
            height: 360, // 120
            frameborder: 0,
            allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;'
        });
        console.log('the final element will be: ', iFrame);
        $('.ambience-screen').append(iFrame);
    }
}
