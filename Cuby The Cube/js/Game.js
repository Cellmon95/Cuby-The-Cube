'use strict';


//Variables
var gameWindow = document.getElementById("gameWindow").getContext("2d"); 
var gameObjects = [];
var testGameObject;
var player = new Player();             
var floor = new Platform(new Vector2(0, 564), new Vector2(800, 100));
var platform = new Platform(new Vector2(150, 480), new Vector2(128, 64));
var platform1 = new Platform(new Vector2(250, 380), new Vector2(128, 64));
var platform2 = new Platform(new Vector2(350, 280), new Vector2(128, 64));
var platform3 = new Platform(new Vector2(450, 180), new Vector2(128, 64));
var mapLoaded = false;
var tiles = [];
var map = NaN;

init();
function init() {

    //testGameObject = new GameObject();
    //gameObjects = [platform, platform1, platform2, platform3, floor];
    loadMap();
}

function start() {
    
}

function loadMap() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            map = JSON.parse(this.responseText);
            drawMap();
            mapLoaded = true;

        }
    };
    xhttp.open("GET", "test.json", true);
    xhttp.send();

}

function drawMap() {
    var idx = 0;

    for (var i = 0; i < map.layers[0].height; i++) {
        
        for (var j = 0; j < map.layers[0].width; j++) {
            if (map.layers[0].data[idx] === 1)
            {
                tiles.push(new Platform(new Vector2(j * 64, i * 64), new Vector2(64, 64)));
            }
            idx++;
        }
    }
}

// Physics handler

//events
window.setInterval(tick, 16);



function tick() {
    if (mapLoaded) {
        gameObjects = tiles;
        update();
        draw();
    }

}

function update() {
    player.update();
    handleCollision();
    keyBoardHandlerReset();
}

function draw() {
    gameWindow.clearRect(0, 0, 800, 600);
    for (var i = 0; i < tiles.length; i++) {
        tiles[i].draw(gameWindow);
    }
    player.draw(gameWindow);
    //platform.draw(gameWindow);
    //platform1.draw(gameWindow);
    //platform2.draw(gameWindow);
    //platform3.draw(gameWindow);
    //floor.draw(gameWindow);
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