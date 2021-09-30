class Circulo extends Figura {
    constructor(posX, posY, ctx, fill, radio) {
        super(posX, posY, ctx, fill);
        this.radio = radio;
    }

    draw() {
        super.draw();
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radio, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }

    setX(x){
        this.posX = x;
    }
    setX(y){
        this.posY = y;
    }
    clickAdentro(x, y) {
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radio;

    }
}