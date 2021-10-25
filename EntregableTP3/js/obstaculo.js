class Obstaculo extends Personaje {
    constructor(personaje, tiempo) {
        super(personaje)
        this.init();
        this.tiempoEspera = tiempo;
        this.elegirObstaculo();
    }

    elegirObstaculo() {
        let random = Math.floor(Math.random() * 7 + 1);
        this.div.classList.remove('cactus1');
        this.div.classList.remove('cactus2');
        this.div.classList.remove('cactus3');
        this.div.classList.remove('skeleton');
        this.div.classList.remove('stone');
        this.div.classList.remove('caja1');
        this.div.classList.remove('caja2');
        this.div.classList.remove('objetoBajo');
        this.div.classList.remove('objetoAlto');

            switch (random) {
                case 7:
                    this.div.classList.add('caja2');
                    break;
                case 6:
                    this.div.classList.add('caja1');
                    break;
                case 5:
                    this.div.classList.add('stone');
                    break;
                case 4:
                    this.div.classList.add('skeleton');
                    break;
                case 3:
                    this.div.classList.add('cactus3');
                    break;
                case 2:
                    this.div.classList.add('cactus2');
                    break;
                default:
                    this.div.classList.add('cactus1');
                    break;
            }
            if (random < 6) this.div.classList.add('objetoBajo');
            else this.div.classList.add('objetoAlto');    
            
    }

    init() {
        setTimeout(() => {
            this.div.classList.add('movilidad-obstaculo');
        }, this.tiempoEspera);  //Es el tiempo que tarda en salir a la pantalla
    }

    stop() { //Cuando el avatar pierde quito la clase
        this.div.classList.replace('movilidad-obstaculo', 'stop');
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

    eliminar() {
        this.div.classList.remove('obstaculo');
        this.div.classList.remove('movilidad-obstaculo');
        this.div.classList.add('hide');
    }
}