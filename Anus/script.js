const jeu = document.getElementById("jeu");
const jarre = document.getElementById("jarre");

function creerJarre(n) {
    jeu.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
    for (let i = 0; i < n**2; i += 1) {
        const caze = document.createElement("div");
        caze.classList.add("case");
        jeu.appendChild(caze);
    }
}

creerJarre(11);