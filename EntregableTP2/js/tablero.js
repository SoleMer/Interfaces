class Tablero {
    constructor(alto, ancho, ctx) {
        this.alto = alto;
        this.ancho = ancho;
        this.ctx = ctx;
        this.image = new Image();
        this.image.src = "img/Pokemon/patronAmarillo100.png";
        this.construirMatriz();
    }

    crearTablero() {
        let t = this;
        this.image.onload = function () {
            t.draw();
        };
    }


    construirMatriz() {
        this.matriz = [this.alto];
        for (let i = 0; i < this.alto; i++) {
            this.matriz[i] = [];
            for (let j = 0; j < this.ancho; j++) {
                this.matriz[i][j] = null;
            }
        }
    }

    draw() {
        let miPatron = this.ctx.createPattern(this.image, "repeat");
        this.ctx.fillStyle = miPatron;
        this.ctx.fillRect( 400, 200, (this.image.width * this.ancho),(this.image.height * this.alto));
    }

    
}

