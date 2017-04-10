var link;
function Sprite(img, x, y, width, height){
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}
Sprite.prototype.draw = function(renderingContext, x, y){
    renderingContext.drawImage(this.img, this.x, this.y, this.width, this.height, x, y, this.width, this.height); // drawImage() is BUILT INTO javascript
}

function initSprites(img){ // THIS IS WHERE YOU MAKE A NEW CHARACTER
    link = new Sprite(img, 0, 0, 40, 50);

}