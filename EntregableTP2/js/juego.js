class Juego {
    constructor(tablero, fichaJ1, fichaJ2) {
        this.tablero = tablero;
        //this.jugador1 = jugador1;
        //this.jugador2 = jugador2;
        this.fichasJ1 = [];
        this.fichasJ2 = [];
        this.crearFichas(fichaJ1, fichaJ2);
        this.mostrarTablero();
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
            this.fichaJ2.push(ficha2);
        }
    }

}