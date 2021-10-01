

let canvas =  /** @type { HTMLcanvasElement} */ document.getElementById("canvas");
let ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;
let arr = [];
let arr2 = [];
window.
fichas();

canvas.addEventListener("click", );
function fichas() {
    
    for (let i = 0; i < 20; i ++) {
        arr[i] = new Ficha(new Circulo(20+i*10, 20+i*10, ctx, '#000000', 25), "hola");
        arr2[i] = new Cuadrado(500-i*10, 500-i*10, ctx, '#FFF000', 50)
        arr[i].forma.draw();
        arr2[i].draw();
    }
    
}