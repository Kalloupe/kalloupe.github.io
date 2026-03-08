
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const pressedKeys = new Set();
document.addEventListener("keydown", e => pressedKeys.add(e.code));
document.addEventListener("keyup", e => pressedKeys.delete(e.code));
// 

let joueur = {
    xRatio: 0.1,
    yRatio: 0.7,
    widthRatio: 0.05,
    heightRatio: 0.15,
    color: "green",
    speedRatio: 0.01,
};

function update() {
    // Déplacements
    if (pressedKeys.has("KeyD")) joueur.xRatio += joueur.speedRatio;
    if (pressedKeys.has("KeyA")) joueur.xRatio -= joueur.speedRatio;
    // joueur.xRatio = Math.max(0, Math.min(joueur.xRatio, 1 - joueur.widthRatio));
    // joueur.yRatio = Math.max(0, Math.min(joueur.yRatio, 1 - joueur.heightRatio));

}


function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();