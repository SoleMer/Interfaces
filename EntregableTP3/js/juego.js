class Juego {
    constructor(avatarCont, escenario, personaje) {
        this.avatarObj = new Avatar(avatarCont);
        this.obstaculos = [];
        this.divsObstaculos = ['obstaculo1', 'obstaculo2', 'obstaculo3', 'obstaculo4'];
        this.escenario = new Escenario(escenario);
    }
    
    play() {
        let stop = false;
        let intervalId = setInterval(loop, 100, this.avatarObj, this.obstaculos, this.escenario);
        let i = -1;
        let espera = setInterval(() => {
            console.log(stop);
            if (stop) {
                clearInterval(espera);
            } else {
                if (i < 3) i++;
                else {
                    i = 0;
                    this.obstaculos[0].eliminar();
                }
                this.obstaculos.push(new Obstaculo(this.divsObstaculos[i], 1400));
                //this.obstaculos[this.obstaculos.length - 1].elegirObstaculo();
            }
        }, 2500);

        function loop(a, o, e) {
            if (!a.estaMuerto() && !a.gano()) {
                o.forEach(obst => {
                    if (a.colision(obst)) {
                        a.morir();
                        detenerObstaculos(o);
                        e.detener();
                        clearInterval(intervalId);
                    }
                });
            }
        }
        
        function detenerObstaculos(obstaculos) {
            obstaculos.forEach(o => {
                o.eliminar();
            });
            stop = true;
            showPupUp()
        }

        function showPupUp() {
            let popUp = document.getElementById('pop-up');
            popUp.classList.replace('hide', 'game-over');
            setTimeout(() => {
                let escenario = document.getElementById('capa3');
                escenario.classList.replace('capa3', 'hide');
            }, 800); 
        }
    }

}

