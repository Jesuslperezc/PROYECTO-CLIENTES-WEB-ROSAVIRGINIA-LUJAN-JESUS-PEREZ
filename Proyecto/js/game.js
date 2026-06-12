let primeraCarta = null;
let segundaCarta = null;
let bloqueado = false;


const baseDeRachas = [ "./assets/robot_base_2.png","./assets/robot_racha_2.png","./assets/robot_racha_4.png","./assets/robot_racha_6.png"];

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
        JuegoCasino.rachaActual++;
        if (JuegoCasino.puntosJ1 === 0) {
            
            verificarLogro("primer_paso");
        }
        if(JuegoCasino.rachaActual%3===0||JuegoCasino.rachaActual===2){
            mostrarStreak(JuegoCasino.rachaActual);
        }


       
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
        JuegoCasino.rachaActual = 0;


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

    if (JuegoCasino.modo === "solitario" || JuegoCasino.modo === "sin-reloj") {
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
        verificarLogro("banca_rota");
        
        if (typeof detenerTemporizador === "function") {
            detenerTemporizador();
        }
        let tiempoInicial = 0;
        if (JuegoCasino.dificultad === "easy") {
            tiempoInicial = 90;
        } else if (JuegoCasino.dificultad === "medium") {
            tiempoInicial = 180;
        } else if (JuegoCasino.dificultad === "hard") {
            tiempoInicial = 300;
        }

       
        const tiempoTranscurrido = tiempoInicial - tiempoRestante;

        if (tiempoTranscurrido < 60) {
            if(JuegoCasino.dificultad === "easy"){
            verificarLogro("corredor");
            } else if(JuegoCasino.dificultad === "medium"){
                verificarLogro("corredor_medio");
            } else if(JuegoCasino.dificultad === "hard"){
                verificarLogro("corredor_dificil");
            }

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
            verificarLogro("empate_epico");
            if (typeof mostrarPantallaFin === "function") mostrarPantallaFin("victoria_multijugador");
        }
    }
}

function mostrarStreak(racha) {

    const contenedorStreak = document.getElementById("robot-streak");
    const imgRobot = document.querySelector(".robot-frenetico"); 
    const textoStreak = document.querySelector(".texto-racha");
    
    if (!contenedorStreak || !imgRobot) return;



    if (racha === 2) {
        imgRobot.src = baseDeRachas[0]; // Primera imagen
        if (textoStreak) textoStreak.textContent = "¡STREAK X2!";
    } 
    else if (racha === 3) {
        imgRobot.src = baseDeRachas[1]; // Segunda imagen
        if (textoStreak) textoStreak.textContent = "¡STREAK X3!";
        verificarLogro("streak_fuego");
    } 
    else if (racha === 6) {
        imgRobot.src = baseDeRachas[2]; // Tercera imagen
        if (textoStreak) textoStreak.textContent = "¡MAX STREAK! ";
        verificarLogro("imparable");
    } 
    else {
        
        imgRobot.src = baseDeRachas[3]; 
        if (textoStreak) textoStreak.textContent = "¡ERES EL GOAT! ";
    }

    // 3. Activamos el overlay quitando la clase oculto
    contenedorStreak.classList.remove("oculto");

    // 4. Temporizador para esconder el elemento después de 1.5 segundos
    setTimeout(() => {
        contenedorStreak.classList.add("oculto");
    }, 1500); 
}
