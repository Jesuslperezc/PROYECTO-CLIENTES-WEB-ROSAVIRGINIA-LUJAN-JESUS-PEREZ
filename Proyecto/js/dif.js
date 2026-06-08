let dificultadSeleccionada = "";

document.addEventListener("DOMContentLoaded", () => {
    const botonesDificultad = document.querySelectorAll(".boton-seleccion");
    botonesDificultad.forEach(boton => {
        boton.addEventListener("click", (evento) => {
             dificultadSeleccionada = evento.currentTarget.dataset.difficulty;
            console.log("Dificultad seleccionada:", dificultadSeleccionada);
                document.getElementById("selection-menu").classList.add("oculto");
                document.getElementById("game-container").classList.remove("oculto");
                if (typeof inicializarTablero === "function") {
                inicializarTablero(); 
            }
        });
    });
});