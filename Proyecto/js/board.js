function obtenerBaseDeCartasPorTema() {
    const temaActivo = localStorage.getItem("casino-theme-preference") || "clasico";
    let subcarpeta = "cartas"; 
    
    if (temaActivo === "playa") {
        subcarpeta = "cartas_playa";
    } else if (temaActivo === "mundial") {
        subcarpeta = "cartas_mundial";
    }

    const cartasDinamicas = [];
    for (let i = 1; i <= 32; i++) {
        cartasDinamicas.push(`./assets/${subcarpeta}/carta_${i}.png`);
    }
    
    return cartasDinamicas;
}

function barajar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function inicializarTablero() {
    if (typeof actualizarInterfaz === "function") {
        actualizarInterfaz();
    }
    const tablero = document.getElementById("memory-board");
    if (!tablero) return;
    tablero.replaceChildren();


    console.log(` [board.js] Generando el tablero para la dificultad: ${JuegoCasino.dificultad}`);
    let dimension = 4;
    if (JuegoCasino.dificultad === "medium") {
        dimension = 6;

    } else if (JuegoCasino.dificultad === "hard") {
        dimension = 8;
    }
    tablero.dataset.dimension = dimension; 
    const totalCartas = dimension * dimension;
    const cantidadParejas = totalCartas / 2;

    const baseDeCartasTematica = obtenerBaseDeCartasPorTema();
    let imagenesSeleccionadas = baseDeCartasTematica.slice(0, cantidadParejas);


    let listaParejas = [...imagenesSeleccionadas, ...imagenesSeleccionadas];


    barajar(listaParejas);
for (let i = 0; i < totalCartas; i++) {
    
        const rutaImagen = listaParejas[i];

        const nuevaCarta = document.createElement("div");
        nuevaCarta.classList.add("carta");
        nuevaCarta.dataset.index = i; 
        
  
        nuevaCarta.dataset.id = rutaImagen; 

        const cartaInterior = document.createElement("div");
        cartaInterior.classList.add("carta-interior");

        const cartaAtras = document.createElement("div");
        cartaAtras.classList.add("carta-atras");
       

        const cartaFrente = document.createElement("div");
        cartaFrente.classList.add("carta-frente");
        
        
    
        const imagenCroupier = document.createElement("img");
        imagenCroupier.src = rutaImagen;
        imagenCroupier.alt = "Croupier";
        imagenCroupier.classList.add("img-carta");

        
        cartaFrente.appendChild(imagenCroupier);
        
        
        cartaInterior.appendChild(cartaAtras);
        cartaInterior.appendChild(cartaFrente);
        nuevaCarta.appendChild(cartaInterior);
      
        tablero.appendChild(nuevaCarta);
    }

    if (typeof activarLogicaDeJuego === "function") {
        activarLogicaDeJuego(); 
    }
}
