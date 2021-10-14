class Cuadrado extends Figura {
    constructor(posX, posY, ctx, fill, lado) {
        super(posX, posY, ctx, fill);
        this.ladoA = lado;
        this.ladoB = lado;
    }


    draw() {
        super.draw();
        this.ctx.fillRect(this.posX, this.posY, this.ladoA, this.ladoB);
        this.ctx.closePath();
        this.ctx.drawImage(this.fill, this.posX, this.posY, this.lado);
        this.ctx.closePath();
    }

    setX(x){
        this.posX = x;
    }
    setY(y){
        this.posY = y;
    }

    clickAdentro(x, y) {

    }
    
} 