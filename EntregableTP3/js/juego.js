class Juego {
    constructor(avatarCont) {
        this.avatarObj = new Avatar(avatarCont);
        this.obstaculo = new Obstaculo('obstaculo');
        
    }

    play() {

        let intervalId = setInterval(loop,100,this.avatarObj,this.obstaculo);

    //    while(!this.avatar.estaMuerto() && !this.avatar.gano()) {
    //        if(this.avatar.colision(this.obstaculo)) {
    //            this.avatar.morir();
    //        } else {
    //            requestAnimationFrame(loop);
    //        }
    //    }
        function loop(a,b) 
            {
                if (!a.estaMuerto() && !a.gano()) {
                    if(a.colision(b)) {
                        a.morir();
                    }
                }
            }
        }  
    }

