

document.addEventListener("DOMContentLoaded",() => {
    const botonesMenu = document.querySelectorAll(".boton-menu");
    let botonRegresar = document.querySelectorAll(".boton-back");
    let botonTema = document.querySelector(".boton-menu-tema");
    botonesMenu.forEach(boton => {
        boton.addEventListener("click", (evento) => {
            JuegoCasino.modo = evento.currentTarget.dataset.mode;
            console.log("Modo de juego seleccionado:", JuegoCasino.modo);
            document.getElementById("main-menu").classList.add("oculto");
            document.getElementById("selection-menu").classList.remove("oculto");
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
            document.getElementById("selection-menu").classList.add("oculto");
            document.getElementById("theme-menu").classList.add("oculto");
            document.getElementById("main-menu").classList.remove("oculto");
        });
    });

});

