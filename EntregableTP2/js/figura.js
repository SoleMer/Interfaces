class Figura {

    constructor(posX, posY, ctx, fill) {
        this.posX = posX;
        this.posY = posY;
        this.ctx = ctx;
        this.fill = fill;
    }

    getPosition() {
        return {
            x: this.posX,
            y: this.posY,
        };
    }

    getX() {
        return this.posX;
    }

    getY() {
        return this.posY;
    }

    getFill() {
        return this.fill;
    }

    draw() {
        this.ctx.fillStyle = this.fill;
    }

    clickAdentro(x, y){

    }
}