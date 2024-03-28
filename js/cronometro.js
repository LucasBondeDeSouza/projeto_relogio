const thousandths = document.getElementById('thousandths');
const seconds = document.getElementById('seconds');
const minutes = document.getElementById('minutes');
const hours = document.getElementById('hours');
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const clear = document.getElementById('clear');

let count = 0;
let count_seconds = 0;
let count_minutes = 0;
let count_hours = 0;
let timerInterval;

start.addEventListener("click", () => {
    start.style.display = 'none'
    stop.style.display = 'block'
    clear.style.display = 'block'

    timerInterval = setInterval(function() {
        count++;

        if (count < 10) {
            thousandths.innerHTML = `0${count}`;
        } else {
            thousandths.innerHTML = count;
        }

        if (count === 100) { // Assuming 1000 milliseconds = 1 second
            count = 0;
            count_seconds++;
            if (count_seconds < 10){
                seconds.innerHTML = `0${count_seconds}`;
            } else {
                seconds.innerHTML = count_seconds;
            }
            thousandths.innerHTML = '00';
        }

        if (count_seconds === 60) {
            count_seconds = 0;
            count_minutes++;
            if (count_minutes < 10){
                minutes.innerHTML = `0${count_minutes}`;
            } else {
                minutes.innerHTML = count_minutes;
            }
            seconds.innerHTML = '00';
        }

        if (count_minutes === 60) {
            count_minutes = 0;
            count_hours++;
            if (count_hours < 10) {
                hours.innerHTML = `0${count_hours}`;
            } else {
                hours.innerHTML = count_hours;
            }
            minutes.innerHTML = '00';
        }
    }, 10);
});

stop.addEventListener("click", () => {
    start.style.display = 'block'
    stop.style.display = 'none'
    clear.style.display = 'block'
    clearInterval(timerInterval);
});

clear.addEventListener("click", () => {
    start.style.display = 'block'
    stop.style.display = 'none'
    clear.style.display = 'none'
    clearInterval(timerInterval);
    count = 0;
    count_seconds = 0;
    count_minutes = 0;
    count_hours = 0;
    thousandths.innerHTML = '00';
    seconds.innerText = '00';
    minutes.innerHTML = '00';
    hours.innerHTML = '00';
});