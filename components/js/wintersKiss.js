// global variables 

const platform = os.platform();

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

// to store element states => visible or hidden as true and false
var memoryShow = true;
var cpuShow = true;
var dockShow = true;
var clockShow = true;

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
if (disk.length != 0) {

    memoryShow = disk.get('memory');
    if(memoryShow == 'false') {
        document.getElementById('memory-stat').classList.add('hidden')
    }

    cpuShow = disk.get('cpu');
    if(cpuShow == 'false') {
        document.getElementById('cpu-stat').classList.add('hidden');
    }

    dockShow = disk.get('dock');
    if(dockShow == 'false') {
        document.getElementById('dock').classList.add('hidden');
    }

    clockShow = disk.get('clock');
    if(clockShow == 'false') {
        document.getElementById('clock').classList.add('hidden')
    }
    
}
 
// ----------END OF GLOBAL VARIABLES--------------


// global functions

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
    calenderInfo(date);
    

    setTimeout(startTime, 1000);
    
}

// to format calendar info
const formatCalenderInfo = (day, date, month, year) => {

    if (date < 10 ) {
        date = '0'+date;
    }

    calenderDOM.innerText = date + ' : ' + dayInWords[day] + ' : ' + monthInWords[month] + ' ' + year;
}

// to measure calendar info such as date, day, month and year.
const calenderInfo = (date) => {

    var day = date.getDay();
    var today = date.getDate();
    var month = date.getMonth();
    var year = date.getYear()%100;

    formatCalenderInfo(day, today, month, year);
}


// class to add behaviour to dock icons: namely- to issue commands to open them
class dockApplication {
    
    constructor(elementId='', commandLin='', commandWin='') {

        document.getElementById(elementId+'').addEventListener('click', () => {
            if (platform == 'win32') {

                terminal.execute(commandWin+'');
            }  else {
                terminal.execute(command);
            }
        });
    }
}


// class to add behaviour to computer statistics
class statistics {
    
    constructor (type = '', elementId = '') {
        this.type = type;
        this.elementId = elementId;

        this.element = document.getElementById(this.elementId+'');

        if(this.type === 'cpu') {
            this.cpuUsage();
        } else {
            this.memoryUse();
        }
    }

    cpuUsage = () => {

        // getting the previous cpu usage to check if any change takes place
        var previousCpuUsage = this.element.style.width;

        previousCpuUsage = previousCpuUsage.replace('px', '');
        previousCpuUsage = parseInt(previousCpuUsage);

        
        os.cpu( (usage) => {

            usage = Math.trunc(usage*100)/100;

            // changing the width if cpu usage changes changes
            if ( usage != Math.trunc(previousCpuUsage) ) {

                this.element.style.width = usage*100+'px';
            }
        } );  

        setTimeout(this.cpuUsage, 1000);
    }

    memoryUse = () => {

        const freeRam = Math.trunc(100 - os.ram());

        // previously free ram
        var previousRam = this.element.style.width;
        previousRam = previousRam.replace('px', '');
        previousRam = parseInt(previousRam, 10);

        // changing the width
        if ( Math.trunc(previousRam) != freeRam ) {

            this.element.style.width = ( 100 - freeRam ) + 'px';
            // console.log(freeRam);
            // console.log(previousRam)
        }

        setTimeout(this.memoryUse, 1000);
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

    documentMenu(check=['']) {

        var showDocumentMenu = [];

        function checkMenu() {

            check.forEach((value) => {
                if (document.getElementById(value).classList.contains('hidden')) {
                    showDocumentMenu = [...showDocumentMenu, 'true']
                } else {
                    showDocumentMenu = [...showDocumentMenu, 'false']
                }
            })
        }

        document.addEventListener('contextmenu', (event) => {

            checkMenu()

            if(showDocumentMenu.includes('false')) {

            } else {

                event.preventDefault();

                this.showMenu(event.clientX, event.clientY);
                this.menuHandler();

            }
            showDocumentMenu = []
        })
    }
}

// -------------END OF GLOBAL FUNCTIONS-----------------


// actual code

// making elements draggable
const draggableClock = element.draggable(clock, 'clock');
const draggableDock = element.draggable(dock, 'dock');
const draggableCpu = element.draggable(cpuStat, 'cpuStat');
const draggableMemory = element.draggable(memoryStat, 'memoryStat');

// adding behaviour to dock
const blender = new dockApplication('blender-icon', 'blender', 'start blender');
const files = new dockApplication('files-icon', 'nautilus', 'start .');
const vscode = new dockApplication('vscode-icon', 'code', 'code');
const settings = new dockApplication('settings-icon', 'gnome-control-center', 'start ms-settings:home');
const chrome = new dockApplication('chrome-icon', 'google-chrome', 'start chrome');
const consol = new dockApplication('console-icon', 'gnome-terminal', 'start'); //throws error if console is used 

// adding behaviour to computer statistics
const memory = new statistics('memory', 'memory-line');
const cpu = new statistics('cpu', 'cpu-line');


// adding behaviour to memory stat menu
const Memorymenu = new Menu('memory-stat', 'memory-stat-menu');
Memorymenu.createMenu();
document.getElementById('memory-remove').addEventListener('click', () => {
    document.getElementById('memory-stat').classList.add('hidden');

    disk.store('memory', 'false')
});

// adding behaviour to cpu stat menu
const cpuMenu = new Menu('cpu-stat', 'cpu-stat-menu');
cpuMenu.createMenu();
document.getElementById('cpu-remove').addEventListener('click', () => {
    document.getElementById('cpu-stat').classList.add('hidden');

    disk.store('cpu', 'false');
})

// adding behaviour to dock menu
const dockMenu = new Menu('dock', 'dock-menu');
dockMenu.createMenu();
document.getElementById('dock-remove').addEventListener('click', () => {
    document.getElementById('dock').classList.add('hidden');

    disk.store('dock', 'false');
})

// adding behaviour to clock menu
const clockMenu = new Menu('clock', 'clock-menu');
clockMenu.createMenu();
document.getElementById('clock-remove').addEventListener('click', () => {
    document.getElementById('clock').classList.add('hidden');

    disk.store('clock', 'false');
})

// adding behaviour to document menu
const documentMenu = new Menu('document', 'document-menu');
documentMenu.documentMenu(['memory-stat-menu', 'cpu-stat-menu', 'dock-menu', 'clock-menu']);
document.getElementById('show-removed').addEventListener('click', () => {
    disk.store('memory', 'true');
    disk.store('cpu', 'true');
    disk.store('dock', 'true');
    disk.store('clock', 'true');
    document.getElementById('memory-stat').classList.remove('hidden');
    document.getElementById('cpu-stat').classList.remove('hidden');
    document.getElementById('dock').classList.remove('hidden');
    document.getElementById('clock').classList.remove('hidden');
})

startTime();