var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var playerX = 0;
var playerY = 20;

var upPressed = false;
var leftPressed = false;
var rightPressed = false;
var downPressed = false;

var colliding = false;

var barrierCount = 6

var barrierOffset = 60;
var barrierHeight = 250;
var barrierWidth = 10;
var barriers = []

function drawBarriers() {
  // var barX = ((b*barrierOffset)+barrierOffset)
  // if(barrierCount % 2 == 0) {
  //   barriers[barrierCount] = { x: canvas.width-barrierWidth, y: 0 }
  // } else {
  //   barriers[barrierCount] = { x: canvas.width-barrierWidth, y: canvas.height-barrierHeight }
  // }
  // ctx.beginPath();
  // ctx.rect(barriers[barrierCount].x, barriers[barrierCount].y, barrierWidth, barrierHeight);
  // ctx.fillStyle = "#0095DD";
  // ctx.fill();
  // ctx.closePath();
  // barrierCount += 1;

  for(b=0; b < barrierCount; b++ ) {
    var barX = ((b*barrierOffset)+barrierOffset)
    if(b % 2 == 0) {
      barriers[b] = { x: barX, y: 0, colliding: false }
    } else {
      barriers[b] = { x: barX, y: canvas.height-barrierHeight, colliding: false }
    }
    ctx.beginPath();
    ctx.rect(barriers[b].x, barriers[b].y, barrierWidth, barrierHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
}

// function drawBarriers() {
//   for( b=0; b < barrierCount; b++) {
//     ctx.beginPath();
//     ctx.rect(barriers[b].x, barriers[b].y, barrierWidth, barrierHeight);
//     ctx.fillStyle = "#0095DD";
//     ctx.fill();
//     ctx.closePath();
//   }
// }

function moveBarriers() {
  for( b=0; b < barrierCount; b++) {
    barriers[b].x -= 40;
  }
}

function drawPlayer() {
  ctx.beginPath();
  ctx.rect(playerX, playerY, 10, 10);
  ctx.fillStyle = "rgb(87, 23, 175)";
  ctx.fill();
  ctx.closePath();
}

function drawStart() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#a14b0b";
  ctx.fillText("START", 8, 15)
}

function drawFinish() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#a14b0b";
  ctx.fillText("FINISH", canvas.width-60, canvas.height-10)
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = true;
  } else if(e.keyCode == 37) {
    leftPressed = true;
  } else if(e.keyCode == 38) {
    upPressed = true;
  } else if(e.keyCode == 40) {
    downPressed = true;
  }
  collisionDetection();
}

function keyUpHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = false;
  } else if(e.keyCode == 37) {
    leftPressed = false;
  } else if(e.keyCode == 38) {
    upPressed = false;
  } else if(e.keyCode == 40) {
    downPressed = false;
  }
}

function collisionDetection() {
  for(b = 0; b < barrierCount; b++) {
    var d = barriers[b];
    console.log(d, playerX, playerY)
    if( playerX == d.x-barrierWidth ||
        playerX == d.x+barrierWidth ||
        playerY == d.y-barrierWidth ||
        playerY == d.y+barrierHeight) {
      d.colliding = true;
    }
    else {
      d.colliding = false;
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawStart();
  drawFinish();
  drawPlayer();
  drawBarriers();
  // collisionDetection();

  if(rightPressed && playerX < canvas.width-10 && !colliding) {
    playerX += 10;
  } else if(leftPressed && playerX > 0 && !colliding) {
    playerX -= 10;
  } else if(upPressed && playerY > 0 && !colliding) {
    playerY -= 10;
  } else if(downPressed && playerY < canvas.height-10 && !colliding) {
    playerY += 10;
  }
}

setInterval(draw, 50)
// setInterval(drawBarrier, 2500)
// setInterval(moveBarriers, 1250)
