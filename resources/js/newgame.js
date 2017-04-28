var width = 900;
var height = 500;
var canvas;
var renderingContext;
var frames = 0;
var currentState;
var states = {
    Splash: 0,
    Game: 1,
    Score: 2
};
var weaponlive = false;
var explosion = false;
var thebomb;
var holes;
var thepoof;

class Hero {
    constructor() {
        this.x = 400;
        this.y = 14;
        this.width = 100;
        this.height = 100;
        this._direction = "";
        this.friction = 0.94;
        this.maxspeed = 6;
        this.velX = 0;

        this.update = function () {
            if (currentState === states.Splash) {
                this.updatePlayingHero();
            }
        }

        this.updatePlayingHero = function () {
            if (this._direction === "left") {
                if (this.velX > -this.maxspeed) {
                    this.velX--;
                }
            }
            if (this._direction === "right") {
                if (this.velX < this.maxspeed) {
                    this.velX++;
                }
            }
            this.velX *= this.friction;
            this.x += this.velX;
        }

        this.draw = function (renderingContext) {
            renderingContext.save();
            phantom.draw(renderingContext, this.x, this.y);
            renderingContext.restore();
        }
    }
}

class Bomb {
    constructor() {
        this.x = myphantom.x;
        this.y = myphantom.y + 20;
        this.velocity = 0;
        this._jump = 4.6;
        this.gravity = 0.35;

        this.jump = function () {
            this.velocity = -this._jump;
        }
        this.update = function () {
            this.velocity += this.gravity;
            this.y += this.velocity;
            if (this.y >= 380) {
                weaponlive = false;
                holes.add();
                explosion = true;
            }
        }
        this.draw = function () {
            bombSprite.draw(renderingContext, this.x, this.y);
        }
    }
}

class Holegroup {
    constructor() {
        this.collection = [];
        this.add = function () {
            this.collection.push(new Hole());
        }
        this.draw = function () {
            for (var i = 0; i < this.collection.length; i++) {
                var hole = this.collection[i];
                hole.draw();
            }
        }
        this.reset = function () {
            this.collection = [];
        }
    }
}

class Hole {
    constructor() {
        this.x = thebomb.x - 20;
        this.y = 414;
        this.draw = function () {
            holeSprite.draw(renderingContext, this.x, this.y);
        }
    }
}

class Bigpoof {
    constructor() {
        this.frame = 0;
        this.x;
        this.y = 350;
        this.animation = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        this.update = function () {
            var r = 5;
            this.frame += frames % r === 0 ? 1 : 0;
            this.frame %= this.animation.length;
        }
        this.draw = function () {
            var f = this.animation[this.frame];
            poofSprite[f].draw(renderingContext, thebomb.x, this.y);
            if (f === 9) {
                explosion = false;
                this.frame = 0;
            }
        }
    }
}

function main() {
    windowSetup();
    canvasSetup();

    currentState = states.Splash;

    document.getElementById("canvasbox").appendChild(canvas);
    myphantom = new Hero();
    holes = new Holegroup();
    loadGraphics();
    thepoof = new Bigpoof();
}

function windowSetup() {
    document.addEventListener("keydown", onpress);
    document.addEventListener("keyup", removeMotion);
}

function canvasSetup() {
    canvas = document.createElement("canvas");
    canvas.style.border = "2px solid black";

    canvas.width = width;
    canvas.height = height;

    renderingContext = canvas.getContext("2d");
}

function removeMotion(evt) {
    myphantom._direction = "";
}

function onpress(evt) {
    //console.log(evt.keyCode + "hey key");
    switch (evt.keyCode) {
        case 37:
            myphantom._direction = "left";
            break;
        case 39:
            myphantom._direction = "right";
            break;
    }
}


function addbomb() {
    if (!weaponlive) {
        weaponlive = true;
        thebomb = new Bomb();
        thebomb.jump();
    }
}

function loadGraphics() {
    var img = new Image();
    img.src = "resources/img/spriteSheet.png";
    img.onload = function () {
        initSprites(this);
        gameLoop();
    };
}

function gameLoop() {
    frames++;
    update();
    render();
    window.requestAnimationFrame(gameLoop);
}

function update() {
    myphantom.update();
    if (weaponlive) {
        thebomb.update();
    }
    if (explosion) {
        thepoof.update();
    }
}

function render() {
    backgroundSprite.draw(renderingContext, 0, 0);
    myphantom.draw(renderingContext);
    holes.draw();
    if (weaponlive) {
        thebomb.draw();
    }
    if (explosion) {
        thepoof.draw();
    }
}