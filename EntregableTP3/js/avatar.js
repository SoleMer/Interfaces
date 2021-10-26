class Avatar extends Personaje{
    constructor(avatarCont, nro) {
        super('avatar');
        this.muerto = false;
        this.nroPersonaje = nro;
        this.avatar = avatarCont;
        this.caminar();

    }

    estaMuerto() {
        return this.muerto;
    }

    gano() {
        return false;
    }

    caminar() {
        console.log("neo personaje" + this.nroPersonaje);
        if (this.nroPersonaje == 1) {
            this.div.classList.add('caminando-aventurero');
        } else {
            this.div.classList.add('caminando-noel');
        }

    }

    saltar() {
        if (this.nroPersonaje == 1) {
            this.div.classList.replace('caminando', 'saltando');
            this.div.classList.replace('caminando-aventurero', 'saltando-aventurero');
            let interval = setInterval(() => {
                this.div.classList.replace('saltando', 'caminando');
                this.div.classList.replace('saltando-aventurero', 'caminando-aventurero');
                clearInterval(interval);
            }, 800);
            this.div.classList.remove('caminando-aventurero');
            this.div.classList.add('saltando-aventurero');
        } else {
            this.div.classList.replace('caminando', 'saltando');
            this.div.classList.replace('caminando-noel', 'saltando-noel');
            let interval = setInterval(() => {
                this.div.classList.replace('saltando', 'caminando');
                this.div.classList.replace('saltando-noel', 'caminando-noel');
                clearInterval(interval);
            }, 800);
            this.div.classList.remove('caminando-noel');
            this.div.classList.add('saltando-noel');
        }
    }

    deslizarse() {
        if (this.nroPersonaje == 1) {
            this.div.classList.replace('caminando', 'deslizando');
            this.div.classList.replace('caminando-aventurero', 'deslizando-aventurero');
            let interval = setInterval(() => {
                this.div.classList.replace('deslizando', 'caminando');
                this.div.classList.replace('deslizando-aventurero', 'caminando-aventurero');
                clearInterval(interval);
            }, 800);
            this.div.classList.remove('caminando-aventurero');
            this.div.classList.add('deslizando-aventurero');
        } else {
            this.div.classList.replace('caminando', 'deslizando');
            this.div.classList.replace('caminando-noel', 'deslizando-noel');
            let interval = setInterval(() => {
                this.div.classList.replace('deslizando', 'caminando');
                this.div.classList.replace('deslizando-noel', 'caminando-noel');
                clearInterval(interval);
            }, 800);
            this.div.classList.remove('caminando-noel');
            this.div.classList.add('deslizando-noel');
        }
    }

    morir() {
        this.muerto = true;
        if (this.nroPersonaje == 1) {
            this.div.classList.remove('caminando');
            this.div.classList.remove('caminando-aventurero');
            this.div.classList.remove('saltando');
            this.div.classList.remove('saltando-aventurero');
            this.div.classList.remove('deslizando');
            this.div.classList.remove('deslizando-aventurero');
            this.div.classList.add('muriendo');
            this.div.classList.add('muriendo-aventurero');
            let interval = setInterval(() => {
                this.div.classList.replace('muriendo-aventurero', 'muerto-aventurero');
                this.div.classList.replace('muriendo', 'muerto');
               
                clearInterval(interval);
            }, 800);
        }
        else 
        {
            this.div.classList.remove('caminando');
            this.div.classList.remove('caminando-noel');
            this.div.classList.remove('saltando');
            this.div.classList.remove('saltando-noel');
            this.div.classList.remove('deslizando');
            this.div.classList.remove('deslizando-noel');
            this.div.classList.add('muriendo');
            this.div.classList.add('muriendo-noel');
            let interval = setInterval(() => {
                this.div.classList.replace('muriendo-noel', 'muerto-noel');
                this.div.classList.replace('muriendo', 'muerto');
                
                clearInterval(interval);
            }, 800);
        }
    }

    colision(obstaculo) {

        if (this.getBottom() >= obstaculo.getTop()){
            if (this.getRight()>obstaculo.getLeft() && this.getRight()<obstaculo.getRight()){
                console.log("muere por izquierda");
                return true;
            }
            if (this.getLeft() > obstaculo.getLeft() && this.getLeft() < obstaculo.getRight()){
                console.log("muere por derecha");
                return true;

            }
        }
        return false;
    }

    getRight() {
        return this.avatar.getBoundingClientRect().right;
    }

    getTop() {
        return this.avatar.getBoundingClientRect().top;
    }

    getLeft() {
        return this.avatar.getBoundingClientRect().left;
    }

    getBottom() {
        return this.avatar.getBoundingClientRect().bottom;
    }

    getNroPersonaje(){
        return this.nroPersonaje;
    }

    setSinTiempo() {
        this.sinTiempo = true;
    }

    getSinTiempo() {
        return this.sinTiempo;
    }

}