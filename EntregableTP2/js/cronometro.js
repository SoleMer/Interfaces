class Cronometro {
    constructor() {
        this.segundos = 0;
        this.minutos = 15;
    }

    /**
     * Descuenta los segundos de uno en uno.
     * Si llega a cero, vuelve a 59 y descuenta un minuto.
     */
    descontar() {
        if (this.segundos > 0) {
            this.segundos--;
        } else {
            this.segundos = 59;
            this.minutos--;
        }
    }

    /**
     * @returns un String con los minutos y segundos tal como se deben mostrar.
     * Si los segundos son un número de un solo dígito, se le agrega el '0' adelante.
     */
    getTiempo() {
        if (this.segundos < 10) {
            return this.minutos + ':0' + this.segundos;
        } else {
            return this.minutos + ':' + this.segundos;
        }
    }

}