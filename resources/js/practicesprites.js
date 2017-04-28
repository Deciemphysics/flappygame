var link;
var hyrule;
var octorokSprite;
var treeSprite;
var treeSprite2;
var treeSprite3;
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
    hyrule = new Sprite(img, 0, 63, 500, 373);
    link = [
        new Sprite(img, 0, 0, 45, 55),
        new Sprite(img, 45, 0, 45, 55),
        new Sprite(img, 90, 0, 45, 55)
    ];
    octorokSprite = [
        new Sprite(img, 150, 0, 45, 35),
        new Sprite(img, 195, 0, 45, 35),
        new Sprite(img, 240, 0, 45, 35)
    ];
    treeSprite = new Sprite(img, 3, 450, 65, 80);
    treeSprite2 = new Sprite(img, 65, 450, 70, 80);
    treeSprite3 = new Sprite(img, 135, 450, 70, 80);
}