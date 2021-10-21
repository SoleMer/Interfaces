class Avatar {
    constructor(avatarCont) {
        this.muerto = false;
        this.avatar = avatarCont;
        console.log("creado");
    }

    estaMuerto() {
        return this.muerto;
    }

    gano() {
        return false;
    }

    morir() {
        this.muerto = true;
        alert('muerto');
    }

    colision(obstaculo) {
        if (this.getBottom() >= obstaculo.getTop())
            if (this.getRight()>obstaculo.getLeft() && this.getRight()<obstaculo.getRight()){
        //if (this.getRight() == obstaculo.getLeft()
        //|| this.getTop() == obstaculo.getBottom()
        //|| this.getBottom() == obstaculo.getTop()) {
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