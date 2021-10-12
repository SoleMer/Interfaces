"use strict";

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
    // ---- SECCIONES DE COFIGURACION ---- //
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
        mod.classList.replace('card', 'hide');
        colores.classList.replace('hide', 'card');
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
            fichaBloqueada = fichaElegida;
            fichaJ1 = fichas[fichaElegida];
            nombreJugador1 = document.getElementById('nombreJugador').value;
            seleccionarJugador2();
        } else {
            fichaJ2 = fichas[fichaElegida];
            nombreJugador2 = document.getElementById('nombreJugador').value;
            colores.classList.replace('card', 'hide');
            tamTablero.classList.replace('hide', 'card');
        }
    })

    btnJugar.addEventListener('click', cargarJuego);

    let tablero;
    let juego;

    function cargarJuego() {
        tablero = new Tablero(6, 7, ctx, "img/Pokemon/patronTablero.png");
        juego = new Juego(tablero, fichaJ1, fichaJ2);
        //new Settings(tablero, juego);
    }

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
    }

    function mostrarFichasParaElegir() {
        ficha0.src = fichas[0];
        ficha1.src = fichas[1];
        ficha2.src = fichas[2];
        ficha3.src = fichas[3];
    }

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
        }
    }

    function seleccionarJugador2() {
        jugador++;
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
}
class Settings {
    constructor(tablero, juego) {
        this.tablero = tablero;
        this.juego = juego;
    }

    getTablero() {
        return this.tablero;
    }

    getJuego() {
        return this.juego;
    }
}