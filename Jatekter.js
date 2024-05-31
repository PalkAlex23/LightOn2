import EredmenyMegjelenit from "./EredmenyMegjelenit.js";
import Lampa from "./Lampa.js";

export default class Jatekter {
  #db = 0;
  #allapotLista = [];
  #lepes = 0;

  constructor() {
    this.#setAllapotLista();
    this.#init();
    $(window).on("kapcsolas", (event) => {
      console.log(event.detail);
      let id = event.detail;
      this.#szomszedokKeresese(id);
    });
  }

  #setAllapotLista() {
    for (let index = 0; index < 9; index++) {
      let vel = Math.random();
      if (vel < 0.2) {
        this.#allapotLista[index] = true;
      } else {
        this.#allapotLista[index] = false;
      }
    }
  }

  #szomszedokKeresese(id) {
    this.#allapotLista[id] = !this.#allapotLista[id];
    if (id % 3 !== 2) {
      this.#allapotLista[id + 1] = !this.#allapotLista[id + 1];
    }
    if (id % 3 !== 0) {
      this.#allapotLista[id - 1] = !this.#allapotLista[id - 1];
    }
    if (id < 6) {
      this.#allapotLista[id + 3] = !this.#allapotLista[id + 3];
    }
    if (id > 2) {
      this.#allapotLista[id - 3] = !this.#allapotLista[id - 3];
    }

    this.#init();

    /* id. elem szomszédok 
    id-1
    id+1
    id-3
    id+3*/
  }

  #init() {
    $(".jatekter").empty();
    this.#db = 0;
    this.#ellenorzes();
    this.#allapotLista.forEach((elem, index) => {
      new Lampa(elem, index, $(".jatekter"));
    });
    new EredmenyMegjelenit(this.#db, $(".eredmeny"));
  }

  #ellenorzes() {
    this.#allapotLista.forEach((elem) => {
      if (!elem) {
        this.#db++;
      }
    });
  }
}
