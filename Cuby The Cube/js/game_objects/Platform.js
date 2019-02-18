


class Platform extends GameObject {

    constructor(position, bounds) {
        super();
        this.position = position;
        this.bounds = bounds;

    }

    draw(gameWindow) {
        gameWindow.fillStyle = "#000000";
        gameWindow.fillRect(this.position.x, this.position.y, this.bounds.x, this.bounds.y);
    }

}
