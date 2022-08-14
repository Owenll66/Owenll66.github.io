var cvs = undefined;
var ctx = undefined;

// some variables
var gap = 120;
var constant;

var bX = 10;
var bY = 150;

var gravity = 1.5;

var score = 0;

// audio files

var fly = new Audio();
var scor = new Audio();

// load images
var bird = new Image();
var bg = new Image();
var ground = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "/assets/flappy-bird/images/bird.png";
bg.src = "/assets/flappy-bird/images/bg.png";
ground.src = "/assets/flappy-bird/images/fg.png";
pipeNorth.src = "/assets/flappy-bird/images/pipeNorth.png";
pipeSouth.src = "/assets/flappy-bird/images/pipeSouth.png";
fly.src = "/assets/flappy-bird/sounds/fly.mp3";
scor.src = "/assets/flappy-bird/sounds/score.mp3";

function moveUp(e) {
    if (e.key === 'f')
    {
        bY -= 40;
        fly.play();
    }
}

// pipe coordinates
var pipe = [];

// on key down
document.addEventListener("keydown",moveUp);

window.onload = function()
{
    cvs = document.getElementById("canvas");
    ctx = cvs.getContext("2d");

    pipe[0] = {
        x : cvs.width,
        y : 0
    };
    draw();
}


// draw images
var gameOver = true;
function draw()
{
    ctx.drawImage(bg,0,0);

    for(var i = 0; i < pipe.length; i++){
        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
             
        pipe[i].x = pipe[i].x - 1.5;
        //document.getElementById("debug").innerHTML = pipe[i].x;
        if( pipe[i].x == 48 )
        {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            }); 
        }

        // detect collision
        
        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - ground.height){
            if(gameOver)
            {
                gameOver = false;
                window.alert("Your score: " + score);
                location.reload(); // reload the page
            }
        }
        
        if(pipe[i].x == 3)
        {
            score++;
            scor.play();
        }
    }

    ctx.drawImage(ground,0,cvs.height - ground.height);

    ctx.drawImage(bird,bX,bY);

    bY += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);

    requestAnimationFrame(draw);
}


