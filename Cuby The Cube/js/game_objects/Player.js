'use strict';

class PlayerSide {
    constructor() {
        this.size = new Vector2(0, 0);
        this.position = new Vector2(0, 0);
        this.onCollision;
    }


}


class Player extends GameObject {



    constructor() {
        super();
        this.bounds.x = 64;
        this.bounds.y = 64;

        this.velocityX = 0;
        this.velocityY = 0;

        this.accX = 3;
        this.jumpForce = 20;

        this.position.x = 50;
        this.position.y = 500;

        this.movingRight = true;
        this.inertia = 2;

        this.gravity = 1;
        this.onGround = true;

        this.color = "#FF0000";
        //TODO:: need to have more const
        this.topSide = new GameObject();
        this.topSide.bounds = new Vector2(32, 1);
        this.topSide.position.x = this.position.x + 16;
        this.topSide.position.y = this.position.y;

        this.bottomSide = new GameObject();
        this.bottomSide.bounds = new Vector2(32, 1);
        this.bottomSide.position.x = this.position.x + 16;
        this.bottomSide.position.y = this.position.y + this.bounds.y;//NOTE:: should be size and note bounds?
        //this.rightSide = new PlayerSide();
        //this.rightSide.position = new Vector2(this.bounds.x, this.bounds.y);
        //this.rightSide.size = new Vector2(1, this.bounds.y + this.position.y);
        //this.rightSide.onCollision = new function () {
        //    console.log("i collided on the right!");
        //};

    }
    

    draw(gameWindow) {

        //draw player
        gameWindow.fillStyle = this.color;
        gameWindow.fillRect(
            this.position.x,
            this.position.y,
            this.bounds.x,
            this.bounds.y
        );

        //draw topSide
        gameWindow.fillStyle = "#000000";
        gameWindow.fillRect(
            this.topSide.position.x,
            this.topSide.position.y,
            this.topSide.bounds.x,
            this.topSide.bounds.y
        );

        gameWindow.fillStyle = "#000000";
        gameWindow.fillRect(
            this.bottomSide.position.x,
            this.bottomSide.position.y,
            this.bottomSide.bounds.x,
            this.bottomSide.bounds.y
        );
    }

    update() {
        this._handleMovementPhysics();
        this.topSide.position.x = this.position.x + 16;
        this.topSide.position.y = this.position.y;

        this.bottomSide.position.x = this.position.x + 16;
        this.bottomSide.position.y = this.position.y + this.bounds.y;
        //this.rightSide.position = new Vector2(this.bounds.x, this.bounds.y);
        //this.rightSide.size = new Vector2(this.bounds.y + this.position.y, 1);
        //this.color = "#FF0000";
    }

    _handleMovementPhysics() {
       
        if (key.ArrowRight === true) {
            this.velocityX += this.accX;
            if (this.velocityX > 10) {
                this.velocityX = 10;
            }
            this.movingDirection = "RIGHT";
        }
        if (key.ArrowLeft === true) {
            this.velocityX -= this.accX;
            if (this.velocityX < -10) {
                this.velocityX = -10;
            }
            this.movingDirection = "LEFT";
        }
        else {
            if (this.movingDirection === "RIGHT") {
                this.velocityX -= this.inertia;
                if (this.velocityX < 0) {
                    this.velocityX = 0;
                }
            }
            else {
                this.velocityX += this.inertia;
                if (this.velocityX > 0) {
                    this.velocityX = 0;
                }
            }
        }

        if (key.ArrowUp) {
            if (this.onGround) {
                this.velocityY -= this.jumpForce;
            }
            this.onGround = false;
        }
        if (!this.onGround) {
            this.velocityY += this.gravity;
        }


        //if (this.position.y > 500) {
        //    this.onGround = true;
        //}

        //if (this.onGround) {
        //    this.velocityY = 0;
        //    this.position.y = 500;
        //}
        
        this.position.x += this.velocityX;
        this.position.y += this.velocityY;
    }

    onCollision(target, arg) {
        this.velocityX = 0;

        while (colliding(this.topSide, target)) {
            this.velocityY = 0;
            this.position.y += 1;
            this.topSide.position.y = this.position.y;
        }

        while (colliding(this.bottomSide, target)) {
            this.velocityY = 0;
            this.onGround = true;
            this.position.y -= 1;
            this.bottomSide.position.y = this.position.y;
        }

        //while (colliding(this, target)) {
        //    if (this.movingDirection === "RIGHT") {
        //        this.position.x -= 1;
        //    }
        //    if (this.movingDirection === "LEFT") {
        //        this.position.x += 1;
        //    }
        //}
        
    }




}


