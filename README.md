# Black Power Casino 
¡Bienvenido a Black Power Casino! Este es un proyecto interactivo de juego de memoria web diseñado con una estética moderna, interactiva y llena de luces neón. El juego desafía la memoria del usuario permitiéndole jugar en diferentes modalidades, elegir dificultades y personalizar su experiencia.

## Autores
Este proyecto fue desarrollado con dedicación y disciplina por:
* Rosavirginia Luján
* Jesús Pérez


## Características del Proyecto
* Menú Principal Interactivo: Diseño responsivo con animaciones de interfaz y efectos flotantes.
* Múltiples Modos de Juego: 
  * Modo Solitario.
  * Modo Multijugador.
  * Modo Sin Reloj.
* Sistema de Dificultades Dinámico: El tablero se adapta al nivel elegido:
  * Modo Fácil: Tablero de 4x4.
  * Modo Medio: Tablero de 6x6.
  * Modo Difícil: Tablero de 8x8.
* Personalización de Temas: Menú dedicado para elegir el estilo visual (Clásico, Playa, Mundial).
* HUD del Juego: Marcador de clics totales, puntajes por jugador en tiempo real, racha del bot dealer y temporizador regresivo integrado.

## Tecnologías Utilizadas
El proyecto está construido utilizando tecnologías estándar de desarrollo web:
* HTML: Estructuración semántica de las secciones y menús del casino.
* CSS: Estilos personalizados, fuentes externas (Luckiest Guy), efectos neón (`drop-shadow`), transiciones fluidas de cartas y maquetación responsiva con flexbox.
* JavaScript: Lógica modular del juego repartida en controladores específicos (`game.js`, `board.js`, `themes.js`, `timer.js`, etc.).


## Estructura del Código
La arquitectura del proyecto está organizada de forma sencilla y limpia:
```bash
Proyecto/
│
├── index.html
├── css/
│   └── styles.css
├── js/ 
│   ├── app.js
│   ├── board.js
│   ├── themes.js
│   └── ... (otros módulos de control)
└── assets/       
     