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

    crearTablero() { /**Cuando la imagen esta cargada llama a dibujar tablero */
        let t = this;
        this.image.onload = function () {
            t.draw();
        };
    }

    crearArregloColumnas() { /**Crea el arreglo columnas cargado con hasta que pixel le corresponde a cada colomna */
        let arregloColumnas = [];
        arregloColumnas[0] = this.comienzoX + this.ladoImagen;
        for (let i = 1; i < this.ancho; i++) {
            arregloColumnas[i] = (arregloColumnas[i - 1] + this.ladoImagen);
        }
        return arregloColumnas;
    }

    esValida(x, y) { /**Comprueba si la posicion en que es soltada una ficha corresponde a la parte superior del tablero
                        y s a una columna si es asi devuelve a que columna corresponde */
        let col = -1;
        if (y > this.comienzoY-100 && y < this.comienzoY) {
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

    construirMatriz() {     /**Construye la matriz que lleva el control logico del juego */
        let matriz = [this.alto];
        for (let i = 0; i < this.alto; i++) {
            matriz[i] = [];
            for (let j = 0; j < this.ancho; j++) {
                matriz[i][j] = 0;
            }
        }
        return matriz;
    }

    draw() { /**Dibuja el tablero */
        let miPatron = this.ctx.createPattern(this.image, "repeat");
        this.ctx.fillStyle = miPatron;
        this.ctx.fillRect(this.comienzoX, this.comienzoY, (this.image.width * this.ancho), (this.image.height * this.alto));

    }

    getNroCol() { /**Devuelve el ancho del tablero */
        return this.ancho;
    }

    meterFicha(ficha, nroCol, jugador) { /** Pasado el nro de columna comprueba si hay lugar para poner una ficha si es asi 
        devuelve la fila donde tiene que ir */
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

    fijarFicha(ficha, fila, columna) { /** Dibuja la ficha en la posicion que corresponde a la columna y fila pasada por parametro */
        let x = this.comienzoX + fila * this.ladoImagen + this.ladoImagen / 2;
        let y = this.comienzoY + columna * this.ladoImagen + this.ladoImagen / 2;
        ficha.getFigura().setXsetY(x, y);
    }

    horizontal(posFicha, jugador) { /**Controla si hubo victoria horizontal */
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

    vertical(posFicha, jugador) { /**Controla si hubo victoria vertical */
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
    diagonalAscendente(posX, posY, jugador) { /**Controla si hubo victoria en diagonal ascendente */
        let punteroX = posX;
        let punteroY = posY;
        let contador = 0;
        while (punteroY < this.alto-1 && punteroX > 0) {
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

    diagonalDescendente(posX, posY, jugador) { /**Controla si hubo victoria en diagonal descendente */
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

    victoria(posX, posY, jugador) { /**Controla si hubo victoria */
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

