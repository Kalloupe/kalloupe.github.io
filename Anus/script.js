const jeu = document.getElementById("jeu");



function creerLigne(nb) {
    for (let i = 1; i <= nb; i += 1) {
        const ligne = document.createElement("div");
        
        ligne.style.position = "absolute";
        ligne.style.width = (100/nb) + "%";
        ligne.style.height = (100/nb)*i + "%";
        ligne.style.border = "2px solid red";

        ligne.style.left = "50%";
        ligne.style.transform = "translate(-50%, 0%)"

        jeu.appendChild(ligne);
    }
}

creerLigne(5);