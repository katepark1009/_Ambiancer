class Clock {
    constructor() {
        this.getTime = this.getTime.bind(this);
        this.minutes;
        this.hours;
        this.seconds;
    }
    getTime() { //generating time and display time on DOM
        const date = new Date();
        this.minutes = date.getMinutes();
        this.hours = date.getHours();
        this.seconds = date.getSeconds();
        let clockcontent = `${this.hours <10 ? `0${this.hours}` : this.hours} : ${this.minutes <10 ?  `0${this.minutes}` : this.minutes } : ${this.seconds < 10 ? `0${this.seconds}` : this.seconds }`;
        $('.clock').text(clockcontent);
    }
    sayHi(){ //display text on DOM with time
        var text = '';
        if(this.hours> 4 && this.hours< 12){
           text = 'Good morning!';
        } else if(this.hours>=12 && this.hours< 17){
           text = 'Good afternoon!';
        } else if(this.hours >=17 && this.hours< 19){
           text='Good evening!';
        } else {
           text = 'Good night!';
        }
        $('.sayhi').text(text);
    }
    init() { //initiating time and text, and update every seconds.
        this.getTime();
        this.sayHi();
        setInterval(this.getTime,1000);
    }
}
