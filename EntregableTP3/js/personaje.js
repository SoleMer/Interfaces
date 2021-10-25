class Personaje {
    constructor(personaje) {
      this.personaje = personaje;
      console.log(this.personaje);
      this.div = document.getElementById(this.personaje);
     /* this.width = this.div.getBoundingClientRect().width;
      this.height = this.div.getBoundingClientRect().height;
      this.position = {top: this.div.getBoundingClientRect().top, left: this.div.offsetLeft};*/
    }
  
  }