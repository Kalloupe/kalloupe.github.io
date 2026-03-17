const jeu = document.getElementById("jeu");
const jarre = document.getElementById("jarre");

let Hcase = 0;
let Lcase = 0;

let tV = 0;
let tH = 0;


let droite = false;
let gauche = false;
let pressed

document.addEventListener("keydown", e => {
    if (e.code === "KeyD") {
        droite = true;
    }
    if (e.code === "KeyA") {
        gauche = true;
    }
})

// document.addEventListener("keypress", e => {
//      if (e.code === "KeyD") {
//         tH = 0;
//     }
//     if (e.code === "KeyA") {
//         tH = 0;
//     }
// })

document.addEventListener("keyup", e => {
    if (e.code === "KeyD") {
        droite = false;
    }
    if (e.code === "KeyA") {
        gauche = false;
    }
})

document.addEventListener("keypress", e => {
    if (e.code === "ArrowRight") {
        console.log("allo");
    }
})




function creerJarre(n) {
    jeu.style.gridTemplateColumns = `repeat(${n}, 1fr)`;

    Hcase = 100/n;
    Lcase = 100/n;

    for (let i = 0; i < n**2; i += 1) {
        const caze = document.createElement("div");
        caze.classList.add("case");
        // caze.innerHTML = i;
        
        if ( i > n**2 - n + 1&& i < n**2 - 2 ||
             i > n**2 - 2*n + 1 && i < n**2 - n - 2 ||
             i > n**2 - 3*n + 1 && i < n**2 - 2*n - 2 ||
             i > n**2 - 4*n + 2 && i < n**2 - 3*n - 3 ||
             i > n**2 - 5*n + 3 && i < n**2 - 4*n - 4 ||
             i > n**2 - 6*n + 4 && i < n**2 - 5*n - 5 ||
             i > n**2 - 7*n + 5 && i < n**2 - 6*n - 6
        ) {
            caze.style.backgroundColor = "green";
        }
        
        jeu.appendChild(caze);
    }
}
creerJarre(15);

function placerAliment(nom, hauteur, largeur) {
    const elt = document.createElement("img");

    elt.src = `./images/${nom}.png`;
    elt.alt = "Image d'un aliment réalisé par le cantinier";
    elt.classList.add("aliment");
    
    elt.style.height = hauteur + "%";
    elt.style.width = largeur + "%";
    elt.style.top = 0 + "%";
    elt.style.left = 0 + "%";

    jeu.appendChild(elt);
}
placerAliment("rougail", 2*Hcase, 2*Lcase);
// placerAliment("nuggets_vege", 2*Hcase, 3*Lcase);

function gameLoop(time) {

    const Aliments = document.getElementsByClassName("aliment");
    if (time-tV >= 500) {
        tV = time;
        for (const aliment of Aliments) {
            const top = parseFloat(aliment.style.top);
            const height = parseFloat(aliment.style.height);

            aliment.style.top = top + Hcase + "%";
            if (top + height >= 100 - Hcase/2) {
                aliment.style.top = 100 - height + "%";
            }
        }
    }

    if (time-tH >= 150) {
        tH = time;
        for (const aliment of Aliments) {
            const left = parseFloat(aliment.style.left);
            const width = parseFloat(aliment.style.width);

            if (droite && !(droite && gauche)) {
                aliment.style.left = left + Lcase + "%";
                if (left + width >= 100 - Lcase/2) {
                    aliment.style.left = 100 - width + "%";
                }
            }
            if (gauche && !(droite && gauche)) {
                aliment.style.left = left - Lcase + "%";
                if (left - Lcase <= 0) {
                    aliment.style.left = 0 + "%";
                }
            }
        }
    }
    requestAnimationFrame(gameLoop);
}
gameLoop();

