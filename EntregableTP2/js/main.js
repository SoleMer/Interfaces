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
    mod.addEventListener('click', cambiarModalidad);
    let fondo = document.getElementById('fondo');
    let settings = document.getElementById('settings');
    let modalidad;
    let btnPok = document.getElementById('pokemon');
    btnPok.addEventListener('click', function() {
        this.modalidad = 0;
    })
    let btnAmU = document.getElementById('among-us');
    btnAmU.addEventListener('click', function() {
        console.log("among us")
        this.modalidad = 1;
        console.log(modalidad)
    })
    let btnJugar = document.getElementById('play');
    btnJugar.addEventListener('click', cargarJuego);
    let fichas = [];

    function cargarJuego() {
        settings.classList.replace('settings', 'hide');
        let tablero = new Tablero(6, 7, ctx, "");
        console.log(modalidad);
        if (modalidad === 0) {
            tablero.setFill("img/Pokemon/patronAmarillo100.png")
            tablero.crearTablero();
            crearFichas("img/Pokemon/pokebolaRoja.jpg", "img/Pokemon/pokebolaAzul.jpg");
        } else {
            tablero.setFill('img/AmongUs/patronTableroAmongUs.png')
            tablero.crearTablero();
            crearFichas('img/AmongUs/redAmong.jpeg', 'img/AmongUs/blueAmong.png');
        }
    }

    function crearFichas(f1, f2) {
        for (let i = 0; i < 20; i++) {
            let figura = null;
            if (modalidad === 0) {
                figura = new Circulo(100 + (i * (Math.random() * 10) + 1), 700 - (i * 4), ctx, f1, 50);
            } else {
                figura = new Cuadrado(100 + (i * (Math.random() * 10) + 1), 700 - (i * 4), ctx, f1, 60);
            }
            let ficha = new Ficha(figura, f1);
            fichas.push(ficha);
            let figura2 = null;
            if (modalidad === 0) {
                figura2 = new Circulo(1200 + (i * (Math.random() * 10) + 1), 700 - (i * 4), ctx, f2, 50);
            } else {
                figura2 = new Cuadrado(1200 + (i * (Math.random() * 10) + 1), 700 - (i * 4), ctx, f2, 60);
            }
            let ficha2 = new Ficha(figura2, f2);
            fichas.push(ficha2);
        }
    }
    
    let fichaClickeada;
    canvas.onmousedown = function (event) {
        let x = event.layerX;
        let y = event.layerY;
        fichaClickeada = findClickedFigure(x, y);
        canvas.addEventListener('mousemove', mouseMove);
    }

    canvas.onmouseup = function (event) {
        fichaClickeada = null;
    }

    canvas.leave = function (event) {
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

    function mouseMove(e) { // llama a drawLine con los valores X e Y  y los valores hacia donde el mouse sea llevado y actualiza los valores de X e Y
        if (fichaClickeada) {
            fichaClickeada.getFigura().setXsetY(e.offsetX, e.offsetY);
            clearCanvas();
            tablero.draw();
            mostrarFichas();
        }
    }

    function mostrarFichas() {
        for (let i = 0; i < fichas.length; i++) {
            console.log(fichas[i]);
            fichas[i].draw();
        }
    }


    function clearCanvas() {
        ctx.clearRect(0, 0, width, height);
    }

    function cambiarModalidad() {
        fondo.classList.replace('pokemon', 'among-us');
        tablero.setFill('img/AmongUs/patronTableroAmongUs.png');
        clearCanvas();
        tablero.draw();
        crearFichas('img/AmongUs/redAmong.jpeg', 'img/AmongUs/blueAmong.png');
        mostrarFichas()
    }
}
