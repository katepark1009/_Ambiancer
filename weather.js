class Weather{
    constructor(){
        this.api_key = "97649e666d867598790f35d22987b2be";
        this.coords = 'coords';
    }
    getWeather (lat,lng) {
        fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${this.api_key}&units=imperial`
        )
        
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            let temperature = json.main.temp;
            console.log('temperature :', json.main);
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
        navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
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
}