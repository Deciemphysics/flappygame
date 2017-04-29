var currentState,
    width,
    height,
    frames = 0,
    ogroup,
    o2group,
    backTrees,
    trees,
    score = 0,
    hiScore = 0,
    oVelocity = 3,
    hero;

var states = {
    Splash: 0,
    Game: 1,
    Score: 2
}
var canvas;
var renderingContext;

class OctoGroup {
    constructor() {

        this.collection = [];

        this.reset = function () {
            this.collection = [];
        }

        this.add = function () {
            this.collection.push(new Octorok());
        }

        this.update = function () { // How often they come in
            //var randomFrame = 90 + 25*(Math.floor(Math.random() * 3));
            //console.log(randomFrame);
            if (frames % 73 === 0) { // ADD AN OCTOROK
                this.add();
                //console.log(this.collection.length);
            }

            for (var i = 0, len = this.collection.length; i < len; i++) {
                var octorok = this.collection[i];



                if (i == 0) {
                    octorok.detectCollision();
                    //console.log(octorok.width)
                }
                octorok.x -= octorok.vel;
                octorok.frame += frames % 10 === 0 ? 1 : 0;
                octorok.frame %= octorok.animation.length;
                if (octorok.x < -octorok.width) {
                    this.collection.splice(i, 1);
                    score++;
                    i--;
                    len--;
                }

            }
        }

        this.draw = function () {
            for (var i = 0, len = this.collection.length; i < len; i++) {
                var octorok = this.collection[i];
                octorok.draw();
            }
        }
    }
}
class OctoGroup2 {
    constructor() {

        this.collection = [];

        this.reset = function () {
            this.collection = [];
        }

        this.add = function () {
            this.collection.push(new Octorok2());
        }

        this.update = function () { // How often they come in
            //var randomFrame = 90 + 25*(Math.floor(Math.random() * 3));
            //console.log(randomFrame);
            if (frames % 113 === 0) { // ADD AN OCTOROK
                this.add();
            }


            for (var i = 0, len = this.collection.length; i < len; i++) {
                var octorok2 = this.collection[i];



                if (i == 0) {
                    octorok2.detectCollision();
                }

                octorok2.x -= octorok2.vel;
                octorok2.frame += frames % 10 === 0 ? 1 : 0;
                octorok2.frame %= octorok2.animation.length;
                if (octorok2.x < -octorok2.width) {
                    this.collection.splice(i, 1);
                    score++;
                    i--;
                    len--;
                }
            }
        }

        this.draw = function () {
            for (var i = 0, len = this.collection.length; i < len; i++) {
                var octorok2 = this.collection[i];
                octorok2.draw();
            }
        }
    }
}

class Octorok {
    constructor() {
        this.x = 400;
        this.y = 300; //+ Math.floor(Math.random()*50);
        this.frame = 0;
        this.vel = oVelocity;
        this.animation = [0, 1, 2, 1];
        this.rotation = 0;
        this.width = octorokSprite[0].width;
        this.height = octorokSprite[0].height;

        this.detectCollision = function () {
            if (this.x <= (hero.x + hero.width - 3) && this.x >= hero.x && (this.height + 153) <= (hero.y + hero.height)) {
                //console.log(score);
                currentState = states.Score;
            }
        }

        this.draw = function () {
            var h = this.animation[this.frame];


            octorokSprite[h].draw(renderingContext, this.x, this.y);
        }
    }
}
class Octorok2 {
    constructor() {
        this.x = 400;
        this.y = 305; //+ Math.floor(Math.random()*50);
        this.vel = oVelocity;
        this.frame = 0;
        this.animation = [0, 1, 2, 1];
        this.rotation = 0;
        this.width = octorokSprite[0].width;
        this.height = octorokSprite[0].height;

        this.detectCollision = function () {
            if (this.x <= (hero.x + hero.width - 3) && this.x >= hero.x && (this.height + 153) <= (hero.y + hero.height)) {
                //console.log(score);
                currentState = states.Score;
            }
        }

        this.draw = function () {
            var h = this.animation[this.frame];


            octorokSprite[h].draw(renderingContext, this.x, this.y);
        }
    }
}
class TreeGroup {
    constructor() {
        this.collection = [];

        this.reset = function () {
            this.collection = [];
        }

        this.add = function () {
            switch (Math.floor(Math.random() * 3)) {
                case 0:
                    this.collection.push(new Tree());
                    break;
                case 1:
                    this.collection.push(new Tree2());
                    break;
                case 2:
                    this.collection.push(new Tree3());
                    break;

            }
        }

        this.update = function () {
            if (frames % 5 === 0) {
                this.add();
            }
            for (var i = 0, len = this.collection.length; i < len; i++) {
                var tree = this.collection[i];


                tree.x -= 2;
                if (tree.x < -tree.width) {
                    this.collection.splice(i, 1);
                    i--;
                    len--;
                }

            }
        }
        this.draw = function () {
            for (var i = 0, len = this.collection.length; i < len; i++) {
                var tree = this.collection[i];
                tree.draw();
            }
        }

    }
}
/*
class backTreeGroup {
    constructor() {
        this.collection = [];

        this.reset = function () {
            this.collection = [];
        }

        this.add = function () {
            switch (Math.floor(Math.random() * 3)) {
                case 0:
                    this.collection.push(new backTree());
                    break;
                case 1:
                    this.collection.push(new backTree2());
                    break;
                case 2:
                    this.collection.push(new backTree3());
                    break;

            }
        }

        this.update = function () {
            if (frames % 10 === 0) {
                this.add();
            }
            for (var i = 0, len = this.collection.length; i < len; i++) {
                var backTree = this.collection[i];


                backTree.x -= 2;
                if (backTree.x < -backTree.width) {
                    this.collection.splice(i, 1);
                    i--;
                    len--;
                }

            }
        }
        this.draw = function () {
            for (var i = 0, len = this.collection.length; i < len; i++) {
                var backTree = this.collection[i];
                backTree.draw();
            }
        }

    }
}
*/


