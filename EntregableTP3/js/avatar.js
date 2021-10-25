class Avatar extends Personaje{
    constructor(avatarCont) {
        super('avatar');
        this.muerto = false;
        this.avatar = avatarCont;
    }

    estaMuerto() {
        return this.muerto;
    }

    gano() {
        return false;
    }

    morir() {
        this.muerto = true;
        this.div.classList.remove('caminando');
        this.div.classList.remove('saltando');
        this.div.classList.remove('deslizando');
        this.div.classList.add('muriendo');
        let interval = setInterval(() => {
            this.div.classList.replace('muriendo', 'muerto');
            clearInterval(interval);
        }, 800);
    }

    colision(obstaculo) {
        if (this.getBottom() >= obstaculo.getTop())
            if (this.getRight()>obstaculo.getLeft() && this.getRight()<obstaculo.getRight()){
                return true;
        }

        return false;
    }

    getRight() {
        return this.avatar.getBoundingClientRect().right;
    }

    getTop() {
        return this.avatar.getBoundingClientRect().top;
    }

    getBottom() {
        return this.avatar.getBoundingClientRect().bottom;
    }
}