'use strict';


//Variables
var gameWindow = document.getElementById("gameWindow").getContext("2d"); 
var gameObjects = [];
var testGameObject;
var player = new Player();


function init() {

    //testGameObject = new GameObject();
}

function start() {
    
}

// Physics handler

//events
window.setInterval(tick, 16);

function tick() {
    draw();
    update();
}

function update() {
    player.update();
    keyBoardHandlerReset();
}

function draw() {
    gameWindow.clearRect(0, 0, 800, 600);
    player.draw(gameWindow);
}