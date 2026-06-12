let intervaloTemporizador = null;
let tiempoRestante = 0;

/* Logica de cronometro */
function iniciarTemporizador() {
    detenerTemporizador();
    
    const elementoHUDTimer = document.getElementById("timer") ? document.getElementById("timer").parentElement : null;

    if (elementoHUDTimer) elementoHUDTimer.style.display = "block";
    if (JuegoCasino.modo === "solitario") {
    // Tiempos del modo solitario, cronometro descendente    
    if (JuegoCasino.dificultad === "easy") {
            tiempoRestante = 90; 
        } else if (JuegoCasino.dificultad === "medium") {
            tiempoRestante = 180;
        } else if (JuegoCasino.dificultad === "hard") {
            tiempoRestante = 300;
        }
        actualizarInterfazTimer(tiempoRestante);

        intervaloTemporizador = setInterval(() => {
            tiempoRestante--;
            actualizarInterfazTimer(tiempoRestante);
            if (tiempoRestante <= 0) {
                detenerTemporizador();
                finalizarPartidaPorTiempo();
            }
        }, 1000);

    } else if (JuegoCasino.modo === "multijugador" || JuegoCasino.modo === "sin-reloj") {
        // Modo multijugador y sin reloj, cronometro ascendente
        tiempoRestante = 0; 
        actualizarInterfazTimer(tiempoRestante);

        intervaloTemporizador = setInterval(() => {
            tiempoRestante++; 
            actualizarInterfazTimer(tiempoRestante);
        }, 1000);
    }
}

function detenerTemporizador() {
    if (intervaloTemporizador) {
        clearInterval(intervaloTemporizador);
        intervaloTemporizador = null;
    }
}

function actualizarInterfazTimer() {
    const contenedorTimer = document.getElementById("timer");
    if (!contenedorTimer){
        return;
    }
    const minutos = Math.floor(tiempoRestante / 60);
    const segundos = tiempoRestante % 60;
    const minutosFormateados = minutos < 10 ? "0" + minutos : minutos;
    const segundosFormateados = segundos < 10 ? "0" + segundos : segundos;
    contenedorTimer.textContent = `${minutosFormateados}:${segundosFormateados}`;
} 
function finalizarPartidaPorTiempo() {    
    JuegoCasino.tiempoAgotado = true;
    console.log("¡Tiempo agotado! No lograste encontrar todas las parejas a tiempo.");
    
    bloqueado = true; 


    const cartasVolteadas = document.querySelectorAll(".carta.volteada"); 
    cartasVolteadas.forEach(carta => {
        carta.classList.remove("volteada"); 
    });

    primeraCarta = null;
    segundaCarta = null;
    console.log("El juego se ha bloqueado. Puedes reiniciar para intentarlo de nuevo.");
}