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
        return obstaculo.colision(this);
    }

    getRight() {
        return this.avatar.getBoundingClientRect().x + this.div.getBoundingClientRect().width;
    }

    getLeft() {
        return this.avatar.getBoundingClientRect().x;
    }

    getTop() {
        return this.avatar.getBoundingClientRect().y + this.div.getBoundingClientRect().height;
    }

    getBottom() {
        return this.avatar.getBoundingClientRect().y;
    }

    getWidht() {
        return
    }
}