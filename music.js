

class MusicPlayer{
    constructor( ) {
        this.handleAjaxError = this.handleAjaxError.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
    }
    getMusic( mood ) {
        const moodVariations = {
            happy: ['happy', 'instrumental upbeat', 'feel good'],
            sad: ['instrumental sad', 'lonely', 'breakup', 'depressing'],
            confident: ['confidence', 'inspirational', 'motivational'],
            hype: ['hype', 'hyphy', 'crunk', 'party'],
            chill: ['lo-fi', 'relaxing', 'chill', 'chill instrumental'],
            romantic: ['instrumental ballad', 'instrumental romantic', 'love']
        };
        let randomIndex = Math.floor(Math.random() * moodVariations[mood].length);
        let searchWord = moodVariations[mood][randomIndex];
        let ajaxOptions = {
            url: 'http://s-apis.learningfuze.com/hackathon/youtube/search.php',
            method: 'post',
            dataType: 'json',
            data: {
                q: `${searchWord} songs`,  // the string to search for
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
        let randomIndex = Math.floor(Math.random()*result.playlists.id.length);
        let randomPlaylist = result.playlists.id[randomIndex];
        let iFrame = $('<iframe>');
        iFrame.attr({
            src: `http://www.youtube.com/embed/videoseries?list=${randomPlaylist}`,
            id: 'player',
            type: 'text/html',
            width: 800, // 160
            height: 450, // 120
            frameborder: 0,
            allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;'
        });
        console.log('the final element will be: ', iFrame);
        $('.mini-div-video').empty();
        $('.mini-div-video').append(iFrame);
    }
}