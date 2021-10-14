"use strict";

let canvas =  /** @type { HTMLcanvasElement} */ document.getElementById("canvas");
let ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;
window.onload = function () {
    let fichas = []; 
    let imagenesFichasPokebolas = ["img/Pokemon/pokebolaRoja.jpg", "img/Pokemon/pokebolaAzul.jpg", "img/Pokemon/pokebolaVerde.jpg", "img/Pokemon/pokebolaAmarilla.jpg"];
    let imagenesFichasPokemons = ["img/Pokemon/charmander.png", "img/Pokemon/squirtle.jpg", "img/Pokemon/bulbasaur.jpg", "img/Pokemon/pikachu.jpg"];
    let tipoFichas = 0;
    let jugador = 0;
    let fichaElegida = -1;
    let fichaBloqueada = -1;
    let nombreJugador1 = '';
    let nombreJugador2 = '';
    let fichaJ1 = '';
    let fichaJ2 = '';
    let xEnLinea = 4;

    // ---- SECCIONES DE COFIGURACION ---- //
    let settings = document.getElementById('settings');
    let mod = document.getElementById('mod');
    let colores = document.getElementById('colores');
    let tamTablero = document.getElementById('tamTablero');
    let btnJugar = document.getElementById('play');
    // ---- BOTONES DE MODALIDAD ---- //
    
    let modPokebola = document.getElementById('modPokebola');
    modPokebola.addEventListener('click', function () {
        cambiarModalidad(0)
    });
    let modPokemon = document.getElementById('modPokemon');
    modPokemon.addEventListener('click', function () {
        cambiarModalidad(1)
    });
    let okModalidad = document.getElementById('okModalidad');
    okModalidad.addEventListener('click', function () {
        mod.classList.replace('card', 'hide'); // oculta el menú de elección de modalidad
        colores.classList.replace('hide', 'card'); // muestra el menú de elección de fichas
        mostrarFichasParaElegir();
    });
    // ---- BOTONES DE FICHAS ---- //
    let ficha0 = document.getElementById('ficha0');
    ficha0.addEventListener('click', function () {
        seleccionarFicha(0);
    })
    let ficha1 = document.getElementById('ficha1');
    ficha1.addEventListener('click', function () {
        seleccionarFicha(1);
    })
    let ficha2 = document.getElementById('ficha2');
    ficha2.addEventListener('click', function () {
        seleccionarFicha(2);
    })
    let ficha3 = document.getElementById('ficha3');
    ficha3.addEventListener('click', function () {
        seleccionarFicha(3);
    })
    let okJugador = document.getElementById('okJugador');
    okJugador.addEventListener('click', function () {
        if (jugador === 0) {
            fichaBloqueada = fichaElegida; //bloquea la ficha elegida por el j1 para que no sean iguales
            fichaJ1 = fichas[fichaElegida]; // guarda la ficha del jugador 1 y el nombre del jugador
            nombreJugador1 = document.getElementById('nombreJugador').value;
            if (nombreJugador1 == "") {
                nombreJugador1 = "Jugador 1";
            }
            seleccionarJugador2();
        } else {
            fichaJ2 = fichas[fichaElegida]; // guarda la ficha del jugador 2 y el nombre del jugador
            nombreJugador2 = document.getElementById('nombreJugador').value;
            if (nombreJugador2 == "") {
                nombreJugador2 = "Jugador 2";
            }
            colores.classList.replace('card', 'hide'); // oculta el menú de elección de fichas
            tamTablero.classList.replace('hide', 'card'); // muestra el menú de elección de x en línea
        }
    })
    // ---- TAMAÑO DE TABLERO ---- //
    let selectEnLinea = document.getElementById('selectEnLinea');
    selectEnLinea.addEventListener('change', function() {
        xEnLinea = selectEnLinea.value;
    })
    // ---- JUGAR ---- //
    btnJugar.addEventListener('click', cargarJuego);

    // ---- MENU ---- //
    let jugadorEnTurno = document.getElementById('jugadorEnTurno');
    let cuadroGanador = document.getElementById('cuadroGanador');
    let cuadroCronometro = document.getElementById('cronometro');
    let reiniciar = document.getElementById('reiniciar');
    reiniciar.addEventListener('click', function() {
        location.reload();
    })


    let tablero;
    let juego;
    let cronometro;

    /**
     * Guarda en el array de fichas, las imágenes correspondientes a la modalidad elegida.
     * Muestra al usuario la modalidad elegida.
     * Habilita el botón para pasar al siguiente menú.
     * @param {*} mod puede ser 0 o 1, equivalentes a pokebolas y pokemones, respectivamente
     */
     function cambiarModalidad(mod) {
        tipoFichas = mod;
        if (mod == 0) {
            modPokebola.classList.add('selected');
            modPokemon.classList.remove('selected');
            fichas = imagenesFichasPokebolas;
        } else {
            modPokemon.classList.add('selected');
            modPokebola.classList.remove('selected');
            fichas = imagenesFichasPokemons;
        }
        okModalidad.disabled  = false;
    }


    /**
     * Muestra al usuario las imágenes correspondientes a las fichas para que pueda elegir
     */
    function mostrarFichasParaElegir() {
        ficha0.src = fichas[0];
        ficha1.src = fichas[1];
        ficha2.src = fichas[2];
        ficha3.src = fichas[3];
    }

    /**
     * Guarda la imagen de la ficha elegida en una variable que posteriormente será asignada al jugador.
     * Muestra al usuario cuál es la ficha elegida.
     * Habilita el botón para pasar al siguiente menú.
     * @param {*} numFicha valores del 0 al 4
     */
    function seleccionarFicha(numFicha) {
        if (fichaBloqueada != numFicha) {
            fichaElegida = numFicha;
            if (numFicha === 0) {
                ficha0.classList.add('selected');
                ficha1.classList.remove('selected');
                ficha2.classList.remove('selected');
                ficha3.classList.remove('selected');
            } else if (numFicha === 1) {
                ficha1.classList.add('selected');
                ficha0.classList.remove('selected');
                ficha2.classList.remove('selected');
                ficha3.classList.remove('selected');
            } else if (numFicha === 2) {
                ficha2.classList.add('selected');
                ficha0.classList.remove('selected');
                ficha1.classList.remove('selected');
                ficha3.classList.remove('selected');
            } else {
                ficha3.classList.add('selected');
                ficha0.classList.remove('selected');
                ficha1.classList.remove('selected');
                ficha2.classList.remove('selected');
            }
            okJugador.disabled = false;
        }
    }

    /**
     * Indica que se está seleccionando al jugador 2.
     * desabilita el botón para continuar hasta el siguiente menú.
     * Marca desabilitada la ficha del j1.
     */
    function seleccionarJugador2() {
        jugador++;
        okJugador.disabled = true;
        document.getElementById('nombreJugador').value = '';
        document.getElementById('jugador').innerHTML = "Jugador 2";
        if (fichaElegida === 0) {
            ficha0.classList.replace('selected', 'disabled');
        } else if (fichaElegida === 1) {
            ficha1.classList.replace('selected', 'disabled');
        } else if (fichaElegida === 2) {
            ficha2.classList.replace('selected', 'disabled');
        } else {
            ficha3.classList.replace('selected', 'disabled');
        }
    }

    /**
     * Oculta el menú de opciones.
     * Crea el tablero.
     * Crea el juego.
     * Muestra el jugador en turno.
     * Inicia el cronómetro.
     */
    function cargarJuego() {
        settings.classList.replace('settings', 'hide');
        tablero = new Tablero(ctx, "img/Pokemon/patronTablero.png", xEnLinea);
        juego = new Juego(tablero, fichaJ1, fichaJ2, xEnLinea);
        jugadorEnTurno.innerHTML = nombreJugador1;
        iniciarCronometro();
    }
    
    /**
     * Crea el cronómetro.
     * Muestra el tiempo inicial.
     * Cada un segundo, le pide al cronómetro que descuente un segundo y que le devuelva el tiempo.
     * Muestra el cronómetro.
     * Informa si se terminó el tiempo.
     */
    let espera;
    function iniciarCronometro() {
        cronometro = new Cronometro();
        cuadroCronometro.innerHTML = cronometro.getTiempo();
        espera = setInterval(() => {
            cronometro.descontar();
            let tiempo = cronometro.getTiempo();
            if (tiempo == "0:00") {
                clearInterval(espera);
                informarTiempoTerminado();
            } 
            cuadroCronometro.innerHTML = tiempo;
        }, 1000);
    }

    /**
     * Informa al usuario que se terminó el tiempo para jugar.
     * Le indica al juego que no se puede seguir jugando.
     */
    function informarTiempoTerminado() {
        cuadroGanador.innerHTML = "¡Se terminó el tiempo!";
        cuadroGanador.classList.replace('hide', 'dialogo');
        juego.terminarJuego();
    }

     // ---- ARRASTRAR FICHA ---- //

    /**
     * Cuando se hace click dentro del canvas, determina si ese hizo click en una ficha válida para la jugada actual.
     * Si se detecta ficha válida comienza a leer el movimiento de la ficha.
     */
    let fichaClickeada;
    canvas.onmousedown = function (event) {
        let x = event.layerX;
        let y = event.layerY;
        fichaClickeada = juego.findClickedFigure(x, y);
        if (fichaClickeada != null) {
            if (fichaClickeada.estaJugada() == false)
            canvas.addEventListener('mousemove', mouseMove);
            else
            fichaClickeada = null;
        }
    }
    
    /**
     * Al soltar la ficha, se lee en qué lugar se soltó.
     * Se le pide al juego que ubique la ficha en el tablero.
     * Se comprueba si hay un ganador.
     * Se muestra el jugador en turno.
     */
    canvas.onmouseup = function (event) {
        if (fichaClickeada) {
            let x = event.offsetX;
            let y = event.offsetY;
            juego.ubicarFicha(x, y, fichaClickeada);
            fichaClickeada = null;
            comprobarGanador();
            comprobarFichas();
            mostrarJugadorEnTurno();
        }
    }
    //por cada movimiento del mouse vuelve a dibujar todas las fichas y el tablero.
    function mouseMove(e) {
        if (fichaClickeada) {
            fichaClickeada.getFigura().setXsetY(e.offsetX, e.offsetY);
            clearCanvas();
            tablero.draw();
            juego.mostrarFichas();
        }
    }

    /**
     * Cuando el mouse se sale del canvas deja de tener la ficha seleccionada.
     */
    canvas.onmouseleave = function (event) {
        fichaClickeada = null;
    }
    

    /**
     * Le pide al juego el número del jugador en turno.
     * Muestra el nombre correspondiente.
     */
    function mostrarJugadorEnTurno() {
        if (juego.getJugadorEnTurno() == 1) {
            jugadorEnTurno.innerHTML = nombreJugador1;
        } else {
            jugadorEnTurno.innerHTML = nombreJugador2;
        }
    }

    /**
     * Le pregunta al juego si hay un ganador.
     * Si hay un ganador, muestra quien es.
     */
    function comprobarGanador() {
        let ganador = juego.getGanador();
        if (ganador != 0) {
            if (ganador == 1) {
                cuadroGanador.innerHTML = "¡Ganó "+nombreJugador1+"!";
            } else {
                cuadroGanador.innerHTML = "¡Ganó "+nombreJugador2+"!";
            }
            clearInterval(espera);
            cuadroGanador.classList.replace('hide', 'dialogo');
        }
    }

    /**
     * Si ya no hay fichas de ninguno de los jugadores, 
     * detiene el cronómetro e informa al usuario.
     */
    function comprobarFichas() {
        if (!juego.quedanFichas()) {
            clearInterval(espera);
            cuadroGanador.innerHTML = "¡Ya no hay fichas!";
            cuadroGanador.classList.replace('hide', 'dialogo');
        }
    }
    
    /**
     * Limpia el canvas completo.
     */
    function clearCanvas() {
        ctx.clearRect(0, 0, width, height);
    }

    
}
