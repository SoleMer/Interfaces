class Juego {
    constructor(tablero, fichaJ1, fichaJ2, xEnLinea) {
        this.tablero = tablero;
        this.fichasJ1 = [];
        this.fichasJ2 = [];
        this.cantidadFichasJugadores = [];
        this.crearFichas(fichaJ1, fichaJ2);
        this.xEnLinea = xEnLinea;
        this.mostrarTablero();
        this.jugadorEnTurno = 1;
        this.ganador = 0;
        this.juegoTerminado = false;
    }

    mostrarTablero() {
        this.tablero.crearTablero();
    }

    /**
     * Crea las fichas con las imágenes recibidas, con posiciones random dentro del canvas.
     * @param {*} fichaJ1 url de la imagen de las fichas del j1
     * @param {*} fichaJ2 url de la imagen de las fichas del j2
     */
    crearFichas(fichaJ1, fichaJ2) { 
        for (let i = 0; i < 20; i++) {
            let figura = new Circulo(100, 700 - (i * 8), ctx, fichaJ1, 50);
            let ficha = new Ficha(figura, fichaJ1);
            this.fichasJ1.push(ficha);
            this.cantidadFichasJugadores[0] = i+1;
            let figura2 = new Circulo(1280, 700 - (i * 8), ctx, fichaJ2, 50);
            let ficha2 = new Ficha(figura2, fichaJ2);
            this.fichasJ2.push(ficha2);
            this.cantidadFichasJugadores[1] = i+1;
        }
    }

    /**
     * Llama al método draw de cada ficha.
     */
    mostrarFichas() {
        for (let i = 0; i < this.fichasJ1.length; i++) {
            this.fichasJ1[i].draw();
            this.fichasJ2[i].draw();
        }
    }

    /**
     * Busca si hay una ficha (correspondiente al jugador en turno), en la posición en donde se clickeó 
     * @param {*} x posición en x
     * @param {*} y posición en y
     * @returns la ficha en la que se clickeó
     */
    findClickedFigure(x, y) {
        if (!this.juegoTerminado) {
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
    }

    /**
     * Obtiene la columna en conde va a caer la ficha.
     * Obtiene la fila.
     * Si hay una fila disponible en esa columna, fija la ficha en el tablero
     * Marca la ficha como jugada, limpia el canvas y vuelve a dibujar todo
     * Resta una ficha a la cantidad de fichas del jugadoren turno.
     * Si el jugador en turno ganó,indica el ganador y da por terminado el juego.
     * Sino, cambia el turno al otro jugador.
     * @param {*} x 
     * @param {*} y 
     * @param {*} fichaClickeada 
     */
    ubicarFicha(x, y, fichaClickeada) {
        let columnaValida = 0;
        columnaValida = this.tablero.esValida(x, y);
        if (columnaValida > -1 && columnaValida < this.tablero.getNroCol()) {
            let filaValida = this.tablero.meterFicha(fichaClickeada, columnaValida, this.jugadorEnTurno);
            if (filaValida > -1) {
                this.tablero.fijarFicha(fichaClickeada, columnaValida, filaValida);
                fichaClickeada.setJugada(true);
                this.clearCanvas();
                this.tablero.draw();
                this.mostrarFichas();
                this.cantidadFichasJugadores[this.jugadorEnTurno-1]--;
                if (this.tablero.victoria(columnaValida, filaValida, this.jugadorEnTurno)) {
                    this.ganador = this.jugadorEnTurno;
                    this.terminarJuego();
                } else {
                    this.cambiarTurnoJugador();
                }
            }
        }
    }

    /**
     * Cambia el jugador en tuno
     */
    cambiarTurnoJugador() {
        if (this.jugadorEnTurno === 1) {
            this.jugadorEnTurno++;
        } else {
            this.jugadorEnTurno--;
        }
    }

    /**
     * @returns el número del jugador en turno.
     */
    getJugadorEnTurno() {
        return this.jugadorEnTurno;
    }
    
    /**
     * @returns 0 si no hay ganador, 1/2 si uno de los dos ganó
     */
    getGanador() {
        return this.ganador;
    }
    
    /**
     * Setea como terminaado el juego, lo que va a impedir mover las fichas.
     */
    terminarJuego() {
        this.juegoTerminado = true;
    }

    /**
     * Comprueba que los jugadores tengan fichas.
     * Si no tienen fichas termina el juego.
     * @returns true/false
     */
    quedanFichas() {
        if (this.cantidadFichasJugadores[1] == 0) {
            this.terminarJuego();
            return false;
        }
        return true;
    }
    
    /**
     * Borra todo el canvas.
     */
    clearCanvas() {
        ctx.clearRect(0, 0, width, height);
    }
}