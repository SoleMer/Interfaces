class Tablero {
    constructor(ctx, imagen, xEnLinea) {
        this.alto = xEnLinea * 1 + 2;
        this.ancho = xEnLinea * 1 + 3;
        this.xEnLinea = xEnLinea;
        if (this.xEnLinea == 4) {
            this.comienzoX = 400;
        } else {
            this.comienzoX = 300;
        }
        if (this.xEnLinea == 6) {
            this.comienzoY = 100;
        } else {
            this.comienzoY = 200;
        }
        this.ladoImagen = 100;
        this.ctx = ctx;
        this.image = new Image();
        this.image.src = imagen;
        this.matriz = this.construirMatriz();

        this.arregloColumnas = [];
        this.arregloColumnas = this.crearArregloColumnas();

    }

    crearTablero() {
        let t = this;
        this.image.onload = function () {
            t.draw();
        };
    }

    crearArregloColumnas() {
        let arregloColumnas = [];
        arregloColumnas[0] = this.comienzoX + this.ladoImagen;
        for (let i = 1; i < this.ancho; i++) {
            arregloColumnas[i] = (arregloColumnas[i - 1] + this.ladoImagen);
        }
        return arregloColumnas;
    }

    esValida(x, y) {
        let col = -1;
        if (y > 40 && y < 150) {
            let i = 0;
            while (i < this.ancho) {
                if (x < this.arregloColumnas[i]) {
                    col = i;
                    return col;
                }
                i++;
            }
        }

        return col;
    }

    construirMatriz() {
        let matriz = [this.alto];
        for (let i = 0; i < this.alto; i++) {
            matriz[i] = [];
            for (let j = 0; j < this.ancho; j++) {
                matriz[i][j] = 0;
            }
        }
        return matriz;
    }

    draw() {
        let miPatron = this.ctx.createPattern(this.image, "repeat");
        this.ctx.fillStyle = miPatron;
        this.ctx.fillRect(this.comienzoX, this.comienzoY, (this.image.width * this.ancho), (this.image.height * this.alto));

    }

    getNroCol() {
        return this.ancho;
    }

    meterFicha(ficha, nroCol, jugador) {
        let i = this.alto - 1;

        while (i >= 0) {
            if (this.matriz[i][nroCol] == 0) {
                this.matriz[i][nroCol] = jugador;

                return i;
            }
            i--;
        }

        return i;
    }
    fijarFicha(ficha, fila, columna) {
        let x = this.comienzoX + fila * this.ladoImagen + this.ladoImagen / 2;
        let y = this.comienzoY + columna * this.ladoImagen + this.ladoImagen / 2;
        ficha.getFigura().setXsetY(x, y);

    }

    horizontal(posFicha, jugador) {
        let contador = 0;
        let puntero = 0;
        while (puntero < this.ancho && contador < this.xEnLinea) {
            if (contador < this.xEnLinea) {
                if (this.matriz[posFicha][puntero] == jugador) {
                    contador++;
                }
                else {
                    contador = 0;
                }
                puntero++;
            }

        }
        if (contador == this.xEnLinea)
            return true;
        else
            return false;
    }

    vertical(posFicha, jugador) {
        let contador = 0;
        let puntero = this.alto - 1;
        while (puntero >= 0 && contador < this.xEnLinea) {
            if (contador < this.xEnLinea) {
                if (this.matriz[puntero][posFicha] == jugador) {
                    contador++;

                }
                else {
                    contador = 0;
                }
                puntero--;
            }
        }
        if (contador == this.xEnLinea)
            return true;
        else
            return false;
    }
    diagonalAscendente(posX, posY, jugador) {
        let punteroX = posX;
        let punteroY = posY;
        let contador = 0;
        while (punteroY < 5 && punteroX > 0) {
            punteroX--;
            punteroY++;
        }

        while (contador < this.xEnLinea && punteroY >= 0 && punteroX < this.ancho) {
            if (contador < this.xEnLinea) {
                if (this.matriz[punteroY][punteroX] == jugador) {
                    contador++;

                }
                else {
                    contador = 0;
                }
                punteroX++;
                punteroY--;
            }

        }
        if (contador == this.xEnLinea)
            return true;
        else
            return false;

    }

    diagonalDescendente(posX, posY, jugador) {
        let punteroX = posX;
        let punteroY = posY;
        let contador = 0;
        while (punteroX > 0 && punteroY > 0) {
            punteroX--;
            punteroY--;
        }
        while (contador < this.xEnLinea && punteroY < this.alto && punteroX < this.ancho) {
            if (contador < this.xEnLinea) {
                if (this.matriz[punteroY][punteroX] == jugador) {
                    contador++;

                }
                else {
                    contador = 0;
                }
                punteroX++;
                punteroY++;
            }
        }
        if (contador == this.xEnLinea)
            return true;
        else
            return false;
    }

    victoria(posX, posY, jugador) {
        let victoria = false;
        victoria = this.horizontal(posY, jugador);
        if (!victoria)
            victoria = this.vertical(posX, jugador);
        if (!victoria)
            victoria = this.diagonalAscendente(posX, posY, jugador);
        if (!victoria)
            victoria = this.diagonalDescendente(posX, posY, jugador);
        return victoria;
    }
}

