const jeu = document.getElementById("jeu");
const personnage = document.getElementById("personnage");
const obstacles = document.getElementsByClassName("obstacle");
const lasers = document.getElementsByClassName("laser");

import {creerNiveau} from "./creerNiveau.js";
import {creerLaser} from "./creerLaser.js";

let niv = 0;
creerNiveau(niv);


let posX = 5;
let posY = 0;

let moveLeft = false;
let moveRight = false;
let jumpPressed = false;
let enSaut = false;

let vitesseX = 0.6;
let vitesseY = 0;
let saut = 2.7;
let gravite = 0.17;

let tirKeys = [];
let cdTir = 200;
let dernierTir = 0;
let tirD = false;
let tirG = false;
let tirH = false;
let tirB = false;
let vitesseLaserX = 1;
let vitesseLaserY = vitesseLaserX*2;
const laserInitH = creerLaser(0, 0, "droite");
const laserWidth = ((laserInitH.offsetWidth / jeu.clientWidth) * 100);
laserInitH.remove();
const laserInitV = creerLaser(0, 0, "haut");
const laserHeight = ((laserInitV.offsetWidth / jeu.clientWidth) * 100);
laserInitV.remove();

const porteTimeWin = 500;
let porteTime;

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
  if (e.code === "ArrowRight" || e.code === "ArrowLeft" ||e.code === "ArrowUp" || e.code === "ArrowDown") {
    if (!tirKeys.includes(e.code)) tirKeys.unshift(e.code);
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
  if (e.code === "ArrowRight" || e.code === "ArrowLeft" || e.code === "ArrowUp" || e.code === "ArrowDown") {
    tirKeys = tirKeys.filter(elt => elt !== e.code)
  }
});

function enCollision(a, b) {
    if (a && b) {
      const aBottom = parseFloat(a.style.bottom);
      const aTop = aBottom + (((a.offsetHeight-1) / jeu.clientHeight) * 100);
      const aLeft = parseFloat(a.style.left);
      const aRight = aLeft + ((a.offsetWidth / jeu.clientWidth) * 100);

      const bBottom = parseFloat(b.style.bottom);
      const bTop = bBottom + (((b.offsetHeight-1) / jeu.clientHeight) * 100);
      const bLeft = parseFloat(b.style.left);
      const bRight = bLeft + ((b.offsetWidth / jeu.clientWidth) * 100);

      return (
      aRight > bLeft   && 
      aLeft < bRight  &&   
      aTop > bBottom   &&   
      aBottom < bTop
      )
    }
}

function gameLoop(time) {

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

  const persRight = posX + ((personnage.offsetWidth / jeu.clientWidth) * 100);
  const nextPersRight = nextPosX + ((personnage.offsetWidth / jeu.clientWidth) * 100);
  const persTop = posY + ((personnage.offsetHeight / jeu.clientHeight) * 100);
  const nextPersTop = nextPosY + ((personnage.offsetHeight / jeu.clientHeight) * 100);
  const persWidth = nextPersRight - nextPosX;
  const persHeight = nextPersTop - nextPosY; 

  // Collision Murs jeu
  if (nextPosX < 0) nextPosX = 0;
  if (nextPersRight > 100) nextPosX = 100 - persWidth;

  // Obstacles
  for (const obstacle of obstacles) {

    const obsBottom = parseFloat(obstacle.style.bottom);
    const obsTop = obsBottom + (((obstacle.offsetHeight-1) / jeu.clientHeight) * 100);
    const obsLeft = (parseFloat(obstacle.style.left));
    const obsRight = (obsLeft + ((obstacle.offsetWidth / jeu.clientWidth) * 100));

    // Collision DROITE
    if (
      nextPosX < posX &&
      posY < obsTop  &&
      persTop > obsBottom &&
      nextPersRight > obsLeft &&
      nextPosX < obsRight
    ) {
      nextPosX = obsRight;
    }

    // Collision GAUCHE
    if (
      nextPosX > posX &&
      posY < obsTop &&
      persTop > obsBottom &&
      nextPersRight > obsLeft &&
      nextPosX < obsRight
    ) {
      nextPosX = obsLeft - persWidth;
    }

    // Collision HAUT
    if (
      vitesseY < 0 &&
      posY >= obsTop &&
      nextPosY <= obsTop &&
      persRight > obsLeft &&
      posX < obsRight
    ) {
      nextPosY = obsTop;
      vitesseY = 0;
      enSaut = false;
    }

    // Collision BAS
    if (
      vitesseY > 0 &&
      nextPersTop >= obsBottom &&
      posY <= obsBottom &&
      persRight > obsLeft &&
      posX < obsRight
    ) {
      nextPosY = obsBottom - persHeight;
      vitesseY = 0;
    }
  }

  // Lasers
  if (tirKeys[0] === "ArrowRight") {tirD = true} else {tirD = false}
  if (tirKeys[0] === "ArrowLeft") {tirG = true} else {tirG = false}
  if (tirKeys[0] === "ArrowUp") {tirH = true} else {tirH = false}
  if (tirKeys[0] === "ArrowDown") {tirB = true} else {tirB = false}
  for (const laser of lasers) {
    const laserLeft = parseFloat(laser.style.left);
    const laserRight = laserLeft + laserWidth;
    const laserBottom = parseFloat(laser.style.bottom);
    const laserTop = laserBottom + laserHeight;

    if (laser.classList.contains("droite")) {
      laser.style.left = laserLeft + vitesseLaserX + "%";  
      if (laserRight > 200) {
        laser.remove();
      }   
    }
    if (laser.classList.contains("gauche")) {
      laser.style.left = laserLeft - vitesseLaserX + "%";
      if (laserLeft < -100) {
        laser.remove();
      }   
    }
        if (laser.classList.contains("haut")) {
      laser.style.bottom = laserBottom + vitesseLaserY + "%";  
      if (laserTop > 200) {
        laser.remove();
      }   
    }
    if (laser.classList.contains("bas")) {
      laser.style.bottom = laserBottom - vitesseLaserY + "%";
      if (laserBottom < -100) {
        laser.remove();
      }   
    }
    for (const obstacle of obstacles) {
      if (enCollision(laser, obstacle)) {laser.remove();}
    }
  }
  if (tirD && time - dernierTir >= cdTir) {
    creerLaser(posX + persWidth*0.6, posY + persHeight*0.6, "droite");
    dernierTir = time;
  }
  if (tirG && time - dernierTir >= cdTir) {
    creerLaser(posX + persWidth*0.4 - laserWidth, posY + persHeight*0.6, "gauche");
    dernierTir = time;
  }
  if (tirH && time - dernierTir >= cdTir) {
    creerLaser(posX + persWidth*0.5 - laserWidth*0.2, posY + persHeight, "haut");
    dernierTir = time;
  }
  if (tirB && time - dernierTir >= cdTir) {
    creerLaser(posX + persWidth*0.5 - laserWidth*0.2, posY, "bas");
    dernierTir = time;
  }

  // Porte
  const porte = document.getElementById("porte");

  if (enCollision(personnage, porte)) {
    if (!porteTime) porteTime = time;
    if (time - porteTime >= porteTimeWin) {
      nextPosX = 5;
      nextPosY = 0;
      niv += 1;
      creerNiveau(niv);
      console.log("gagné");
    }
  } else {
    porteTime = null;
  }

  posX = nextPosX;
  posY = nextPosY;
  
  personnage.style.left = posX + "%";
  personnage.style.bottom = posY + "%";

  requestAnimationFrame(gameLoop);
}

gameLoop();