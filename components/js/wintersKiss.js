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

const monthInWords = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
}

const dayInWords = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
}

// to store coordinates of draggable elements
var clockPosX = 0;
var clockPosY = 0;

var dockPosX = 0;
var dockPosY = 0;

var memoryPosX = 0;
var memoryPosY = 0;

var cpuPosX = 0;
var cpuPosY = 0;

// the elements to be dragged
const clock = document.getElementById('clock');
const dock = document.getElementById('dock');
const memoryStat = document.getElementById('memory-stat');
const cpuStat = document.getElementById('cpu-stat');

// the clock elements
const minutesDOM = document.getElementById('minutes');
const hoursDOM = document.getElementById('hours');

// the calender info element
const calenderDOM = document.getElementById('calender-info');

// initializing data
if (localStorage.length != 0) {
    clockPosX = localStorage.getItem('clockPosX');
    clockPosY = localStorage.getItem('clockPosY');

    dockPosX = localStorage.getItem('dockPosX');
    dockPosY = localStorage.getItem('dockPosY');

    memoryPosX = localStorage.getItem('memoryPosX');
    memoryPosY = localStorage.getItem('memoryPosY');

    cpuPosX = localStorage.getItem('cpuPosX');
    cpuPosY = localStorage.getItem('cpuPosY');

    clock.style.left = localStorage.getItem('clockOffsetLeft');
    clock.style.top = localStorage.getItem('clockOffsetTop');

    dock.style.left = localStorage.getItem('dockOffsetLeft');
    dock.style.top = localStorage.getItem('dockOffsetTop');

    memoryStat.style.left = localStorage.getItem('memoryOffsetLeft');
    memoryStat.style.top = localStorage.getItem('memoryOffsetTop');

    cpuStat.style.top = localStorage.getItem('cpuOffsetTop');
    cpuStat.style.left = localStorage.getItem('cpuOffsetLeft')
    
} else {
    clock.style.left = '200px';
    clock.style.top = '650px';

    dock.style.left = '930px';
    dock.style.top = '900px';
}
 
// ----------END OF GLOBAL VARIABLES--------------


// global functions

class Draggable {

    constructor(posX, posY, element, elementName) {
        this.posX = posX;
        this.posY = posY;

        this.element = element;
        this.elementName = elementName;

        element.addEventListener('mousedown', this.mouseDownHandler);
    } 

    // to handle mouse down event to trigger clockging
    mouseDownHandler = (event) => {

        // finding x and y coordinates of the mouse down event
        this.posX = event.clientX;
        this.posY = event.clientY;

        // adding event to the document
        // these event listeners will be removed at the mouse up event
        document.addEventListener('mousemove', this.mouseMoveHandler);
        document.addEventListener('mouseup', this.mouseUpHandler);
    }

    // to handle dragging when mouse moves
    mouseMoveHandler = (event) => {

        // the distance mouse has been moved by
        var changeX = event.clientX - this.posX;
        var changeY = event.clientY - this.posY;

        // new position of the element
        this.element.style.left = (this.element.offsetLeft + changeX) + 'px';
        this.element.style.top = (this.element.offsetTop + changeY) + 'px';

        // set new mouse position
        this.posX = event.clientX;
        this.posY = event.clientY;

        // saving data to local storage
        localStorage.setItem(this.elementName+'PosX', this.PosX+'');
        localStorage.setItem(this.elementName+'PosY', this.posY+'');

        localStorage.setItem(this.elementName+'OffsetLeft', (this.element.offsetLeft + changeX) + 'px');
        localStorage.setItem(this.elementName+'OffsetTop', (this.element.offsetTop + changeY) + 'px');
    }

    // to handle mouse up event to abort dragging and remove event listeners attached to the document
    mouseUpHandler = () => {

        document.removeEventListener('mousemove', this.mouseMoveHandler);
        document.removeEventListener('mouseup', this.mouseUpHandler);
    }
} 

