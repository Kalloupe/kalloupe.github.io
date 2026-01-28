const jeu = document.getElementById("jeu");
const personnage = document.getElementById("personnage");
const obstacles = document.getElementsByClassName("obstacle");

creerObstacle("90%", "100px", ["longH"]);
creerObstacle("40%", "50px", ["longH"]);
creerObstacle("30%", "200px", ["longH"]);


let posX = 0;
let posY = 0;

let moveLeft = false;
let moveRight = false;
let jumpPressed = false;
let enSaut = false;

let vitesseX = 5;
let vitesseY = 0;
let saut = 12;
let gravite = 0.6;

document.addEventListener("keydown", e => {
  if (e.code === "KeyA") {
    moveLeft = true;
  }
  if (e.code === "KeyD") {
    moveRight = true;
  }
  if (e.code === "Space") {
    jumpPressed = true;
  }
});

document.addEventListener("keyup", e => {
  if (e.code === "KeyA") {
    moveLeft = false;
  }
  if (e.code === "KeyD") {
    moveRight = false;
  }
  if (e.code === "Space") {
    jumpPressed = false;
  }
});

function enCollision(a, b) {
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();

    return (
    aRect.right > bRect.left   && 
    aRect.left < bRect.right  &&   
    aRect.bottom > bRect.top   &&   
    aRect.top < bRect.bottom
    )
}

function creerObstacle(x, y, classes = []) {
  const obstacle = document.createElement("div");

  obstacle.classList.add("obstacle");
  classes.forEach(classe => obstacle.classList.add(classe));

  obstacle.style.left = x;
  obstacle.style.bottom = y;

  jeu.appendChild(obstacle);
  return obstacle;
}

function gameLoop() {

  let nextPosX = posX;
  let nextPosY = posY;
  
  if (moveLeft) {
    nextPosX -= vitesseX;
  }
  if (moveRight) {
    nextPosX += vitesseX;
  }

  if (jumpPressed && !enSaut) {
    vitesseY = saut;
    enSaut = true;
  }
  
  nextPosY += vitesseY;
  vitesseY -= gravite;

  if (nextPosY <= 0) {
    nextPosY = 0;
    vitesseY = 0;
    enSaut = false;
  }


  const persWidth = personnage.offsetWidth;
  const persHeight = personnage.offsetHeight;

  for (const obstacle of obstacles) {
    const obsWidth = obstacle.offsetWidth;
    const obsHeight = obstacle.offsetHeight;
    const obsX = obstacle.offsetLeft - obsWidth*0.5;
    const obsY = parseFloat(getComputedStyle(obstacle).bottom);
    const obsTop = obsHeight - 1;

    // Collision DROITE
    if (
      nextPosX < posX &&
      posY < obsY + obsTop &&
      posY + persHeight > obsY + 10 &&
      posX + persWidth > obsX + obsWidth &&
      nextPosX < obsX + obsWidth
    ) {
      nextPosX = obsX + obsWidth;
    }

    // Collision GAUCHE
    if (
      nextPosX > posX &&
      posY < obsY + obsTop &&
      posY + persHeight > obsY + 10 &&
      nextPosX + persWidth > obsX &&
      posX < obsX + obsWidth
    ) {
      nextPosX = obsX - persWidth;
    }

    // Collision HAUT
    if (
      vitesseY < 0 &&
      posY >= obsY + obsTop &&
      nextPosY <= obsY + obsTop &&
      posX + persWidth > obsX &&
      posX < obsX + obsWidth
    ) {
      nextPosY = obsY + obsTop;
      vitesseY = 0;
      enSaut = false;
    }

    // Collision BAS
    if (
      vitesseY > 0 &&
      posY + persHeight >= obsY &&
      nextPosY + persHeight <= obsY + obsTop &&
      posX + persWidth > obsX &&
      posX < obsX + obsWidth
    ) {
      nextPosY = obsY - persHeight
      vitesseY = 0;
    }
  }
  
  posX = nextPosX;
  posY = nextPosY;
  personnage.style.left = posX + "px";
  personnage.style.bottom = posY + "px";

  requestAnimationFrame(gameLoop);
}

gameLoop();