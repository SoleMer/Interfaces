"use strict";

window.addEventListener('DOMContentLoaded', (event) => {
    //const avatar = new Avatar(); //Instancio el avatar
    //const obstaculo = new Obstaculo('obstaculo');//Instancio los obtaculos
    const avatarCont = document.getElementById('avatar');
    const settings = document.getElementById('settings');
    const escenario = document.getElementById('selectEscenario');
    const personaje = document.getElementById('selectPersonaje');
    let juego;
    let divCronometro = document.getElementById('timer');
    const play = document.getElementById('play');
    play.addEventListener('click', function() {
        jugar()
    });
    

    window.onkeyup = function (event) {
       
        if (event.keyCode === 32 || event.keyCode === 38 || event.keyCode === 87) { // 32= barra espaciadora, 38 = up-arrow
            juego.avatarObj.saltar();
         } else if (event.keyCode === 40 || event.keyCode === 83) { // 40 = down-arrow
              juego.avatarObj.deslizarse();
         } else {
             console.log(event.keyCode); //queda para poder probar las teclas que queramos hasta que estén todos lo9s eventos hechos
         }
    }

    function jugar () {
        juego = new Juego(avatarCont, escenario.value, personaje.value,divCronometro);
        settings.classList.replace('settings', 'hide');
        juego.play();
    }

});