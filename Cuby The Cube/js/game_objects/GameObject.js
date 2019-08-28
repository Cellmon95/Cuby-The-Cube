//'use strict';

//function gameObject() {

//}

//gameObject.prototype.update = function () {
    
//};

class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class GameObject {

    constructor() {
        this.position = new Vector2(0, 0);
        this.bounds = new Vector2(0, 0);
        this.movingDirection = "";
    }

    update() {
    }

    draw(gameWindow) {

    }

    onCollision(target, arg) {

    }
}
