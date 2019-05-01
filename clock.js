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
        switch(this.hours) {
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
                $('.sayhi').text('Good mornig!')
                break;
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
                $('.sayhi').text('Good efternoon!')
                break;
            case 17:
            case 18:
            case 19:
            case 20:
            case 21:
                $('.sayhi').text('Good evening!')
                break;
            default :
                $('.sayhi').text('Good night!')
                break;
        }
    }
    init() {
        this.getTime();
        this.sayHi();
        setInterval(this.getTime,1000);
    }
}
