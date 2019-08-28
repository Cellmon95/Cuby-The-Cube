'use strict';


//Variables
var gameWindow = document.getElementById("gameWindow").getContext("2d"); 
var gameObjects = [];
var testGameObject;
var player = new Player();             
var floor = new Platform(new Vector2(0, 164), new Vector2(800, 100));
var platform = new Platform(new Vector2(150, 480), new Vector2(128, 64));

init();
function init() {

    //testGameObject = new GameObject();
    gameObjects = [platform, floor];
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
    handleCollision();
}

function draw() {
    gameWindow.clearRect(0, 0, 800, 600);
    player.draw(gameWindow);
    platform.draw(gameWindow);
    floor.draw(gameWindow);
}

function handleCollision() {
    for (var i = 0; i < gameObjects.length; i++) {
        var other = gameObjects[i];
        if (colliding(player, other)) {
            player.onCollision(other, "");
        }
    }
}

function colliding(target, other) {
    if (target.position.x < other.position.x + other.bounds.x &&
        target.position.x + target.bounds.x > other.position.x &&
        target.position.y < other.position.y + other.bounds.y &&
        target.position.y + target.bounds.y > other.position.y) {
        return true;
    }
    else
        return false;
}