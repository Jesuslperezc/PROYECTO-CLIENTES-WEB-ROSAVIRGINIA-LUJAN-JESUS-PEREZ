const CONFIG_TEMAS = {
    "clasico": {
        dealerImg: "./assets/robot_mesa.png"
    },
    "playa": {
        dealerImg: "./assets/robot_mesa_p.png",
    },
    "mundial": {
        dealerImg: "./assets/robot_mesa_f.png" 
    }
    
};

console.log("[themes.js] Sistema de Croupiers Black Power inicializado.");

function aplicarTemaCasino(nombreTema) {
    if (!CONFIG_TEMAS[nombreTema]) {
        console.warn(`[themes.js] El tema "${nombreTema}" no existe. Usando clásico.`);
        nombreTema = "clasico";
    }

    document.body.setAttribute("data-theme", nombreTema);
    

    localStorage.setItem("casino-theme-preference", nombreTema);

    // 3. CAMBIO VISUAL: Cambiamos el dealer de la zona de juego
    const imagenDealerJuego = document.getElementById("dealer-img");
    if (imagenDealerJuego) {
        imagenDealerJuego.src = CONFIG_TEMAS[nombreTema].dealerImg;
    }

  
    const imagenRobotMenu = document.querySelector(".robot-menu");
    if (imagenRobotMenu) {
        imagenRobotMenu.src = CONFIG_TEMAS[nombreTema].dealerImg;
    }

    console.log(`[themes.js] Interfaz y Croupier cambiados a: ${nombreTema}`);
}


document.addEventListener("DOMContentLoaded", () => {
    // 1. Cargar el tema que ya estaba guardado o usar el clásico
    const temaActivo = localStorage.getItem("casino-theme-preference") || "clasico";
    aplicarTemaCasino(temaActivo);


    const botonesDeCroupier = document.querySelectorAll(".card-button");

    botonesDeCroupier.forEach(boton => {
        boton.addEventListener("click", (evento) => {
            // Buscamos el data-theme del botón clickeado
            const temaSeleccionado = evento.currentTarget.dataset.theme;
            aplicarTemaCasino(temaSeleccionado);
        });
    });
});

function obtenerBaseDeRachasPorTema() {
    const temaActivo = localStorage.getItem("casino-theme-preference") || "clasico";
    let subcarpeta = "cartas"; 

    if (temaActivo === "playa") {
        subcarpeta = "cartas_playa";
    } else if (temaActivo === "mundial") {
        subcarpeta = "cartas_mundial";
    }


    return [
        `./assets/${subcarpeta}/robot_base_2.png`,
        `./assets/${subcarpeta}/robot_racha_2.png`,
        `./assets/${subcarpeta}/robot_racha_4.png`,
        `./assets/${subcarpeta}/robot_racha_6.png`
    ];
}