

document.addEventListener("DOMContentLoaded", () => {
    const botonesDificultad = document.querySelectorAll(".boton-seleccion");
    botonesDificultad.forEach(boton => {
        boton.addEventListener("click", (evento) => {
             JuegoCasino.dificultad = evento.currentTarget.dataset.difficulty;
            console.log("Dificultad seleccionada:", JuegoCasino.dificultad);
                document.getElementById("selection-menu").classList.add("oculto");
                document.getElementById("game-container").classList.remove("oculto");
                if (typeof inicializarTablero === "function") {
                inicializarTablero(); 
            }
        });
    });
});