const jeu = document.getElementById("jeu");
const obstacles = document.getElementsByClassName("obstacle");
const decors = document.getElementsByClassName("decor");
const textes = document.getElementsByClassName("texte");

export function creerNiveau(niv) {
    const porte = document.getElementById("porte");
    porte ? porte.remove() : null;
    Array.from(textes).forEach(texte => texte.remove());
    Array.from(decors).forEach(decor => decor.remove());
    Array.from(obstacles).forEach(obstacle => obstacle.remove());

    if (niv === 0) {
      creerDecor("75", "0", "porte");
      creerTexte("26", "50", "🌈 Bienvenue chez Gougoutte 🌈");
    }
    if (niv === 1) {
      

      creerObstacle("0", "35", ["longH", "plancher"]);
      creerObstacle("20", "35", ["longV", "plancher"]);
      creerObstacle("0", "40", ["carreP", "plancher"]);
      creerObstacle("5", "40", ["carreP", "plancher"]);
      creerObstacle("0", "50", ["carreP", "plancher"]);
      creerObstacle("30", "50", ["carreP", "plancher"]);

      creerObstacle("81", "0", ["carreG", "plancher"]);
      creerObstacle("45", "-4", ["bureau"]);
      creerObstacle("70", "20", ["longH", "plancher"]);

      creerObstacle("50", "55", ["etagere"]);
      
    }
    if (niv === 2) {

      creerObstacle("50", "20", ["longH"]);

    }
}

function creerObstacle(x, y, classes = []) {
  const obstacle = document.createElement("div");

  obstacle.classList.add("obstacle");
  classes.forEach(classe => obstacle.classList.add(classe));

  obstacle.style.left = x + "%";
  obstacle.style.bottom = y + "%";

  jeu.appendChild(obstacle);
  return obstacle;
}

function creerDecor(x, y, nom) {
  const elt = document.createElement("img");
  
  elt.classList.add("decor");
  elt.classList.add(nom);
  elt.src = `images/${nom}.png`;
  elt.alt = `Image ${nom}`;

  nom === "porte" ? elt.id = "porte" : null; 

  elt.style.left = x + "%";
  elt.style.bottom = y + "%";

  jeu.appendChild(elt);
  return elt;
}

function creerTexte(x, y, text) {
  const elt = document.createElement("p");

  elt.classList.add("texte");
  elt.innerHTML = text;

  elt.style.left = x + "%";
  elt.style.bottom = y + "%";

  jeu.appendChild(elt);
  return elt;
}


