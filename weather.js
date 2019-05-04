class Weather{
    constructor(){
        this.api_key;
        this.coords = 'coords';
        this.handleGeoSuccess = this.handleGeoSuccess.bind(this);
    }
    getWeather (lat,lng) { 
        this.api_key = keys.weather;
        fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${this.api_key}&units=imperial`
        )
        
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            let temperature = json.main.temp;
            const place = json.name;
            let weather = $('.weather');
            temperature = Math.floor(temperature);
            weather.text(`${temperature}°F @${place}`
                        );
        });
    }
    saveCoords(coordsObj) {
    localStorage.setItem(this.coords, JSON.stringify(coordsObj));
    }
    handleGeoSuccess(positon) {
        const latitude = positon.coords.latitude; 
        const longitude = positon.coords.longitude;
        const coordsObj = {
            latitude,
            longitude
        };
        this.saveCoords(coordsObj);
        this.getWeather(latitude, longitude);
    }
    askForCoords() {
        navigator.geolocation.getCurrentPosition(this.handleGeoSuccess, this.handleGeoError)
    }
    loadCoords(){
        const loadCoords = localStorage.getItem(this.coords);
         if (loadCoords === null) {
            this.askForCoords () ;
        } else {
            const parseCoords = JSON.parse(loadCoords);
            this.getWeather(parseCoords.latitude, parseCoords.longitude);
        }
    }
   init() {
    this.loadCoords();
   }
   handleGeoError(){
        console.log('there was an error');
   }
}