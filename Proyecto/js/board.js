

function inicializarTablero() {
    const tablero = document.getElementById("memory-board");
    if (!tablero) return;
    tablero.replaceChildren();


    console.log(` [board.js] Generando el tablero para la dificultad: ${dificultadSeleccionada}`);
    let dimension = 4;


    if (dificultadSeleccionada === "medium") {
        dimension = 6;

    } else if (dificultadSeleccionada === "hard") {
        dimension = 8;
    }
    tablero.dataset.dimension = dimension; 
    const totalCartas = dimension * dimension;

    for (let i = 1; i <= totalCartas; i++) {

        const nuevaCarta = document.createElement("div");
        nuevaCarta.classList.add("carta");
        nuevaCarta.dataset.index = i; 


        const cartaInterior = document.createElement("div");
        cartaInterior.classList.add("carta-interior");


        const cartaAtras = document.createElement("div");
        cartaAtras.classList.add("carta-atras");

      
        const cartaFrente = document.createElement("div");
        cartaFrente.classList.add("carta-frente");

        
        cartaInterior.appendChild(cartaAtras);
        cartaInterior.appendChild(cartaFrente);
        nuevaCarta.appendChild(cartaInterior);

      
        tablero.appendChild(nuevaCarta);
    }
    if (typeof activarLogicaDeJuego === "function") {
    activarLogicaDeJuego();
    }
}
