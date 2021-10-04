class Jugador {
    constructor(nombre, img) {
        this.Nombre = nombre;
        this.imgFichas = img;
        this.fichas = [];
        for(let i = 0; i < 20; i++){
            let circulo = new Circulo(100+(i*2), 700, ctx, this.imgFichas, 50);
            let ficha = new Ficha(circulo, this.imgFichas.src);
            this.fichas[i] = ficha;
        } 
    }

    obtenerFichas() {
        this.fichas.forEach(ficha => {
            ficha.crearFicha();
        });
    }
}