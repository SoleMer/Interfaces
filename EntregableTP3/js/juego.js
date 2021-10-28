class Juego {
    constructor(avatarCont, escenario, personaje, cronometro, puntos) {
        this.avatarObj = new Avatar(avatarCont, personaje, puntos);
        this.obstaculos = [];
        this.nroEscenario = escenario;
        this.divsObstaculos = ['obstaculo1', 'obstaculo2', 'obstaculo3', 'obstaculo4', 'obstaculo5'];
        this.escenario = new Escenario(escenario);
        this.cuadroCronometro = cronometro;
        this.recolectable = new Obstaculo('diamante', 2000, this.nroEscenario, true);
    }
    
    play() {
        iniciarCronometro(this.cuadroCronometro,this.avatarObj);
        let stop = false;
        let intervalId = setInterval(loop, 10, this.avatarObj, this.obstaculos, this.escenario, this.recolectable);
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
                this.obstaculos.push(new Obstaculo(this.divsObstaculos[i], 3000, this.nroEscenario, false));
            }
        }, 2000);

        function loop(a, o, e, r) {
            if (!a.estaMuerto() && !a.gano()) {
                o.forEach(obst => {
                    if (a.colision(obst) || a.colision(r) || a.getSinTiempo()){
                        let puntos = a.morir();
                        detenerObstaculos(o);
                        e.detener();
                        clearInterval(intervalId);
                        showPupUp(a, puntos);
                    } 
                });
            }
        }
        
        function detenerObstaculos(obstaculos) {
            obstaculos.forEach(o => {
                o.stop();
                o.eliminar();
            });
            stop = true;
            //showPupUp()
        }


        function showPupUp(avatar, puntos) {
            let popUp = document.getElementById('pop-up');
            let muerto = document.getElementById('muerto');
            if (avatar.getNroPersonaje() == 1)
                muerto.classList.add('muerto-aventurero');
            else
                muerto.classList.add('muerto-noel');
            
            popUp.classList.replace('hide', 'game-over');
            document.getElementById('puntos-totales').innerHTML = puntos;
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

