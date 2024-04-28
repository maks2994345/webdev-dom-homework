export function dateTime(){
    Date.prototype.format = function () {

        let day = this.getDate();
        let month = this.getMonth() + 1;
        let year = this.getFullYear() % 100;
    
        let hours = this.getHours();
        let minutes = this.getMinutes();
    
        let formattedDate = (day < 10 ? '0' : '') + day + '.' + (month < 10 ? '0' : '') + month + '.' + year;
        let formattedTime = (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes;
        return formattedDate + ' ' + formattedTime;
    }
}