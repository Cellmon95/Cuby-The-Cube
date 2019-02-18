
document.addEventListener('keydown', keyPress);
document.addEventListener('keyup', keyup);


var keyPressed = {
    ArrowRight: false,
    ArrowLeft: false,
    ArrowDown: false,
    ArrowUp: false

};

var key = {
    ArrowRight: false,
    ArrowLeft: false,
    ArrowDown: false,
    ArrowUp: false
};

function keyPress(e) {
    key[e.key] = true;
}

function keyup(e) {
    for (var k in key) {
        if (k === e.key) {
            key[k] = false;
        }
    }
}

function keyBoardHandlerReset() {
    for (var key in keyPressed) {
        keyPressed[key] = false;
    }
}
