
// global variables 

// to store time in words
const hoursInWords = {
    0: 'ZERO',
    1: 'ONE',
    2: 'TWO',
    3: 'THREE',
    4: 'FOUR',
    5: 'FIVE',
    6: 'SIX',
    7: 'SEVEN',
    8: 'EIGHT',
    9: 'NINE',
    10: 'TEN',
    11: 'ELEVEN',
    12: 'TWELVE',
    13: 'ONE',
    14: 'TWO',
    15: 'THREE',
    16: 'FOUR',
    17: 'FIVE',
    18: 'SIX',
    19: 'SEVEN',
    20: 'EIGHT',
    21: 'NINE',
    22: 'TEN',
    23: 'ELEVEN',
}

const ones = {
    0: 'Zero',
    1: 'One',
    2: 'Two',
    3: 'Three',
    4: 'Four',
    5: 'Five',
    6: 'Six',
    7: 'Seven',
    8: 'Eight',
    9: 'Nine',
    10: 'Ten',
    11: 'Eleven',
    12: 'Twleve',
    13: 'Thirteen',
    14: 'Fourteen',
    15: 'Fifteen',
    16: 'Sixteen',
    17: 'Seventeen',
    18: 'Eighteen',
    19: 'Nineteen',
}

const tens = {
    20: 'Twenty',
    30: 'Thirty',
    40: 'Forty',
    50: 'Fifty',
    60: 'Sixty'
}

// to store coordinates of draggable element
var clockPosX = 0;
var clockPosY = 0;

// the element to be dragged
const clock = document.getElementById('clock');

// the clock elements
const minutesDOM = document.getElementById('minutes');
const hoursDOM = document.getElementById('hours');

// initializing data
if (localStorage.length != 0) {
    clockPosX = localStorage.getItem('clockPosX');
    clockPosY = localStorage.getItem('clockPosY');

    clock.style.left = localStorage.getItem('clockOffsetLeft');
    clock.style.top = localStorage.getItem('clockOffsetTop');
} else {
    clock.style.left = '200px';
    clock.style.top = '650px';
}
 
// ----------END OF GLOBAL VARIABLES--------------


// global functions

// to handle mouse down event to trigger clockging
const mouseDownHandler = (event) => {

    // finding x and y coordinates of the mouse down event
    clockPosX = event.clientX;
    clockPosY = event.clientY;

    // adding event to the document
    // these event listeners will be removed at the mouse up event
    document.addEventListener('mousemove',  mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
}

// to handle dragging when mouse moves
const mouseMoveHandler = (event) => {

    // the distance mouse has been moved by
    var changeX = event.clientX - clockPosX;
    var changeY = event.clientY - clockPosY;

    // new position of the element
    clock.style.left = (clock.offsetLeft + changeX) + 'px';
    clock.style.top = (clock.offsetTop + changeY) + 'px';

    // set new mouse position
    clockPosX = event.clientX;
    clockPosY = event.clientY;

    // saving data to local storage
    localStorage.setItem('clockPosX', clockPosX+'');
    localStorage.setItem('clockPosY', clockPosY+'');

    localStorage.setItem('clockOffsetLeft', (clock.offsetLeft + changeX) + 'px');
    localStorage.setItem('clockOffsetTop', (clock.offsetTop + changeY) + 'px');
}

// to handle mouse up event to abort dragging and remove event listeners attached to the document
const mouseUpHandler = () => {

    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
}

// to format time
const formatTime = (hours, minutes) => {
    const hour = hoursInWords[hours];

    var minute = '';

    if(minutes < 20) {
        minute = ones[minutes];
    } else if(minutes >= 20 && minutes < 30) {
        minute = tens[20] + ' ' + ones[minutes-20];
    } else if(minutes >= 30 && minutes < 40) {
        minute = tens[30] + ' ' + ones[minutes-30];
    } else if (minutes >= 40 && minutes < 50) {
        minute = tens[40] + ' ' +ones[minutes-40];
    } else if (minutes >= 50 && minutes < 60) {
        minute = tens[50] + ' ' +ones[minutes-50];
    }

    hoursDOM.innerText = hour+': ';
    minutesDOM.innerText = minute+'';
}

// to measure time
function startTime() {
    var date = new Date();

    var hours = date.getHours();
    var minute = date.getMinutes();
    
    formatTime(hours, minute);

    setTimeout(startTime, 1000)
    
}

// -------------END OF GLOBAL FUNCTIONS-----------------


clock.addEventListener('mousedown', mouseDownHandler)

startTime()