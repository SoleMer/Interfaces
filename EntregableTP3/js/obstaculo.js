class Obstaculo extends Personaje{
    constructor(personaje) {
        super(personaje)
        this.init();
    }

    init() {
        setTimeout(() => {
            this.div.classList.add('movilidad-obstaculo');
        }, 1800);  //Es el tiempo que tarda en salir a la pantalla
    }

    stop() { //Cuando el avatar pierde quito la clase
        this.div.classList.remove('movilidad-obstaculo');
    }

    getLeft() {
        return this.div.getBoundingClientRect().left;
    }

    getRight() {
        return this.div.getBoundingClientRect().right;
    }

    getBottom() {
        return this.div.getBoundingClientRect().bottom;
    }

    getTop() {
        return this.div.getBoundingClientRect().top;
    }
}