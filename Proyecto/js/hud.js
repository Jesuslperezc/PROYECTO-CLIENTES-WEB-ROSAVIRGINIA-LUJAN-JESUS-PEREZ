document.addEventListener("DOMContentLoaded", () => {
    const botonReiniciar = document.getElementById("restart-button");
    if (botonReiniciar) {
        botonReiniciar.addEventListener("click", () => {
            if (typeof inicializarTablero === "function") {
                inicializarTablero();
            }
            if (typeof resetearTurno === "function") {
                resetearTurno();
            }
            if (typeof iniciarTemporizador === "function") {
                iniciarTemporizador();
            }
        });
    }
});
