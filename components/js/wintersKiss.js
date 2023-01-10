
// global variables 

// to store coordinates of draggable element
var posX = 0;
var posY = 0;

// the element to be dragged
const drag = document.getElementById('draggable');

// initializing data
if (localStorage.length != 0) {
    posX = localStorage.getItem('dragPosX');
    posY = localStorage.getItem('dragPosY');

    drag.style.left = localStorage.getItem('dragOffsetLeft');
    drag.style.top = localStorage.getItem('dragOffsetTop');
}

// ----------END OF GLOBAL VARIABLES--------------


// global functions

// to handle mouse down event to trigger dragging
const mouseDownHandler = (event) => {

    // finding x and y coordinates of the mouse down event
    posX = event.clientX;
    posY = event.clientY;

    // adding event to the document
    // these event listeners will be removed at the mouse up event
    document.addEventListener('mousemove',  mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
}

// to handle dragging when mouse moves
const mouseMoveHandler = (event) => {

    // the distance mouse has been moved by
    var changeX = event.clientX - posX;
    var changeY = event.clientY - posY;

    // new position of the element
    drag.style.left = (drag.offsetLeft + changeX) + 'px';
    drag.style.top = (drag.offsetTop + changeY) + 'px';

    // set new mouse position
    posX = event.clientX;
    posY = event.clientY;

    // saving data to local storage
    localStorage.setItem('dragPosX', posX+'');
    localStorage.setItem('dragPosY', posY+'');

    localStorage.setItem('dragOffsetLeft', (drag.offsetLeft + changeX) + 'px');
    localStorage.setItem('dragOffsetTop', (drag.offsetTop + changeY) + 'px');
}

// to handle mouse up event to abort dragging and remove event listeners attached to the document
const mouseUpHandler = () => {

    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
}


drag.addEventListener('mousedown', mouseDownHandler)