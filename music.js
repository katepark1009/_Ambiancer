

class bgMusic{
    constructor( ) {
        this.handleAjaxError = this.handleAjaxError.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
    }
    getMusic( mood ) {
        const moods = {
            happy: ['happy', 'happy instrumental'],
            sad: ['breakup', 'leaving', 'lonely'],
            hype: ['crunk', 'hyphy', 'upbeat'],
            romantic: ['love', 'instrumental ballads'],
            chill: ['lo-fi', 'tortured soul'],
            confident: ['confidence booster', 'I am the greatest']
        };

        let randomIndex = Math.floor(Math.random()*moods[mood].length);
        let randomMood = moods[mood][randomIndex];

        const ajaxOptions = {
            url: 'http://s-apis.learningfuze.com/hackathon/youtube/search.php',
            method: 'post',
            dataType: 'json',
            data: {
                q: `${randomMood} songs`,  // the string to search for
                maxResults: 10, // how many results to get
                // detailLevel: 'verbose', // default is low. how much information you will get about the video
            },
            success: this.handleSuccess,
            error: this.handleAjaxError
        };
        $.ajax(ajaxOptions);
    }
    handleSuccess( result ){
        debugger;
        if (result.success) {
            console.log('the result is...', result);

        } else {
            console.log('connection made, but request was denied...', result);
        }
    }
    handleAjaxError( result ){
        console.log('the error object...', result);
    }
}
