

function main(){
    windowSetup();
    canvasSetup();
    currentState = states.splash;
    document.body.appendChild(canvas);
    loadGraphics();
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
    img.src = "resources/img/link.png";
    img.onload = function(){
        renderingContext.fillStyle = "#8BE4Df";
    }
}