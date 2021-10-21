class Avatar {
    constructor() {
        this.muerto = false;
        this.avatar = document.getElementById('avatar');
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
        if (this.getRight() == obstaculo.getLeft()
        || this.getTop == obstaculo.getBottom()
        || this.getBottom == obstaculo.getTop()) {
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