var currentState,
    width,
    height,
    frames = 0,
    hero;

var states = {
    splash: 0,
    game: 1,
    score: 2
}
var canvas;
var renderingContext;

class Protagonist{
    constructor(){
        this.x = 140;
        this.y = 0;
        
        this.frame = 0;
        this.velocity = 0;
        this.animation = [0,1,2,1];

        this.rotation = 0;
        this.radius = 12;

        this.gravity = 0.25;
        this._jump = 4.6;
        this.peanutButter = null;

        this.update = function(){
            var h = currentState === states.splash ? 10 : 5;
            this.frame += frames % h === 0 ? 1: 0;
            this.frame %= this.animation.length;
            
        }

        this.draw = function(renderingContext){
            renderingContext.save();

            renderingContext.translate(this.x, this.y);
            renderingContext.rotate(this.rotation);

            var h = this.animation[this.frame];
            link[h].draw(renderingContext, 20, 100);

            renderingContext.restore();
        }
    }
}

function main(){
    windowSetup();
    canvasSetup();
    currentState = states.splash;
    document.body.appendChild(canvas);

    loadGraphics();
    hero = new Protagonist();
}


function windowSetup(){
    var windowWidth = $(window).width();
    console.log(windowWidth);
    if(windowWidth < 500){
        width = 320;
        height = 430;
    } else {
        width = 400;
        height = 430;
    }
}

function canvasSetup(){
    canvas = document.createElement("canvas");
    canvas.style.border = "3px solid black";
    canvas.width = width;
    canvas.height = height;
    renderingContext = canvas.getContext('2d');
}

function loadGraphics(){
    var img = new Image();
    img.src = "resources/img/linkSheet.png";
    img.onload = function(){
        initSprites(this);
        renderingContext.fillStyle = "#8BE4Df";
        renderingContext.fillRect(0,0, width, height);

       // link.draw(renderingContext, 100, 100); // this will change
       gameLoop();
    };
    
}

function gameLoop(){
    update();
    render();
    window.requestAnimationFrame(gameLoop);
}

function update(){
    frames ++;
    hero.update();
}
function render(){
    renderingContext.fillRect(0,0,width,height);
    hero.draw(renderingContext);
}