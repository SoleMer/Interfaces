class Ficha {

    constructor(forma, imagen) {
        this.forma = forma;
        this.imagen = new Image();
        this.imagen.src = imagen;
        let f = this;
        this.imagen.onload = function () {
            f.draw();
        };
    }

    crearFicha() {
        let f = this;
        this.imagen.onload = function () {
            f.draw();
        };
    }

    draw() {
        this.forma.draw();
    }

    isPointInside(x, y) {
        return this.forma.isPointInside(x, y);
    }
}