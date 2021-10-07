"use strict";

let canvas =  /** @type { HTMLcanvasElement} */ document.getElementById("canvas");
let ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;
let arr = [];
let arr2 = [];
//window.fichas();
//canvas.addEventListener("click", );
window.onload = function () {
    let mod = document.getElementById('modalidad');
    //mod.addEventListener('click', cambiarModalidad);
    let settings = document.getElementById('settings');
    let btnJugar = document.getElementById('play');
    btnJugar.addEventListener('click', cargarJuego);
    let fichas = [];
    this.imagenesFichas = ["img/Pokemon/pokebolaRoja.jpg", "img/Pokemon/pokebolaAzul.jpg", "img/Pokemon/pokebolaAzul.jpg", "img/Pokemon/pokebolaAmarilla.jpg"];
    let tablero;
    let juego;

    function cargarJuego() {
        settings.classList.replace('settings', 'hide');
        tablero = new Tablero(6, 7, ctx, "img/Pokemon/patronTablero.png");
        juego = new Juego(tablero, "", "");
    }

    function crearFichas(f1, f2) {
        for (let i = 0; i < 20; i++) {
               let figura = new Circulo(100 + (i * (Math.random() * 10) + 1), 700 - (i * 4), ctx, f1, 50);
            
            let ficha = new Ficha(figura, f1);
            fichas.push(ficha);
            let figura2 = null;
                figura2 = new Circulo(1200 + (i * (Math.random() * 10) + 1), 700 - (i * 4), ctx, f2, 50);
            
            let ficha2 = new Ficha(figura2, f2);
            fichas.push(ficha2);
        }
    }
    
    let fichaClickeada;
    canvas.onmousedown = function (event) {
        let x = event.layerX;
        let y = event.layerY;
        fichaClickeada = findClickedFigure(x, y);
        if (fichaClickeada.jugada == false)
            canvas.addEventListener('mousemove', mouseMove);
        else
            fichaClickeada = null;
    }

    canvas.onmouseup = function (event) {
        if (fichaClickeada) {
            let x = event.offsetX;
            let y = event.offsetY;
            let columnaValida = 0;
            columnaValida = tablero.esValida(x, y);
            if (columnaValida > -1 && columnaValida < tablero.getNroCol()) {
                let filaValida = tablero.meterFicha(fichaClickeada, columnaValida);
                if (filaValida > -1){
                    tablero.fijarFicha(fichaClickeada, columnaValida, filaValida);
                    fichaClickeada.jugada = true;
                    clearCanvas();
            tablero.draw();
            mostrarFichas();
                }
                else {
                //dibujar la ficha en donde corresponde   
            }
        }
        fichaClickeada = null;
        }
    }
    canvas.onmouseleave =  function(event) {
        fichaClickeada = null;
    }

    function findClickedFigure(x, y) {
        for (let i = 0; i < fichas.length; i++) {
            const ficha = fichas[i];
            if (ficha.clickAdentro(x, y)) {
                return ficha;
            }
        }
    }

    function mouseMove(e) { 
        if (fichaClickeada) {
            fichaClickeada.getFigura().setXsetY(e.offsetX, e.offsetY);
            clearCanvas();
            tablero.draw();
            mostrarFichas();
        }
    }

    function mostrarFichas() {
        for (let i = 0; i < fichas.length; i++) {
            fichas[i].draw();
        }
    }


    function clearCanvas() {
        ctx.clearRect(0, 0, width, height);
    }

   /* function cambiarModalidad() {
        fondo.classList.replace('pokemon', 'among-us');
        tablero.setFill('img/AmongUs/patronTableroAmongUs.png');
        clearCanvas();
        tablero.draw();
        crearFichas('img/AmongUs/redAmong.jpeg', 'img/AmongUs/blueAmong.png');
        mostrarFichas()
    }*/
}
