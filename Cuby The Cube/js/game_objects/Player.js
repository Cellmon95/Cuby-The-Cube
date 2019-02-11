'use strict';


class Player extends GameObject {

    constructor() {
        super();
        this.bounds.x = 64;
        this.bounds.y = 64;
       
    }
    

    draw(gameWindow) {
        gameWindow.fillStyle = "#FF0000";
        gameWindow.fillRect(this.position.x, this.position.y, this.bounds.x, this.bounds.y);
    }

    update() {
        if (key["ArrowRight"]) {
            this.position.x += 5;
        }
        if (key["ArrowLeft"]) {
            this.position.x -= 5;
        }
        if (key["ArrowUp"]) {
            this.position.y -= 5;
        }
        if (key["ArrowDown"]) {
            this.position.y += 5;
        }

    }

}


