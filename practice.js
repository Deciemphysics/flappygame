var currentState,
    width,
    height,
    frames = 0,
    hero;

var states = {
    Splash: 0,
    Game: 1,
    Score: 2
}
var canvas;
var renderingContext;

class Protagonist { // This is our hero constructor 
    constructor() {
        this.x = 100;
        this.y = 150;

        this.frame = 0;
        this.velocity = 0;
        this.animation = [0, 1, 2, 1];

        this.rotation = 0;
        this.radius = 12;

        this.gravity = 0.25;
        this._jump = 4.6;
        this.peanutButter = null;

        this.jumpCount = 2;

        this.jump = function () {
            if(this.jumpCount > 0 ){
                this.velocity = -this._jump;
                this.jumpCount --;
            }
        }

        this.update = function () {
            var h = currentState === states.Splash ? 10 : 5;
            this.frame += frames % h === 0 ? 1 : 0;
            this.frame %= this.animation.length;

            if (currentState === states.Splash) {
                this.updateIdleHero()
            } else {
                this.updatePlayHero();
            }
        }

        this.updateIdleHero = function(){
            //this.y = 180;
        }

        this.updatePlayHero = function (){
            this.velocity += this.gravity;
            this.y += this.velocity;
            if(this.y >= 150){ // This checks sticking the landing
                this.y = 150; 
                this.velocity = this._jump;
                this.jumpCount = 2;
            }
        }

        this.draw = function (renderingContext) {
            renderingContext.save();

            renderingContext.translate(this.x, this.y);
            renderingContext.rotate(this.rotation);

            var h = this.animation[this.frame];
            link[h].draw(renderingContext, 20, this.y);

            renderingContext.restore();
        }
    }
}

function onPress(evt) { // Passing in an event, either touch or click
    console.log("click happened");
    switch (currentState) {
        case states.Splash:
            hero.jump();
            currentState = states.Game;
            break;
        case states.Game:
            hero.jump();
            break;
    }
}

function main() { // This is our main start function
    windowSetup();
    canvasSetup();
    currentState = states.Splash;
    document.body.appendChild(canvas);

    loadGraphics();
    hero = new Protagonist();
}


function windowSetup() { // This is defining the window for the canvas
    var windowWidth = $(window).width();
    var inputEvent = "touchstart";
    console.log(windowWidth);
    if (windowWidth < 500) {
        width = 320;
        height = 430;
    } else {
        width = 400;
        height = 430;
        inputEvent = "mousedown";
    }
    document.addEventListener(inputEvent, onPress)
}

function canvasSetup() { // This builds the canvas on the page
    canvas = document.createElement("canvas");
    canvas.style.border = "3px solid black";
    canvas.width = width;
    canvas.height = height;
    renderingContext = canvas.getContext('2d');
}

function loadGraphics() { // This is importing my graphic image and ALSO putting my sprite on my page
    var img = new Image();
    img.src = "resources/img/linkSheet.png";
    img.onload = function () {
        initSprites(this);
        renderingContext.fillStyle = "#8BE4Df";
        renderingContext.fillRect(0, 0, width, height);

        // link.draw(renderingContext, 100, 100); // this will change
        GameLoop();
    };

}

function GameLoop() { // This is our base loop for the function
    update();
    render();
    window.requestAnimationFrame(GameLoop);
}

function update() { // This is our function to keep moving him
    frames++;
    hero.update();
}

function render() { // This places our hero
    renderingContext.fillRect(0, 0, width, height);
    hero.draw(renderingContext);
}