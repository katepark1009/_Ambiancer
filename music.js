

class MusicPlayer{
    constructor( ) {
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
        let randomIndex = getRandomIndex(moodVariations[mood]);
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
            error: handleError
        };
        $.ajax(ajaxOptions);
    }
    handleSuccess( result ){
        if (result.success) {
            this.render(result);
        }
    }
    render( result ){
        const iframeOptions = {
            src: null,
            id: 'player',
            type: 'text/html',
            width: 100 + '%', // 160
            height: 80 + '%', // 120
            frameborder: 0,
            allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;'
        };
        if (result.playlists) {
            let randomIndex = Math.floor(Math.random() * result.playlists.id.length);
            let randomPlaylist = result.playlists.id[randomIndex];
            iframeOptions.src = `http://www.youtube.com/embed?autoplay=1&disablekb=1&fs=0&rel=0&modestbranding=1&listType=playlist&list=${randomPlaylist}`;
            let iFrame = $('<iframe>', iframeOptions);
            $('.mini-div-video').append(iFrame);
        } else if (result.id.length >= 1){
            let randomIndex = Math.floor(Math.random() * result.playlists.id.length);
            let randomSong = result.video[randomIndex].id;

            iframeOptions.src = `http://www.youtube.com/embed/${randomSong}?autoplay=1&fs=0&modestbranding=1&rel=0`;
            let iFrame = $('<iframe>', iframeOptions);
            $('.mini-div-video').append(iFrame);
        }
    }
}
