const character = document.getElementById("character");
const game = document.getElementById("game");

let position = 0;
let speed = 2; // pixels par frame

function moveCharacter() {
  position += speed;

  // Limite droite du canvas
  const maxPos = game.clientWidth - character.clientWidth;
  if (position > maxPos) {
    position = 0; // revient à gauche
  }

  character.style.left = position + "px";

  requestAnimationFrame(moveCharacter);
}

// Démarre l’animation
moveCharacter();
