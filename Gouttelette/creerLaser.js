const jeu = document.getElementById("jeu");

export function creerLaser (x, y, direction) {
  const laser = document.createElement("div");

  laser.classList.add("laser", direction);

  laser.style.left = x + "%";
  laser.style.bottom = y + "%";

  jeu.appendChild(laser);
  return laser;
}