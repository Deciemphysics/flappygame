var link;

class Sprite {

    constructor(img, x, y, width, height) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(renderingContext, x, y) { //renderingContext is the canvas
        renderingContext.drawImage(this.img, this.x, this.y, this.width, this.height, x, y, this.width, this.height); //drawImage() is built into JavaScript

    }
}



function initSprites(img) { // THIS IS WHERE YOU MAKE A NEW CHARACTER
    // link = new Sprite(img, 90, 0, 40, 50);
    link = [
        new Sprite(img, 0, 0, 45, 55),
        new Sprite(img, 45, 0, 45, 55),
        new Sprite(img, 90, 0, 45, 55)
    ];
}