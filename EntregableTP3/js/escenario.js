class Escenario {
    constructor() {
        this.capa1 = document.getElementById('capa1');
        this.capa2 = document.getElementById('capa2');
        this.capa3 = document.getElementById('capa3');
    }

    iniciarMovilidad() {
        this.capa1.classList.add('move-c1');
        this.capa2.classList.add('move-c2');
        this.capa3.classList.add('move-c3');
    }

    detener() {
        this.capa1.classList.remove('move-c1');
        this.capa2.classList.remove('move-c2');
        this.capa3.classList.remove('move-c3');
    }
}