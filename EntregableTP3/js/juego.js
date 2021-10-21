class Juego {
    constructor(avatar, obstaculo) {
        this.avatar = avatar;
        this.obstaculo = obstaculo;
    }

    loop() {
        while(!this.avatar.estaMuerto() && !this.avatar.gano()) {
            if(this.avatar.colision(this.obstaculo)) {
                this.avatar.morir();
            } else {
                requestAnimationFrame(loop);
            }
        }
    }
}