class Juego {
    constructor(avatarCont, escenario, personaje, cronometro) {
        this.avatarObj = new Avatar(avatarCont, personaje);
        this.obstaculos = [];
        this.divsObstaculos = ['obstaculo1', 'obstaculo2', 'obstaculo3', 'obstaculo4', 'obstaculo5'];
        this.escenario = new Escenario(escenario);
        this.cuadroCronometro = cronometro;
    }
    
    play() {
        iniciarCronometro(this.cuadroCronometro,this.avatarObj);
        let stop = false;
        let intervalId = setInterval(loop, 10, this.avatarObj, this.obstaculos, this.escenario);
        let i = -1;
        let espera = setInterval(() => {
            console.log(stop);
            if (stop) {
                clearInterval(espera);
            } else {
                if (i < 4) i++;
                else {
                    i = 0;
                }
                if (this.obstaculos.length > 5) {
                    this.obstaculos[0].eliminar();
                    this.obstaculos.splice(0,1);
                }
                this.obstaculos.push(new Obstaculo(this.divsObstaculos[i], 3000));
            }
        }, 2000);

        function loop(a, o, e) {
            if (!a.estaMuerto() && !a.gano()) {
                o.forEach(obst => {
                    if (obst.colision(a) || a.getSinTiempo()){
                        a.morir();
                        detenerObstaculos(o);
                        e.detener();
                        clearInterval(intervalId);
                        showPupUp(a);
                    }
                });
            }
        }
        
        function detenerObstaculos(obstaculos) {
            obstaculos.forEach(o => {
                o.stop();
            });
            stop = true;
            //showPupUp()
        }


        function showPupUp(avatar) {
            let popUp = document.getElementById('pop-up');
            let muerto = document.getElementById('muerto');
            if (avatar.getNroPersonaje() == 1)
                muerto.classList.add('muerto-aventurero');
            else
                muerto.classList.add('muerto-noel');
            
            popUp.classList.replace('hide', 'game-over');
            
            setTimeout(() => {
                let escenario = document.getElementById('capa3');
                escenario.classList.replace('capa3', 'hide');

            }, 800); 
        }

        function iniciarCronometro(c,a) {
            let espera;
            let cronometro = new Cronometro();
           c.innerHTML = cronometro.getTiempo();
            espera = setInterval(() => {
                cronometro.descontar();
                let tiempo = cronometro.getTiempo();
                if (tiempo == "0:00") {
                    clearInterval(espera);
                    a.setSinTiempo();
                } 
                c.innerHTML = tiempo;
            }, 1000);
        }
    }

}

