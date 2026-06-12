document.addEventListener("DOMContentLoaded", () => {
    const botonReiniciar = document.getElementById("restart-button");
    if (botonReiniciar) {
        botonReiniciar.addEventListener("click", () => {
            if (typeof JuegoCasino !== "undefined") {
                JuegoCasino.puntosJ1 = 0;
                JuegoCasino.puntosJ2 = 0;
                JuegoCasino.rachaActual = 0;
                JuegoCasino.turno = 1;
                JuegoCasino.tiempoAgotado = false;
            }
            if (typeof inicializarTablero === "function") {
                inicializarTablero();
            }
            if (typeof resetearTurno === "function") {
                resetearTurno();
            }
            if (typeof iniciarTemporizador === "function") {
                iniciarTemporizador();
            }
            if (typeof actualizarInterfaz === "function") {
                actualizarInterfaz();
            }
        });
    }
});
function actualizarInterfaz() {
    
    const contenedorTurno = document.querySelector(".contenedor-turno-central");
    const cajaMarcadorJ1 = document.getElementById("marcador-j1");
    const cajaMarcadorJ2 = document.getElementById("marcador-j2");


    const textoTurno = document.getElementById("mensaje-turno");
    const nombreAp = document.getElementById("nombre-apostador");
    const hud_J1 = document.getElementById("hud-nombre-j1");
    const hud_J2 = document.getElementById("hud-nombre-j2");
    const ptsJ1 = document.getElementById("puntos-j1");
    const ptsJ2 = document.getElementById("puntos-j2");


    if (JuegoCasino.modo !== "multijugador") {
        if (contenedorTurno) contenedorTurno.classList.add("oculto");
        if (cajaMarcadorJ1) cajaMarcadorJ1.classList.add("oculto");
        if (cajaMarcadorJ2) cajaMarcadorJ2.classList.add("oculto");
        return; 
    }


    if (contenedorTurno) contenedorTurno.classList.remove("oculto");
    if (cajaMarcadorJ1) cajaMarcadorJ1.classList.remove("oculto");
    if (cajaMarcadorJ2) cajaMarcadorJ2.classList.remove("oculto");


    if (hud_J1) hud_J1.textContent = JuegoCasino.nombreJ1 || "Apostador 1";
    if (hud_J2) hud_J2.textContent = JuegoCasino.nombreJ2 || "Apostador 2";
    if (ptsJ1) ptsJ1.textContent = JuegoCasino.puntosJ1;
    if (ptsJ2) ptsJ2.textContent = JuegoCasino.puntosJ2;
   
    if (JuegoCasino.turno === 1) {
        if (nombreAp) nombreAp.textContent = ` ${JuegoCasino.nombreJ1 || "Apostador 1"}`;
        if (textoTurno) textoTurno.className = "turno-j1";
    } else {
        if (nombreAp) nombreAp.textContent = ` ${JuegoCasino.nombreJ2 || "Apostador 2"}`;
        if (textoTurno) textoTurno.className = "turno-j2"; 
    }
}