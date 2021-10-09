class Tablero {
    constructor(alto, ancho, ctx, imagen) {
        this.alto = alto;
        this.ancho = ancho;
        this.comienzoX = 400;
        this.comienzoY = 200;
        this.ladoImagen = 100;
        this.ctx = ctx;
        this.image = new Image();
        this.image.src = imagen;
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
        arregloColumnas[0]= this.comienzoX + 100;
        for (let i = 1; i < this.ancho; i++){
            arregloColumnas[i] = (arregloColumnas[i-1] + this.ladoImagen); 
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
        this.ctx.fillRect( this.comienzoX, this.comienzoY, (this.image.width * this.ancho),(this.image.height * this.alto));

    }

    getNroCol() {
        return this.ancho;
    }

    meterFicha(ficha, nroCol) {
        let i = this.alto-1;

        while (i >= 0) {
            if (this.matriz[i][nroCol] == null) {
                this.matriz[i][nroCol] = ficha;
                return i;
            }
            i--;
        }
        return i;
    }
    fijarFicha(ficha, fila, columna){
        let x = this.comienzoX + fila*this.ladoImagen + this.ladoImagen/2;
        let y = this.comienzoY + columna*this.ladoImagen + this.ladoImagen/2;
        ficha.getFigura().setXsetY(x,y); 

    }
}

