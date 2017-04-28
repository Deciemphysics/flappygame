var phantom;
var backgroundSprite;
var bombSprite;
var holeSprite;
var poofSprite;

function Sprite(img, x, y, width, height){
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Sprite.prototype.draw = function(renderingContext, x, y){
    renderingContext.drawImage(this.img, this.x, this.y, this.width, this.height, x, y, this.width, this.height);
};

function initSprites(img){
    phantom = new Sprite(img, 0, 250, 95, 100);
    backgroundSprite = new Sprite(img, 100, 0, 900, 500);
    bombSprite = new Sprite(img, 0, 350, 80, 80);
    holeSprite = new Sprite(img, 100, 500, 140, 30);
    poofSprite = [
        new Sprite(img, 0, 600, 90, 100),
        new Sprite(img, 100, 600, 90, 100),
        new Sprite(img, 200, 600, 90, 100),
        new Sprite(img, 300, 600, 90, 100),
        new Sprite(img, 400, 600, 90, 100),
        new Sprite(img, 500, 600, 90, 100),
        new Sprite(img, 600, 600, 90, 100),
        new Sprite(img, 700, 600, 90, 100),
        new Sprite(img, 800, 600, 90, 100),
        new Sprite(img, 900, 600, 90, 100)
    ];
}