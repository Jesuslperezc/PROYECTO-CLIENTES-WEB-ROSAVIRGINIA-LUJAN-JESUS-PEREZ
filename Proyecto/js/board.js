
const baseDeCartas = ["./assets/cartas/carta_1.png", "./assets/cartas/carta_2.png", "./assets/cartas/carta_3.png", "./assets/cartas/carta_4.png", "./assets/cartas/carta_5.png", "./assets/cartas/carta_6.png", "./assets/cartas/carta_7.png", "./assets/cartas/carta_8.png",
    "./assets/cartas/carta_9.png", "./assets/cartas/carta_10.png", "./assets/cartas/carta_11.png", "./assets/cartas/carta_12.png", "./assets/cartas/carta_13.png", "./assets/cartas/carta_14.png", "./assets/cartas/carta_15.png", "./assets/cartas/carta_16.png"
    ,"./assets/cartas/carta_17.png", "./assets/cartas/carta_18.png", "./assets/cartas/carta_19.png", "./assets/cartas/carta_20.png", "./assets/cartas/carta_21.png", "./assets/cartas/carta_22.png", "./assets/cartas/carta_23.png", "./assets/cartas/carta_24.png"
    ,"./assets/cartas/carta_25.png", "./assets/cartas/carta_26.png", "./assets/cartas/carta_27.png", "./assets/cartas/carta_28.png", "./assets/cartas/carta_29.png", "./assets/cartas/carta_30.png", "./assets/cartas/carta_31.png", "./assets/cartas/carta_32.png"];


function barajar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function inicializarTablero() {
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

    let imagenesSeleccionadas = baseDeCartas.slice(0, cantidadParejas);


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
