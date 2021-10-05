"use strict";

let canvas =  /** @type { HTMLcanvasElement} */ document.getElementById("canvas");
let ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;
let arr = [];
let arr2 = [];
let mod = document.getElementById('modalidad');
mod.addEventListener('click', cambiarModalidad);
let fondo = document.getElementById('fondo');
//window.fichas();
//canvas.addEventListener("click", );
window.onload = function () {
    /*function fichas() {
        
        for (let i = 0; i < 20; i ++) {
            arr[i] = new Ficha(new Circulo(20+i*10, 20+i*10, ctx, '#000000', 25), "hola");
            arr2[i] = new Cuadrado(500-i*10, 500-i*10, ctx, '#FFF000', 50)
            arr[i].forma.draw();
            arr2[i].draw();
        }*/

    let tablero = new Tablero(6, 7, ctx);
    tablero.crearTablero();
    let fichas = [];
    crearFichas();
    /*
    let image = new Image();
        image.src = "img/Pokemon/pokebolaRoja.jpg";
        image.onload = function() {
            let j1 = new Jugador("pepe", image);
            j1.obtenerFichas();
        }
        let image2 = new Image();
        image2.src = "img/Pokemon/pokebolaAzul.jpg";
        image2.onload = function() {
            let j2 = new Jugador("juan", image);
            j2.obtenerFichas();
        }
        */
    function crearFichas() {
        for (let i = 0; i < 20; i++) {
            let circulo = new Circulo(100 + (i * (Math.random()*10)+1), 700 - (i*4), ctx, "img/Pokemon/pokebolaRoja.jpg", 50);
            let ficha = new Ficha(circulo, "img/Pokemon/pokebolaRoja.jpg");
            fichas.push(ficha);
            let circulo2 = new Circulo(1200 + (i * (Math.random()*10)+1), 700 - (i*4), ctx, "img/Pokemon/pokebolaAzul.jpg", 50);
            let ficha2 = new Ficha(circulo2, "img/Pokemon/pokebolaAzul.jpg");
            fichas.push(ficha2);
        }
    }
    let fichaClickeada;
    canvas.onmousedown =  function(event) {
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

      function mouseMove(e) { // llama a drawLine con los valores X e Y  y los valores hacia donde el mouse sea llevado y actualiza los valores de X e Y
        if(fichaClickeada) {
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


    function clearCanvas(){
        ctx.clearRect(0,0,width,height);
      }

    }
    function cambiarModalidad() {
        fondo.classList.replace('pokemon', 'among-us');
    }