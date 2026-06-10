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

        if (!cartaSeleccionada || 
            cartaSeleccionada.classList.contains("volteada") || 
            cartaSeleccionada.classList.contains("acertada")) {
            return;
        }

        if (!cartaSeleccionada || cartaSeleccionada.classList.contains("volteada")) return;
        if (cartaSeleccionada === primeraCarta) return;


        voltearCarta(cartaSeleccionada);
    });
}

function voltearCarta(carta) {
    
 
    if (!primeraCarta) {
        primeraCarta = carta;
        carta.classList.add("volteada");
        console.log(` Carta volteada. Index lógico: ${carta.dataset.index}`);

        return; 
    }
    bloqueado = true; 
    segundaCarta = carta;
    carta.classList.add("volteada");
    verificarPareja();
}

function verificarPareja(){
    const esPareja = primeraCarta.dataset.id === segundaCarta.dataset.id;

    if (esPareja) {
        console.log("Las imágenes coinciden.");
        desactivarCartas();
    } else {
        console.log(" No son iguales. Volviendo a tapar...");
        volverATaparCartas();
    }

}

function desactivarCartas() {
  
    primeraCarta.classList.add("acertada");
    segundaCarta.classList.add("acertada");

    console.log(" ¡Pareja asegurada! Las cartas se quedan fijas en la mesa.");

    
    resetearTurno();
}

function volverATaparCartas() {
    setTimeout(() => {
        
        primeraCarta.classList.remove("volteada");
        segundaCarta.classList.remove("volteada");

        resetearTurno();
    }, 1000);
}
function resetearTurno() {
    primeraCarta = null;
    segundaCarta = null;
    bloqueado = false;
}