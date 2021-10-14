class Figura {

    constructor(posX, posY, ctx, fill) {
        this.posX = posX;
        this.posY = posY;
        this.ctx = ctx;
        this.fill = new Image();
        this.fill.src = fill;
        this.click = false;
    }

    getPosition() { /** Devuelve la posicion de figura */
        return {
            x: this.posX,
            y: this.posY,
        };
    }

    getX() { /**Devuelve la posicion en X de figura */
        return this.posX;
    }

    getY() { /**Devuelve la posicion en Y de figura */
        return this.posY;
    }

    getFill() { /** Devuelve fill*/
        return this.fill;
    }

    setFill(fill) { /** Setea fill*/
        this.fill = new Image();
        this.fill.src = fill;
    }

    draw() { /**Dibuja una figura */
        this.ctx.fillStyle = this.fill;
    }

    clickAdentro(x, y){

    }

    setXsetY(x, y) { /**Setea nueva posicion en X e Y para figura */
        this.posX = x;
        this.posY = y;
    }

}