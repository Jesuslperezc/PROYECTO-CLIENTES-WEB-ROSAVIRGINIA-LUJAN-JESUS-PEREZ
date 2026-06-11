let intervaloTemporizador = null;
let tiempoRestante = 0;

/* Logica de cronometro en modo solitario */
function iniciarTemporizador() {
    detenerTemporizador();
    const elementoHUDTimer = document.getElementById("timer").parentElement;

    if (JuegoCasino.modo === "sin-reloj") {
        if (elementoHUDTimer) elementoHUDTimer.style.display = "none";
        return;
    }

    // Por ahora, si no es solitario no se aplica
    if (JuegoCasino.modo !== "solitario") {
        return;
    }

    if (elementoHUDTimer) elementoHUDTimer.style.display = "block";

    // Tiempos del modo solitario
    if (JuegoCasino.dificultad === "easy") {
        tiempoRestante = 90; 
    } else if (JuegoCasino.dificultad === "medium") {
        tiempoRestante = 180;
    } else if (JuegoCasino.dificultad === "hard") {
        tiempoRestante = 300;
    }
    actualizarInterfazTimer();

    intervaloTemporizador = setInterval(() => {
        tiempoRestante--;
        actualizarInterfazTimer();
        if (tiempoRestante <= 0) {
            detenerTemporizador();
            finalizarPartidaPorTiempo();
        }
    }, 1000);
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
}
