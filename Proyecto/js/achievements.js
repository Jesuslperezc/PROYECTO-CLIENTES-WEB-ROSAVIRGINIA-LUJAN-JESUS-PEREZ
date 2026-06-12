const LOGROS_CASINO = [
    {
        id: "primer_paso",
        titulo: "Suerte de principiante",
        descripcion: "Encuentra tu primera pareja en la mesa.",
        desbloqueado: false
    },
    {
        id: "streak_fuego",
        titulo: "Prendido en candela ",
        descripcion: "Consigue una racha de 3 aciertos seguidos.",
        desbloqueado: false
    },
    {
        id: "imparable",
        titulo: "Pegando el parley",
        descripcion: "Consigue una racha de 6 o más aciertos.",
        desbloqueado: false
    },
    {
        id: "banca_rota",
        titulo: "Limpia la Banca",
        descripcion: "Completa el tablero en modo solitario.",
        desbloqueado: false
    },
    {
        id: "corredor",
        titulo: "Rapido y furioso",
        descripcion: "Termina en menos de 1 minuto en el modo facil de solitario.",
        desbloqueado: false
    },
     {
        id: "corredor_medio",
        titulo: "Velocidad de la luz",
        descripcion: "Termina en menos de 1 minuto en el modo medio de solitario.",
        desbloqueado: false
    },
     {
        id: "corredor_dificil",
        titulo: "Desquiciado total",
        descripcion: "Termina en menos de 1 minuto en el modo dificil de solitario.",
        desbloqueado: false
    },

     {
        id: "empate_epico",
        titulo: "Lo que es igual no es  trampa",
        descripcion: "Consigue un empate en el modo multijugador.",
        desbloqueado: false
    }


];

function verificarLogro(idLogro) {

    const logro = LOGROS_CASINO.find(l => l.id === idLogro);
    
    // Si el logro existe y todavía no ha sido desbloqueado...
    if (logro && !logro.desbloqueado) {
        logro.desbloqueado = true;
        console.log(` [LOGRO DESBLOQUEADO]: ${logro.titulo} - ${logro.descripcion}`);
        
        // Aquí puedes disparar una pequeña notificación flotante en pantalla
        mostrarPopUpLogro(logro);
    }
}

function mostrarPopUpLogro(logro) {

    const notificacion = document.createElement("div");
    notificacion.className = "popup-logro-notificacion";
    

    const titulo = document.createElement("strong");
    titulo.textContent = logro.titulo;
    
    const desc = document.createElement("p");
    desc.textContent = logro.descripcion;
    

    notificacion.appendChild(titulo);
    notificacion.appendChild(desc);

    document.body.appendChild(notificacion);
    

    setTimeout(() => {
        notificacion.remove();
    }, 3500);
}