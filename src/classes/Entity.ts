export class Entity {
  #id: number;

  constructor() {
    this.#id = Math.floor(Math.random() * 10000000);
  }

  get id() {
    return this.#id;
  }
}
