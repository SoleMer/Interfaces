"use strict";

window.addEventListener('DOMContentLoaded', (event) => {
    //const avatar = new Avatar(); //Instancio el avatar
    //const obstaculo = new Obstaculo('obstaculo');//Instancio los obtaculos
    const avatarCont = document.getElementById('avatar');
    const juego = new Juego(avatarCont);
    

    window.onkeyup = function (event) {
        let avatar = document.getElementById('avatar');
        let interval;
        if (event.keyCode === 32 || event.keyCode === 38 || event.keyCode === 87) { // 32= barra espaciadora, 38 = up-arrow
            avatar.classList.replace('avatar', 'saltando');
            interval = setInterval(() => {
                avatar.classList.replace('saltando', 'avatar');
                clearInterval(interval);
            }, 800);
        } else if (event.keyCode === 40 || event.keyCode === 83) { // 40 = down-arrow
            avatar.classList.replace('avatar', 'deslizando'); //arreglar deslizando
            interval = setInterval(() => {
                avatar.classList.replace('deslizando', 'avatar');
                clearInterval(interval);
            }, 800);
        } else {
            console.log(event.keyCode); //queda para poder probar las teclas que queraos hasta que estén todos lo9s eventos hechos
        }
    }

   juego.play();

});