class Juego {
    constructor(tablero, fichaJ1, fichaJ2) {
        this.tablero = tablero;
        //this.jugador1 = jugador1;
        //this.jugador2 = jugador2;
        this.fichasJ1 = [];
        this.fichasJ2 = [];
        this.crearFichas(fichaJ1, fichaJ2);
        this.mostrarTablero();
        this.jugadorEnTurno = 1;
    }

    mostrarTablero() {
        this.tablero.crearTablero();
    }

    crearFichas(fichaJ1, fichaJ2) { //recibe las urls de las imagenes de las fichas
        for (let i = 0; i < 20; i++) {
            let figura = new Circulo(100 + (i * (Math.random() * 10) + 1), 700 - (i * 4), ctx, fichaJ1, 50);
            let ficha = new Ficha(figura, fichaJ1);
            this.fichasJ1.push(ficha);
            let figura2 = new Circulo(1200 + (i * (Math.random() * 10) + 1), 700 - (i * 4), ctx, fichaJ2, 50);
            let ficha2 = new Ficha(figura2, fichaJ2);
            this.fichasJ2.push(ficha2);
        }
    }

    mostrarFichas() {
        for (let i = 0; i < this.fichasJ1.length; i++) {
            this.fichasJ1[i].draw();
            this.fichasJ2[i].draw();
        }
    }

    // ---- ARRASTRAR FICHA ---- //

    findClickedFigure(x, y) {
        let fichas = [];
        if (this.jugadorEnTurno === 1) {
            fichas = this.fichasJ1;
        } else {
            fichas = this.fichasJ2;
        }
        for (let i = 0; i < fichas.length; i++) {
            const ficha = fichas[i];
            if (ficha.getFigura().clickAdentro(x, y)) {
                return ficha;
            }
        }
    }

    ubicarFicha(x, y, fichaClickeada) {
        let columnaValida = 0;
        columnaValida = this.tablero.esValida(x, y);
        if (columnaValida > -1 && columnaValida < this.tablero.getNroCol()) {
            let filaValida = this.tablero.meterFicha(fichaClickeada, columnaValida, this.jugadorEnTurno);
            if (filaValida > -1) {
                this.tablero.fijarFicha(fichaClickeada, columnaValida, filaValida);
                fichaClickeada.jugada = true;
                this.clearCanvas();
                this.tablero.draw();
                this.mostrarFichas();
                //console.log(this.tablero.horizontal(4 , filaValida, this.jugadorEnTurno));
                //console.log(this.tablero.vertical(4 , columnaValida, this.jugadorEnTurno));
                console.log(this.tablero.victoria(4 , columnaValida, filaValida, this.jugadorEnTurno));
                this.cambiarTurnoJugador();
                
            }
            else {
                //dibujar la ficha en donde corresponde   
            }
        }
    }

    cambiarTurnoJugador() {
        if (this.jugadorEnTurno === 1) {
            this.jugadorEnTurno++;
        } else {
            this.jugadorEnTurno--;
        }
    }

    clearCanvas() {
        ctx.clearRect(0, 0, width, height);
    }

}