class Tree {
    constructor() {
        this.x = 400;
        this.y = (330 + Math.floor(Math.random() * 25));
        this.width = 100;

        this.draw = function () {
            treeSprite.draw(renderingContext, this.x, this.y);
        }

    }
}
class Tree2 {
    constructor() {
        this.x = 400;
        this.y = (328 + Math.floor(Math.random() * 25));
        this.width = 100;

        this.draw = function () {
            treeSprite2.draw(renderingContext, this.x, this.y);
        }

    }
}
class Tree3 {
    constructor() {
        this.x = 400;
        this.y = (328 + Math.floor(Math.random() * 25));
        this.width = 100;

        this.draw = function () {

            treeSprite3.draw(renderingContext, this.x, this.y);
        }

    }
}
/* I DO NOT LIKE TREES IN THE BACKGROUND
class backTree {
    constructor() {
        this.x = 400;
        this.y = (240 + Math.floor(Math.random() * 15));
        this.width = 100;

        this.draw = function () {
            treeSprite.draw(renderingContext, this.x, this.y);
        }

    }
}
class backTree2 {
    constructor() {
        this.x = 400;
        this.y = (240 + Math.floor(Math.random() * 15));
        this.width = 100;

        this.draw = function () {
            treeSprite2.draw(renderingContext, this.x, this.y);
        }

    }
}
class backTree3 {
    constructor() {
        this.x = 400;
        this.y = (240 + Math.floor(Math.random() * 15));
        this.width = 100;

        this.draw = function () {

            treeSprite3.draw(renderingContext, this.x, this.y);
        }

    }
}

*/
class Protagonist { // This is our hero constructor 
    constructor() {
        this.x = 50;
        this.y = 145;
        this.width = 45;
        this.height = 55;

        this.frame = 0;
        this.velocity = 0;
        this.animation = [0, 1, 2, 1];

        this.rotation = 0;
        this.radius = 12;

        this.gravity = 0.25;
        this._jump = 4.4;
        this.peanutButter = null;

        this.jumpCount = 2;

        this.jump = function () {
            if (this.jumpCount > 0) {
                this.velocity = -this._jump;
                this.jumpCount--;
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

        this.updateIdleHero = function () {
            //this.y = 180;
        }

        this.updatePlayHero = function () {
            this.velocity += this.gravity;
            this.y += this.velocity;
            if (this.y >= 145) { // This checks sticking the landing
                this.y = 145;
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
    //console.log("click happened");
    switch (currentState) {
        case states.Splash:
            hero.jump();
            currentState = states.Game;
            break;
        case states.Game:
            hero.jump();
            break;
        case states.Score:
            ogroup.reset();
            o2group.reset();
            if (score > hiScore) {
                localStorage.hiScore = score;
                hiScore = localStorage.hiScore;
            }
            score = 0;
            oVelocity = 3;
            currentState = states.Splash;
            break;
    }
}

function main() { // This is our main start function
    windowSetup();
    canvasSetup();
    currentState = states.Splash;
    document.getElementById("wrapper").appendChild(canvas);
    if (localStorage.hiScore) {
        hiScore = localStorage.hiScore;
    }
    loadGraphics();
    hero = new Protagonist();
    ogroup = new OctoGroup();
    o2group = new OctoGroup2();
    trees = new TreeGroup();
    console.log("Try clicking the turbo button when the octoroks are moving. It WILL make you jump. Be careful!");
    //backTrees = new backTreeGroup();
}


function windowSetup() { // This is defining the window for the canvas
    var windowWidth = $(window).width();
    var inputEvent = "touchstart";
    // console.log(windowWidth);
    if (windowWidth < 500) {
        width = 320;
        height = 370;
    } else {
        width = 400;
        height = 370;
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
        renderingContext.fillStyle = "#000000";
        renderingContext.fillRect(0, 0, width, height);
        renderingContext.font = "30px Permanent Marker";
        renderingContext.textAlign = "center";

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
    //backTrees.update();
    if (currentState === states.Game) {
        ogroup.update();
        o2group.update();
    }
    hero.update();
    trees.update();
    document.getElementById("score").innerHTML = "Score: " + score;
    document.getElementById("hiscore").innerHTML = "Hi-Score: " + hiScore;

}

function render() { // This places our hero
    renderingContext.fillRect(0, 0, width, height);
    hyrule.draw(renderingContext, 0, 0);
    // octorokSprite.draw(renderingContext, 220, 340);
    //backTrees.draw(renderingContext);
    ogroup.draw(renderingContext);
    o2group.draw(renderingContext);
    hero.draw(renderingContext);
    trees.draw(renderingContext);
    if (currentState === states.Splash) {
        renderingContext.fillText("Double Jump to Win!", canvas.width / 2, canvas.height / 2);
        renderingContext.fillText("Click to Begin!", canvas.width / 2, canvas.height * 2 / 3);
    }
    if (currentState === states.Score) {
        renderingContext.fillText("Game Over!", canvas.width / 2, canvas.height / 2);
        renderingContext.fillText("Click to Restart!", canvas.width / 2, canvas.height * 2 / 3)
    }
}

function turbo (){
    setTimeout(function(){
        oVelocity = 15;
    }, 2000);
}