var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var playerX = 0;
var playerY = 0;

var upPressed = false;
var leftPressed = false;
var rightPressed = false;
var downPressed = false;

function drawPlayer() {
  ctx.beginPath();
  ctx.rect(playerX, playerY, 10, 10);
  ctx.fillStyle = "rgb(87, 23, 175)";
  ctx.fill();
  ctx.closePath();
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

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();

  if(rightPressed && playerX < canvas.width-10) {
    playerX += 10;
  } else if(leftPressed && playerX > 0) {
    playerX -= 10;
  } else if(upPressed && playerY > 0) {
    playerY -= 10;
  } else if(downPressed && playerY < canvas.height-10) {
    playerY += 10;
  }
}

setInterval(draw, 10)
