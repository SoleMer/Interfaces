"use strict"

window.onkeyup = function (event){
    let avatar = document.getElementById('avatar');
    let interval;
    if (event.keyCode === 32) { // 32= barra espaciadora, 38 = up-arrow
        avatar.classList.replace('avatar', 'saltando');
        interval = setInterval(() => {
            avatar.classList.replace('saltando', 'avatar');
            clearInterval(interval);
        }, 800);
    }else if (event.keyCode === 38) { // 32= barra espaciadora, 38 = up-arrow
        avatar.classList.replace('avatar', 'deslizando'); //arreglar deslizando
        interval = setInterval(() => {
            avatar.classList.replace('deslizando', 'avatar');
            clearInterval(interval);
        }, 800);
    } else {
        console.log(event.keyCode); //queda para poder probar las teclas que queraos hasta que estén todos lo9s eventos hechos
    }
}