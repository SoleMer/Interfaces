"use strict";

window.addEventListener('DOMContentLoaded', (event) => {
    //const avatar = new Avatar(); //Instancio el avatar
    //const obstaculo = new Obstaculo('obstaculo');//Instancio los obtaculos
    const avatarCont = document.getElementById('avatar');
    const juego = new Juego(avatarCont);
    const settings = document.getElementById('settings');
    const play = document.getElementById('play');
    play.addEventListener('click', function() {
        jugar()
    });
    

    window.onkeyup = function (event) {
        let avatar = document.getElementById('avatar');
        let interval;
        if (event.keyCode === 32 || event.keyCode === 38 || event.keyCode === 87) { // 32= barra espaciadora, 38 = up-arrow
            avatar.classList.replace('caminando', 'saltando');
            interval = setInterval(() => {
                avatar.classList.replace('saltando', 'caminando');
                clearInterval(interval);
            }, 800);
        } else if (event.keyCode === 40 || event.keyCode === 83) { // 40 = down-arrow
            avatar.classList.replace('caminando', 'deslizando'); //arreglar deslizando
            interval = setInterval(() => {
                avatar.classList.replace('deslizando', 'caminando');
                clearInterval(interval);
            }, 800);
        } else {
            console.log(event.keyCode); //queda para poder probar las teclas que queramos hasta que estén todos lo9s eventos hechos
        }
    }

    function jugar () {
        settings.classList.replace('settings', 'hide');
        juego.play();
    }

});