let primeraCarta = null;
let segundaCarta = null;
let bloqueado = false;

function activarLogicaDeJuego() {
    const tablero = document.getElementById("memory-board");
    if (!tablero) return;
    
    console.log("[game.js] Lógica de juego activada. Escuchando clics en el tablero...");
    if (JuegoCasino.tiempoAgotado === undefined) {
        JuegoCasino.tiempoAgotado = false; 
    }
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

        return; 
    }
    bloqueado = true; 
    segundaCarta = carta;
    carta.classList.add("volteada");
    verificarPareja();
}
function verificarPareja() {
    const esPareja = primeraCarta.dataset.id === segundaCarta.dataset.id;

    if (esPareja) {
        console.log("Las imágenes coinciden.");
       
        if (JuegoCasino.modo === "multijugador") {
            if (JuegoCasino.turno === 1) {
                JuegoCasino.puntosJ1++;
                console.log(`Puntos del Jugador 1: ${JuegoCasino.puntosJ1}`);
            } else {
                JuegoCasino.puntosJ2++;
                console.log(`Puntos del Jugador 2: ${JuegoCasino.puntosJ2}`);
            }
        } else {
            console.log("Modo un jugador: Pareja acertada.");
            JuegoCasino.puntosJ1++;
            
            console.log(`Puntos del Jugador 1: ${JuegoCasino.puntosJ1}`);
        }

        
        desactivarCartas();

        if (!bloqueado && JuegoCasino.modo === "multijugador") {
            console.log(`Sigue jugando el Jugador ${JuegoCasino.turno}`);
            actualizarInterfaz();
        }
    } else {
        console.log("No son iguales. Volviendo a tapar...");

        if (JuegoCasino.modo === "multijugador") {
            JuegoCasino.turno = (JuegoCasino.turno === 1) ? 2 : 1;
            console.log("Cambio de turno. Ahora le toca al jugador:", JuegoCasino.turno);
            actualizarInterfaz();
        }

        volverATaparCartas();
    }
}

function desactivarCartas() {
  
    primeraCarta.classList.add("acertada");
    segundaCarta.classList.add("acertada");

    if (JuegoCasino.modo === "solitario") {
        verificarVictoriaSolitario();
    }
    if (JuegoCasino.modo === "multijugador") {
        verificarVictoriaMultijugador();
    }
    
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

function verificarVictoriaSolitario() {
    const todasLasCartas = document.querySelectorAll(".carta");
    const cartasAcertadas = document.querySelectorAll(".carta.acertada");
    if (todasLasCartas.length > 0 && todasLasCartas.length === cartasAcertadas.length) {
        console.log("¡Felicidades! Has encontrado todas las parejas.");
        bloqueado = true;
        
        if (typeof detenerTemporizador === "function") {
            detenerTemporizador();
        }
    }
}

function verificarVictoriaMultijugador() {
    const todasLasCartas = document.querySelectorAll(".carta");
    const cartasAcertadas = document.querySelectorAll(".carta.acertada");

   
    if (todasLasCartas.length > 0 && todasLasCartas.length === cartasAcertadas.length) {
        
        console.log("¡Mesa limpia! Evaluando apuestas finales...");
        bloqueado = true;

        if (typeof detenerTemporizador === "function") {
            detenerTemporizador();
        }

        if (JuegoCasino.puntosJ1 > JuegoCasino.puntosJ2) {
            console.log(`El ganador es ${JuegoCasino.nombreJ1} con ${JuegoCasino.puntosJ1} puntos.`);
            if (typeof mostrarPantallaFin === "function") mostrarPantallaFin("victoria_multijugador");
        } else if (JuegoCasino.puntosJ2 > JuegoCasino.puntosJ1) {
            console.log(`El ganador es ${JuegoCasino.nombreJ2} con ${JuegoCasino.puntosJ2} puntos.`);
            if (typeof mostrarPantallaFin === "function") mostrarPantallaFin("victoria_multijugador");
        } else {
            console.log("¡Es un empate! Ambos jugadores tienen la misma cantidad de puntos.");
            if (typeof mostrarPantallaFin === "function") mostrarPantallaFin("victoria_multijugador");
        }
    }
}