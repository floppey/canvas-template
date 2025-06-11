import { Game } from "../classes/Game";

interface EventListeners {
  keydown: (e: KeyboardEvent) => void;
  keyup: (e: KeyboardEvent) => void;
}

export class KeyboardHandler {
  #id: number;
  #created: number;
  #game: Game;
  #destroyed: boolean = false;
  #eventListeners: Partial<EventListeners> = {};
  #pressedKeys: { [key: string]: boolean } = {};

  constructor(game: Game) {
    this.#created = Date.now();
    this.#id = Math.floor(Math.random() * 1000000);
    this.#game = game;
    this.#pressedKeys = {};
    this.#eventListeners = {
      keydown: this.keyDownHandler.bind(this),
      keyup: this.keyUpHandler.bind(this),
    };
  }

  init() {
    if (!window.keyboardhandlers) {
      window.keyboardhandlers = [];
    }
    window.keyboardhandlers.forEach((handler: KeyboardHandler) => {
      handler.destroy();
    });
    window.keyboardhandlers.push(this);
    Object.keys(this.#eventListeners).forEach((key) => {
      /* @ts-ignore */
      window.addEventListener(key, this.#eventListeners[key]);
    });
  }

  get pressedKeys() {
    return this.#pressedKeys;
  }

  private keyDownHandler = (e: KeyboardEvent) => {
    if (this.ignoreInput(e) || this.#pressedKeys[e.keyCode]) {
      return;
    }

    this.#pressedKeys[e.keyCode] = true;
  };

  private ignoreInput(e: KeyboardEvent) {
    return (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement ||
      e.target instanceof HTMLButtonElement ||
      e.target instanceof HTMLSelectElement ||
      (e.target as HTMLElement)?.closest(".window")
    );
  }

  private keyUpHandler = (e: KeyboardEvent) => {
    if (this.ignoreInput(e)) {
      return;
    }
    this.#pressedKeys[e.keyCode] = false;
  };

  destroy() {
    if (this.#destroyed) {
      return;
    }
    this.#destroyed = true;
    Object.keys(this.#eventListeners).forEach((key) => {
      /* @ts-ignore */
      window.removeEventListener(key, this.#eventListeners[key]);
    });
  }
}
