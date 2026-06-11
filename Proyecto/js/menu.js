<<<<<<< HEAD
document.addEventListener("DOMContentLoaded",() => {
=======
document.addEventListener("DOMContentLoaded", () => {
>>>>>>> e802b3d5b6428b0f6b95122e90b462cf867dc3a4
    const botonesMenu = document.querySelectorAll(".boton-menu");
    let botonRegresar = document.querySelectorAll(".boton-back");
    let botonTema = document.querySelector(".boton-menu-tema");
    const botonesDificultad = document.querySelectorAll(".boton-seleccion");

    botonesMenu.forEach(boton => {
        boton.addEventListener("click", (evento) => {
            JuegoCasino.modo = evento.currentTarget.dataset.mode;
            console.log("Modo de juego seleccionado:", JuegoCasino.modo);
            
            const contenedorNombres = document.getElementById("inputs-nombres");
            if (JuegoCasino.modo === "multijugador") {
                if (contenedorNombres) contenedorNombres.classList.remove("oculto");
            } else {
                if (contenedorNombres) contenedorNombres.classList.add("oculto");
            }

            document.getElementById("main-menu").classList.add("oculto");
            document.getElementById("selection-menu").classList.remove("oculto");
        });
    });

    botonesDificultad.forEach(boton => {
        boton.addEventListener("click", (evento) => {
            JuegoCasino.dificultad = evento.currentTarget.dataset.difficulty;

            if (JuegoCasino.modo === "multijugador") {
                const nom1 = document.getElementById("input-j1").value.trim();
                const nom2 = document.getElementById("input-j2").value.trim();
                if (nom1 !== "") JuegoCasino.nombreJ1 = nom1;
                if (nom2 !== "") JuegoCasino.nombreJ2 = nom2;
                
                console.log("Apostadores listos:", JuegoCasino.nombreJ1, "vs", JuegoCasino.nombreJ2);
            }
            document.getElementById("selection-menu").classList.add("oculto");
            
            const contenedorJuego = document.getElementById("game-container");
            if (contenedorJuego) contenedorJuego.classList.remove("oculto");

            if (typeof inicializarTablero === "function") {
                inicializarTablero();
            }
        });
    });

    if (botonTema) {
        botonTema.addEventListener("click", (evento) => {
            document.getElementById("main-menu").classList.add("oculto");
            document.getElementById("theme-menu").classList.remove("oculto");
        });
    }


    botonRegresar.forEach(boton => {
        boton.addEventListener("click", (evento) => {
            console.log("Regresando al menú principal");
<<<<<<< HEAD
            if (typeof detenerTemporizador === "function") {
            detenerTemporizador();
            }
            JuegoCasino.tiempoAgotado = false;
=======
            
            const input1 = document.getElementById("input-j1");
            const input2 = document.getElementById("input-j2");
            if (input1) input1.value = "";
            if (input2) input2.value = "";
            
            const contenedorNombres = document.getElementById("inputs-nombres");
            if (contenedorNombres) contenedorNombres.classList.add("oculto");

>>>>>>> e802b3d5b6428b0f6b95122e90b462cf867dc3a4
            document.getElementById("selection-menu").classList.add("oculto");
            document.getElementById("theme-menu").classList.add("oculto");
            document.getElementById("game-container").classList.add("oculto");
            document.getElementById("main-menu").classList.remove("oculto");
        });
    });
<<<<<<< HEAD
});
=======
});
>>>>>>> e802b3d5b6428b0f6b95122e90b462cf867dc3a4
