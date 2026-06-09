let primeraCarta = null;
let segundaCarta = null;
let bloqueado = false;

function activarLogicaDeJuego() {
    const tablero = document.getElementById("memory-board");
    if (!tablero) return;
    
    console.log("[game.js] Lógica de juego activada. Escuchando clics en el tablero...");
    
 
    tablero.addEventListener("click", function(evento) {
        if (bloqueado) return;

        const cartaSeleccionada = evento.target.closest(".carta");

  
        if (!cartaSeleccionada || cartaSeleccionada.classList.contains("volteada")) return;
        if (cartaSeleccionada === primeraCarta) return;


        voltearCarta(cartaSeleccionada);
    });
}

function voltearCarta(carta) {
    
    carta.classList.add("volteada");
    console.log(` Carta volteada. Index lógico: ${carta.dataset.index}`);

    if (!primeraCarta) {
        primeraCarta = carta;
        return; 
    }

    segundaCarta = carta;
    bloqueoTablero = true;
    verificarPareja();
}
