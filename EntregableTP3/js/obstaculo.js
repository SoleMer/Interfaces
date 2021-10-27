class Obstaculo extends Personaje {
    constructor(personaje, tiempo, escenario) {
        super(personaje)
        this.tiempoEspera = tiempo;
        if (escenario == 1)
            this.elegirObstaculo();
        else
            this.elegirObstaculoHielo();
        this.init();
        this.tipoObstaculo;
        this.esRecolectable;
    }
    elegirObstaculoHielo(){
        let random = Math.floor(Math.random() * 9 + 1);
        this.div.classList.remove('regalos');
        this.div.classList.remove('stoneice');
        this.div.classList.remove('snowman');
        this.div.classList.remove('icebox');
        this.div.classList.remove('caja1');
        this.div.classList.remove('objetoBajo');
        this.div.classList.remove('objetoAlto');

        switch (random) {
            
            
            case 4:
                this.div.classList.add('caja1');
                break;
            case 3:
                this.div.classList.add('icebox');
                break;
            case 2:
                this.div.classList.add('snowman');
                break;
            case 1:
                this.div.classList.add('stoneice');
                break;
            default:
                this.div.classList.add('regalos');
                break;
        }

        if (random > 4) {
            this.tipoObstaculo = 1;
            this.div.classList.add('objetoBajo');
            this.esRecolectable = true;}
        else {
            if (random < 3) {
                this.div.classList.add('objetoBajo');
                this.tipoObstaculo = 1;
                this.esRecolectable = false;
            }
            else {
                this.div.classList.add('objetoAlto');
                this.tipoObstaculo = 2;
                this.esRecolectable = false;
            }
        }

    }
    elegirObstaculo() {
        let random = Math.floor(Math.random() * 12 + 1);
        this.div.classList.remove('cactus1');
        this.div.classList.remove('cactus2');
        this.div.classList.remove('cactus3');
        this.div.classList.remove('skeleton');
        this.div.classList.remove('stone');
        this.div.classList.remove('caja1');
        this.div.classList.remove('caja2');
        this.div.classList.remove('diamante');
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
            case 1:
                this.div.classList.add('cactus1');
                break;
            default:
                this.div.classList.add('diamante');
                break;
        }

        if (random > 7) {
            this.tipoObstaculo = 1;
            this.div.classList.add('objetoBajo');
            this.esRecolectable = true;}
        else {
            if (random < 6) {
                this.div.classList.add('objetoBajo');
                this.tipoObstaculo = 1;
                this.esRecolectable = false;
            }
            else {
                this.div.classList.add('objetoAlto');
                this.tipoObstaculo = 2;
                this.esRecolectable = false;
            }
        }
    }

    init() {
        setTimeout(() => {
            this.div.classList.remove('hide');
            this.div.classList.add('movilidad-obstaculo');
        }, this.tiempoEspera);  //Es el tiempo que tarda en salir a la pantalla
    }

    stop() { //Cuando el avatar pierde quito la clase
        this.div.classList.replace('movilidad-obstaculo', 'stop');
    }

    colision(avatar) {
        if (this.tipoObstaculo == 1) {
            if (this.colisionArribaDerecha(avatar)) return true;
            if (this.colisionArribaIzquierda(avatar)) return true;
        } else {
            
            if (this.colisionAbajoDerecha(avatar)) return true;
            if (this.colisionAbajoIzquierda(avatar)) return true;
        }
        return false;
    }

    colisionAbajoDerecha(avatar) {
        if (this.getLeft() < avatar.getRight() && this.getRight() > avatar.getRight()) {
            if (avatar.getTop() <= this.getBottom()+117) {
                console.log(avatar.getTop(), this.getBottom());
                return true;
            }
        }
        return false;
    }
    
    colisionAbajoIzquierda(avatar) {
        if (this.getLeft() < avatar.getLeft() && this.getRight() > avatar.getLeft()) {
            console.log(avatar.getBottom(), this.getTop())
            if (avatar.getTop() <= this.getBottom()-117) {
                console.log("izquierda");
                return true;
            }
        }
        return false;
    }
    
    colisionArribaDerecha(avatar) {
        if (this.getLeft() < avatar.getRight() && this.getRight() > avatar.getRight()) {
            if (avatar.getTop() >= this.getBottom()) {
                return true;
            }
        }
        return false;
    }

    colisionArribaIzquierda(avatar) {
        if (this.getLeft() < avatar.getLeft() && this.getRight() > avatar.getLeft()) {
            if (avatar.getBottom() >= this.getTop()) {
                return true;
            }
        }
        return false;
    }

    getLeft() {
        return this.div.getBoundingClientRect().x;
    }

    getRight() {
        return this.div.getBoundingClientRect().x + this.div.getBoundingClientRect().width;
    }

    getBottom() {
        return this.div.getBoundingClientRect().y;
    }

    getTop() {
        return this.div.getBoundingClientRect().y + this.div.getBoundingClientRect().height;
    }

    eliminar() {
        
        this.div.classList.remove('movilidad-obstaculo');
        this.div.classList.add('hide');
    }

    getEsRecolectable() {
        return this.esRecolectable;
    }
}