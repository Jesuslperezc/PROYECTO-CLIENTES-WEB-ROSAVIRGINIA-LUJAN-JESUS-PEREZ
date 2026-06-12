function mostrarPantallaFin(tipoVictoria) {
    let tiempoTexto = "00:00";
    if (typeof tiempoRestante !== "undefined") {
        let segundosConsumidos = 0;
        
        if (JuegoCasino.modo === "solitario") {
            let tiempoInicial = 0;
            if (JuegoCasino.dificultad === "easy") tiempoInicial = 90;
            else if (JuegoCasino.dificultad === "medium") tiempoInicial = 180;
            else if (JuegoCasino.dificultad === "hard") tiempoInicial = 300;
            
            segundosConsumidos = Math.max(0, tiempoInicial - tiempoRestante);
        } else {
            segundosConsumidos = tiempoRestante;
        }

        const mins = Math.floor(segundosConsumidos / 60);
        const segs = segundosConsumidos % 60;
        tiempoTexto = `${mins < 10 ? "0" + mins : mins}:${segs < 10 ? "0" + segs : segs}`;
    }

    let titulo = "¡FELICITACIONES!";
    let mensaje = "¡Has completado el tablero con éxito!";
    let datosHTML = "";

    const clicsTotales = JuegoCasino.clicsGenerales || 0;

    if (tipoVictoria === "victoria_multijugador" || JuegoCasino.modo === "multijugador") {
        const nombreJ1 = JuegoCasino.nombreJ1 || "Apostador 1";
        const nombreJ2 = JuegoCasino.nombreJ2 || "Apostador 2";
        if (JuegoCasino.puntosJ1 > JuegoCasino.puntosJ2) {
            titulo = "¡TENEMOS UN GANADOR!";
            message = `Felicidades <strong>${nombreJ1}</strong>, has ganado la mesa de juego.`;
        } else if (JuegoCasino.puntosJ2 > JuegoCasino.puntosJ1) {
            titulo = "¡TENEMOS UN GANADOR!";
            mensaje = `Felicidades <strong>${nombreJ2}</strong>, has ganado la mesa de juego.`;
        } else {
            titulo = "¡EMPATE ÉPICO!";
            mensaje = "Ambos apostadores dividieron la banca. ¡Excelente duelo!";
        }

        datosHTML = `
            <div class="marcador-final-flex">
                <p>${nombreJ1}: <strong>${JuegoCasino.puntosJ1} pts</strong></p>
                <p>${nombreJ2}: <strong>${JuegoCasino.puntosJ2} pts</strong></p>
            </div>
        `;
    } else {
        titulo = "¡CASA LIMPIA!";
        mensaje = "Has derrotado al tablero del robot perfectamente.";
    }

    const modalFin = document.createElement("div");
    modalFin.className = "modal-fin-partida";
    modalFin.id = "end-screen-modal";
    modalFin.innerHTML = `
        <div class="contenido-modal-fin">
            <h1 class="titulo-fin">${titulo}</h1>
            <p class="mensaje-fin">${mensaje}</p>
            
            <div class="detalles-fin">
                <p>Tiempo de juego: <strong>${tiempoTexto}</strong></p>
                <p>Clics realizados: <strong class="resaltado-clics">${clicsTotales}</strong></p> ${datosHTML}
            </div>

            <button id="btn-salir-fin" class="boton-fin-menu">Volver al menú principal</button>
        </div>
    `;
    document.body.appendChild(modalFin);

    document.getElementById("btn-salir-fin").addEventListener("click", () => {
        modalFin.remove(); 

        if (typeof JuegoCasino !== "undefined") {
            JuegoCasino.puntosJ1 = 0;
            JuegoCasino.puntosJ2 = 0;
            JuegoCasino.rachaActual = 0;
            JuegoCasino.clicsGenerales = 0;
            JuegoCasino.nombreJ1 = "";
            JuegoCasino.nombreJ2 = "";
            JuegoCasino.turno = 1;
            JuegoCasino.tiempoAgotado = false;
            JuegoCasino.modo = null;
        }
        if (typeof actualizarInterfaz === "function") {
            actualizarInterfaz();
        }

        const visorClics = document.getElementById("contador-clics");
        if (visorClics) visorClics.textContent = "0";

        const input1 = document.getElementById("input-j1");
        const input2 = document.getElementById("input-j2");
        if (input1) input1.value = "";
        if (input2) input2.value = "";
        const contenedorNombres = document.getElementById("inputs-nombres");
        if (contenedorNombres) contenedorNombres.classList.add("oculto");

        document.getElementById("selection-menu").classList.add("oculto");
        document.getElementById("theme-menu").classList.add("oculto");
        document.getElementById("game-container").classList.add("oculto");
        document.getElementById("main-menu").classList.remove("oculto");
    });
}

function mostrarPantallaDerrotaTiempo() {
    const modalDerrota = document.createElement("div");
    modalDerrota.className = "modal-fin-partida modal-derrota";
    modalDerrota.id = "game-over-modal";
    const parejasAcertadas = JuegoCasino.puntosJ1 || 0;
    const clicsTotales = JuegoCasino.clicsGenerales || 0;

    modalDerrota.innerHTML = `
        <div class="contenido-modal-fin">
            <h1 class="titulo-fin titulo-derrota">¡TIEMPO AGOTADO!</h1>
            <p class="mensaje-fin">El Robot ha cerrado las apuestas. La casa gana esta vez.</p>
            
            <div class="detalles-fin detalles-derrota">
                <p>Parejas encontradas: <strong>${parejasAcertadas}</strong></p>
                <p>Clics realizados: <strong class="resaltado-clics-derrota">${clicsTotales}</strong></p> 
                <p>Estado de la banca: <strong>Bancarrota</strong></p>
            </div>

            <button id="btn-reintentar-fin" class="boton-fin-menu boton-reintentar">Volver al Menú</button>
        </div>
    `;
    document.body.appendChild(modalDerrota);

    document.getElementById("btn-reintentar-fin").addEventListener("click", () => {
        modalDerrota.remove();

        if (typeof JuegoCasino !== "undefined") {
            JuegoCasino.puntosJ1 = 0;
            JuegoCasino.puntosJ2 = 0;
            JuegoCasino.rachaActual = 0;
            JuegoCasino.clicsGenerales = 0;
            JuegoCasino.nombreJ1 = "";
            JuegoCasino.nombreJ2 = "";
            JuegoCasino.turno = 1;
            JuegoCasino.tiempoAgotado = false;
            JuegoCasino.modo = null;
        }
        if (typeof actualizarInterfaz === "function") {
            actualizarInterfaz();
        }
        const visorClics = document.getElementById("contador-clics");
        if (visorClics) visorClics.textContent = "0";

        const input1 = document.getElementById("input-j1");
        const input2 = document.getElementById("input-j2");
        if (input1) input1.value = "";
        if (input2) input2.value = "";
        const contenedorNombres = document.getElementById("inputs-nombres");
        if (contenedorNombres) contenedorNombres.classList.add("oculto");

        document.getElementById("selection-menu").classList.add("oculto");
        document.getElementById("theme-menu").classList.add("oculto");
        document.getElementById("game-container").classList.add("oculto");
        document.getElementById("main-menu").classList.remove("oculto");
    });
}
