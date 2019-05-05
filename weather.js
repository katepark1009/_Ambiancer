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
        .then(function(response) { //when fetch is completed, do this
            return response.json();
        })
        .then(function(json) { //when json data is ready, do this
            console.log('json form weather :', json);
            let temperature = json.main.temp;
            let currentWeather = json.weather[0].description;
            const place = json.name;
            let weather = $('.weather');
            temperature = Math.floor(temperature);
            weather.text(`${temperature}°F @${place}`
                        );
            let weatherDiv = $('.currentweather');
            weatherDiv.text(`"${currentWeather}"`)
        });
    }
    saveCoords(coordsObj) { //save latitude & longitude in local storage
    localStorage.setItem(this.coords, JSON.stringify(coordsObj));
    }
    handleGeoSuccess(positon) { //if askForCoords success, get the latitude & longitude
        const latitude = positon.coords.latitude; 
        const longitude = positon.coords.longitude;
        const coordsObj = {
            latitude,
            longitude
        };
        this.saveCoords(coordsObj);
        this.getWeather(latitude, longitude);
    }
    askForCoords() { //getting user's geo location 
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
        console.log("Can't get the user's location");
   }
}