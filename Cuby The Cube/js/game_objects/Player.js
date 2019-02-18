'use strict';


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

    }
    

    draw(gameWindow) {
        gameWindow.fillStyle = "#FF0000";
        gameWindow.fillRect(this.position.x, this.position.y, this.bounds.x, this.bounds.y);
        
    }

    update() {
        this._handleMovementPhysics();
    }

    _handleMovementPhysics() {
       
        if (key.ArrowRight === true) {
            this.velocityX += this.accX;
            if (this.velocityX > 10) {
                this.velocityX = 10;
            }
            this.movingRight = true;
        }
        if (key.ArrowLeft === true) {
            this.velocityX -= this.accX;
            if (this.velocityX < -10) {
                this.velocityX = -10;
            }
            this.movingRight = false;
        }
        else {
            if (this.movingRight) {
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

        this.velocityY += this.gravity;

        if (this.position.y > 500) {
            this.onGround = true;
        }

        if (this.onGround) {
            this.velocityY = 0;
            this.position.y = 500;
        }
        
        this.position.x += this.velocityX;
        this.position.y += this.velocityY;
    }

    onCollision(target, arg) {
        console.log("I collided!");
    }




}


