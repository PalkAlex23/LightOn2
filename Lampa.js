export default class Lampa {
  #allapot = false; // false azt jelenti, hogy le van kapcsolva, a true ennek az ellentetje
  #id = 0;
  #szuloElem;
  #divElem;

  constructor(allapot, id, szuloElem) {
    this.#allapot = allapot;
    this.#id = id;
    this.#szuloElem = szuloElem;

    this.#megjelenit();
    this.#divElem = this.#szuloElem.children("div:last-child");
    this.#szinBeallit();

    this.#divElem.on("click", () => {
      this.#trigger("kapcsolas");
      this.setAllapot();
    });
  }

  #megjelenit() {
    let txt = `<div></div>`;
    this.#szuloElem.append(txt);
  }

  setAllapot() {
    this.#allapot = !this.#allapot;
    this.#szinBeallit();
  }

  #szinBeallit() {
    if (this.#allapot) {
      this.#divElem.addClass("felkapcs");
    } else {
      this.#divElem.removeClass("felkapcs");
    }
  }

  #trigger(esemenyNev) {
    const e = new CustomEvent(esemenyNev, { detail: this.#id });
    window.dispatchEvent(e);
  }
}
