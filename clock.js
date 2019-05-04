class Clock {
    constructor() {
        this.getTime = this.getTime.bind(this);
        this.minutes;
        this.hours;
        this.seconds;
    }
    getTime() {
        const date = new Date();
        this.minutes = date.getMinutes();
        this.hours = date.getHours();
        this.seconds = date.getSeconds();
        let clockcontent = `${this.hours <10 ? `0${this.hours}` : this.hours} : ${this.minutes <10 ?  `0${this.minutes}` : this.minutes } : ${this.seconds < 10 ? `0${this.seconds}` : this.seconds }`;
        $('.clock').text(clockcontent);
    }
    sayHi(){
        var text = '';
        if(this.hours> 4 && this.hours< 12){
           text = 'Good morning!';
        } else if(this.hours< 17){
           text = 'Good afternoon!';
        } else if(this.hours< 22){
           text='Good evening!';
        } else {
           text = 'Good night!';
        }
        $('.sayhi').text(text);
    }
    init() {
        this.getTime();
        this.sayHi();
        setInterval(this.getTime,1000);
    }
}