// to format time into words
const formatTime = (hours, minutes) => {
    const hour = hoursInWords[hours];

    var minute = '';

    if(minutes < 20) {
        minute = ones[minutes];
    } else if(minutes === 20) {
        minute = tens[20];
    } else if(minutes === 30) {
        minute = tens[30];
    } else if(minutes === 40) {
        minute = tens[40];
    } else if(minutes === 50) {
        minute = tens[50]
    } else if(minutes >= 20 && minutes < 30) {
        minute = tens[20] + ' ' + ones[minutes-20];
    } else if(minutes >= 30 && minutes < 40) {
        minute = tens[30] + ' ' + ones[minutes-30];
    } else if (minutes >= 40 && minutes < 50) {
        minute = tens[40] + ' ' +ones[minutes-40];
    } else if (minutes >= 50 && minutes < 60) {
        minute = tens[50] + ' ' +ones[minutes-50];
    }

    // updating dom elements with time
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

// to format calendar info
const formatCalenderInfo = (day, date, month, year) => {

    if (date < 10 ) {
        date = '0'+date;
    }

    calenderDOM.innerText = date + ' : ' + dayInWords[day] + ' : ' + monthInWords[month] + ' ' + year;
}

// to measure calendar info such as date, day, month and year.
const calenderInfo = () => {
    var date = new Date();

    var day = date.getDay();
    var today = date.getDate();
    var month = date.getMonth();
    var year = date.getYear()%100;

    formatCalenderInfo(day, today, month, year);
}


// class to add behaviour to dock icons: namely- to issue commands to open them
class dockApplication {
    
    constructor(elementId='', command='') {
        document.getElementById(elementId+'').addEventListener('click', () => {
            terminal.execute(command);
        });
    }
}


// class to add behaviour to computer statistics
class statistics {
    
    constructor (type = '', elementId = '', factor = 100) {
        this.type = type;
        this.elementId = elementId;
        this.factor = factor;

        if(this.type === 'cpu') {
            this.cpuUsage();
        } else {
            this.memoryUse();
        }
    }

    cpuUsage = () => {
        os.cpu((usage) => {
            document.getElementById(this.elementId+'').style.width = (usage*this.factor)+'px';
        })

        setTimeout(this.cpuUsage, 1000);
    }

    memoryUse = () => {
        document.getElementById(this.elementId+'').style.width = (100 - (os.memory()*this.factor) )+ 'px';
        setTimeout(this.memoryUse, 1000)
    }
}


// class to add behaviour to menus
class Menu {

    constructor(targetElementId='', menuId='') {
         
        this.targetElementId = targetElementId;
        this.menuName = menuId+'Menu';
        this.menuId = menuId;
    }

    createMenu() {

        console.log(this.targetElementId)
        document.getElementById(this.targetElementId).addEventListener('contextmenu', (event) => {
            event.preventDefault()
            this.showMenu(event.clientX, event.clientY);
            this.menuHandler();
        })
    }

    showMenu(posX=0, posY=0) {

        document.getElementById(this.menuId).classList.remove('hidden');
        document.getElementById(this.menuId).style.top = posY+'px';
        document.getElementById(this.menuId).style.left = posX+'px';
    }

    menuHandler() {

        document.addEventListener('click', () => {
            document.getElementById(this.menuId).classList.add('hidden');
        })
    }
}

// -------------END OF GLOBAL FUNCTIONS-----------------


// actual code

// making elements draggable
const draggableClock = new Draggable(clockPosX, clockPosY, clock, 'clock');
const draggableDock = new Draggable(dockPosX, dockPosY, dock, 'dock');
const draggableCpu = new Draggable(cpuPosX, cpuPosY, cpuStat, 'cpu');
const draggableMemory = new Draggable(memoryPosX, memoryPosY, memoryStat, 'memory')

// adding behaviour to dock
const blender = new dockApplication('blender-icon', 'blender');
const files = new dockApplication('files-icon', 'nautilus');
const vscode = new dockApplication('vscode-icon', 'code');
const settings = new dockApplication('settings-icon', 'gnome-control-center');
const chrome = new dockApplication('chrome-icon', 'google-chrome');
const consol = new dockApplication('console-icon', 'gnome-terminal'); //throws error if console is used 

// adding behaviour to computer statistics
const memory = new statistics('memory', 'memory-line', 75);
const cpu = new statistics('cpu', 'cpu-line', 75);


const menu = new Menu('memory-stat', 'memory-stat-menu');
menu.createMenu();
document.getElementById('memory-remove').addEventListener('click', () => {
    document.getElementById('memory-stat').classList.add('hidden');
});

calenderInfo()

startTime()