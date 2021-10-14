class Ficha {

    constructor(forma, imagen) {
        this.forma = forma;
        this.imagen = new Image();
        this.imagen.src = imagen;
        let f = this;
        this.jugada = false;
        this.imagen.onload = function () {
            f.draw();
        };
    }

    crearFicha() { /**Dibuja la ficha cuando la imagen esta cargada */
        let f = this;
        this.imagen.onload = function () {
            f.draw();
        };
    }

    draw() { /**Dibuja la ficha llamando al metodo draw() de la forma de la ficha */
        this.forma.draw();
    }

    clickAdentro(x, y) { /**  */
        return this.forma.clickAdentro(x, y);
    }

    getFigura() { /**Retorna la forma de la ficha */
        return this.forma;
    }

    estaJugada() { /**Retorna si la ficha fue jugada */
        return this.jugada;
    }

    setJugada(bool) { /**Setea la ficha como jugada */
        this.jugada = bool;
    }
}