class Figura {

    constructor(posX, posY, ctx, fill) {
        this.posX = posX;
        this.posY = posY;
        this.ctx = ctx;
        this.fill = new Image();
        this.fill.src = fill;
        this.click = false;
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

    setFill(fill) {
        this.fill = new Image();
        this.fill.src = fill;
    }

    draw() {
        this.ctx.fillStyle = this.fill;
    }

    clickAdentro(x, y){

    }

    setXsetY(x, y) {
        this.posX = x;
        this.posY = y;
    }

}