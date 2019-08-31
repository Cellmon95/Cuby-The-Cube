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
        this.position.y = 400;

        this.movingRight = true;
        this.inertia = 2;

        this.gravity = 1;
        this.onGround = true;

        this.color = "#FF0000";

        //Init sides
        //TODO:: need to have more const
        this.topSide = new GameObject();
        this.topSide.bounds = new Vector2(32, 1);
        this.topSide.position.x = this.position.x + 16;
        this.topSide.position.y = this.position.y;

        this.bottomSide = new GameObject();
        this.bottomSide.bounds = new Vector2(32, 1);
        this.bottomSide.position.x = this.position.x + 16;
        this.bottomSide.position.y = this.position.y + this.bounds.y - 1;//NOTE:: should be size and note bounds?

        this.rightSide = new GameObject();
        this.rightSide.position = new Vector2(this.position.x + this.bounds.x, this.position.y);
        this.rightSide.bounds = new Vector2(1, this.bounds.y);

        this.leftSide = new GameObject();
        this.leftSide.position = new Vector2(this.position.x, this.position.y);
        this.leftSide.bounds = new Vector2(1, this.bounds.y - 5);

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

        gameWindow.fillStyle = "#000000";
        gameWindow.fillRect(
            this.leftSide.position.x,
            this.leftSide.position.y,
            this.leftSide.bounds.x,
            this.leftSide.bounds.y
        );

        gameWindow.fillStyle = "#000000";
        gameWindow.fillRect(
            this.rightSide.position.x,
            this.rightSide.position.y,
            this.rightSide.bounds.x,
            this.rightSide.bounds.y
        );
    }

    update() {
        this._handleMovementPhysics();
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

        this.velocityY += this.gravity;


        //if (this.position.y > 500) {
        //    this.onGround = true;
        //}

        //if (this.onGround) {
        //    this.velocityY = 0;
        //    this.position.y = 500;
        //}

        this.move(this.velocityX, this.velocityY);
    }

    onCollision(target, arg) {
        while (colliding(this.topSide, target)) {
            this.velocityY = 0;
            this.move(0, 1);
        }

        while (colliding(this.bottomSide, target)) {
            this.velocityY = 0;
            this.onGround = true;
            this.move(0, -1);
        }

        while (colliding(this.rightSide, target)) {
            this.velocityX = 0;
            this.move(-1, 0);
        }

        while (colliding(this.leftSide, target)) {
            this.velocityX = 0;
            this.move(1, 0);
        }
        
    }

    setPosition(position) {
        this.position = position;

        this.topSide.position.x = this.position.x + 16;
        this.topSide.position.y = this.position.y;

        this.bottomSide.position.x = this.position.x + 16;
        this.bottomSide.position.y = this.position.y + this.bounds.y - 1;

        this.rightSide.position = new Vector2(this.position.x + this.bounds.x - 1, this.position.y);
        this.leftSide.position = new Vector2(this.position.x, this.position.y);
    }

    move(x, y) {
        this.setPosition(
            new Vector2(
                this.position.x + x, this.position.y + y
            )
        );
    }


}


