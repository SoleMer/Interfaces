class Tablero {
    constructor(alto, ancho, ctx) {
        this.alto = alto;
        this.ancho = ancho;
        this.ctx = ctx;
        this.image = new Image();
        this.image.src = "img/Pokemon/patronAmarillo100.png";
        this.matriz = this.construirMatriz();
        this.arregloColumnas = [];
        this.arregloColumnas = this.crearArregloColumnas();
    }

    crearTablero() {
        let t = this;
        this.image.onload = function () {
            t.draw();
        };
    }

    crearArregloColumnas(){
        let arregloColumnas = [];
        arregloColumnas[0]= 400 + 100;
        for (let i = 1; i < this.ancho; i++){
            arregloColumnas[i] = (arregloColumnas[i-1] + 100); 
        }
        return arregloColumnas;
    }

    esValida(x, y){
        let col = -1;
        if (y > 90 && y < 150) {
           let i = 0;
           while (i < this.ancho){
               if (x < this.arregloColumnas[i]){
                   col = i;
                   return col;
               }
               i++;}
           }
        return col;
    }

    construirMatriz() {
        let matriz = [this.alto];
        for (let i = 0; i < this.alto; i++) {
            matriz[i] = [];
            for (let j = 0; j < this.ancho; j++) {
                matriz[i][j] = null;
            }
        }
        return matriz;
    }

    draw() {
        let miPatron = this.ctx.createPattern(this.image, "repeat");
        this.ctx.fillStyle = miPatron;
        this.ctx.fillRect( 400, 200, (this.image.width * this.ancho),(this.image.height * this.alto));

    }

    getNroCol() {
        return this.ancho;
    }

    meterFicha(ficha, nroCol) {
        let i = this.alto-1;

        while (i >= 0) {
            if (this.matriz[i][nroCol] == null) {
                this.matriz[i][nroCol] = ficha;
                console.log(this.matriz);
                return true;
            }
            i--;
        }
        return false;
    }
}

