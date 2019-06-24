var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images

var bird = new Image();
var bg = new Image();
var ground = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "flappyBirdResource/images/bird.png";
bg.src = "flappyBirdResource/images/bg.png";
ground.src = "flappyBirdResource/images/fg.png";
pipeNorth.src = "flappyBirdResource/images/pipeNorth.png";
pipeSouth.src = "flappyBirdResource/images/pipeSouth.png";


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

fly.src = "flappyBirdResource/sounds/fly.mp3";
scor.src = "flappyBirdResource/sounds/score.mp3";

// on key down

document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 40;
    fly.play();
}

// pipe coordinates

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};

// draw images


function draw(){
    
    var gameover = false;

    ctx.drawImage(bg,0,0);

    for(var i = 0; i < pipe.length; i++){
        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
             
        pipe[i].x = pipe[i].x - 1.5;
        //document.getElementById("debug").innerHTML = pipe[i].x;
        if( pipe[i].x == 48 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            }); 
        }

        // detect collision
        
        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - ground.height){
            gameover = true;
        }
        
        if(pipe[i].x == 3){
            score++;
            scor.play();
        }
    }
    if(gameover)
    {
        window.alert("Your score: " + score);
        location.reload(); // reload the page
    }
    

    ctx.drawImage(ground,0,cvs.height - ground.height);
    
    ctx.drawImage(bird,bX,bY);
    
    bY += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    requestAnimationFrame(draw);
    
}
// read from scoreboard
function readFile(){
    //alert("Haha123");
    $.get('flappyBirdResource/scoreBoard.txt', function(data){
        // alert("Haha");
        // $('#1').text(data);
        $("#1").text("Jque");
    },'text');
}

readFile();
draw();

