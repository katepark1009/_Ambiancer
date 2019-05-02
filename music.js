

class MusicPlayer{
    constructor( ) {
        this.handleAjaxError = this.handleAjaxError.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
    }
    getMusic( mood ) {
        const moodVariations = {
            happy: ['happy', 'upbeat'],
            sad: ['sad'],
            motivated: ['inspirational', 'motivational'],
            hype: ['hype', 'hyphy', 'crunk', 'party'],
            chill: ['lo-fi', 'smooth jazz'],
            romantic: ['ballad', 'romantic']
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
        if (result.playlists) {
            let randomIndex = Math.floor(Math.random() * result.playlists.id.length);
            let randomPlaylist = result.playlists.id[randomIndex];
            let iFrame = $('<iframe>');
            iFrame.attr({
                src: `http://www.youtube.com/embed?autoplay=1&disablekb=1&fs=0&rel=0&modestbranding=1&listType=playlist&list=${randomPlaylist}`,
                id: 'player',
                type: 'text/html',
                width: 800, // 160
                height: 450, // 120
                frameborder: 0,
                allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;'
            });
            console.log('the final element will be: ', iFrame);
            $('.mini-div-video').append(iFrame);
        } else if (result.id.length >= 1){
            let randomIndex = Math.floor(Math.random() * result.playlists.id.length);
            let randomSong = result.video[randomIndex].id;
            let iFrame = $('<iframe>');
            iFrame.attr({
                src: `http://www.youtube.com/embed/${randomSong}?autoplay=1&fs=0&modestbranding=1&rel=0`,
                id: 'player',
                type: 'text/html',
                width: 800, // 160
                height: 450, // 120
                frameborder: 0,
                allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;'
            });
            console.log('the final element will be: ', iFrame);
            $('.mini-div-video').append(iFrame);
        }
        console.log('video not found, the resulst is: ', result.playlists);

    }
}