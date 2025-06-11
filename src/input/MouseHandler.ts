import { Game } from "../classes/Game";
import { Coordinates } from "../types/types";

type MouseEventListener = (e: MouseEvent) => void;
type ScrollEventListener = (e: WheelEvent) => void;

interface EventListeners {
  mousemove: MouseEventListener;
  wheel: ScrollEventListener;
  mousedown: MouseEventListener;
  mouseup: MouseEventListener;
  contextmenu: MouseEventListener;
  click: MouseEventListener;
}

export class MouseHandler {
  #id: number;
  #created: number;
  #destroyed: boolean = false;
  game: Game;
  #eventListeners: Partial<EventListeners> = {};
  mousePosition: Coordinates = { x: 0, y: 0 };

  constructor(game: Game) {
    this.#created = Date.now();
    this.#id = Math.floor(Math.random() * 1000000);
    this.game = game;
    if (this.game.canvas) {
      this.#eventListeners = {
        mousemove: this.mouseMove.bind(this),
        wheel: this.onScroll.bind(this),
        mousedown: this.mouseDown.bind(this),
        mouseup: this.mouseUp.bind(this),
        contextmenu: this.contextMenu.bind(this),
        click: this.click.bind(this),
      };
    }
  }

  destroy() {
    if (this.#destroyed) {
      return;
    }
    this.#destroyed = true;
    const target = this.game.canvas;
    Object.keys(this.#eventListeners).forEach((key) => {
      /* @ts-ignore */
      target?.removeEventListener(key, this.#eventListeners[key]);
    });
  }

  init() {
    if (!window.mousehandlers) {
      window.mousehandlers = [];
    }
    window.mousehandlers.forEach((handler: MouseHandler) => {
      handler.destroy();
    });
    window.mousehandlers.push(this);
    const target = this.game.canvas;
    Object.keys(this.#eventListeners).forEach((key) => {
      /* @ts-ignore */
      target?.addEventListener(key, this.#eventListeners[key]);
    });
  }

  private ignoreInput(e: MouseEvent | WheelEvent) {
    return (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement ||
      e.target instanceof HTMLButtonElement ||
      e.target instanceof HTMLSelectElement ||
      (e.target as HTMLElement)?.closest(".window")
    );
  }

  private click(event: MouseEvent) {
    if (this.ignoreInput(event)) {
      return;
    }
    console.log("Mouse clicked at:", this.mousePosition);
  }

  private mouseMove(event: MouseEvent) {
    const rect = this.game.canvas.getBoundingClientRect();
    this.mousePosition = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  private contextMenu(event: MouseEvent) {
    if (this.ignoreInput(event)) {
      return;
    }
    event.preventDefault();
  }

  private mouseDown(event: MouseEvent) {
    if (this.ignoreInput(event)) {
      return;
    }
  }

  private mouseUp(event: MouseEvent) {
    if (this.ignoreInput(event)) {
      return;
    }
  }

  private onScroll(event: WheelEvent) {
    if (this.ignoreInput(event)) {
      return;
    }
    event.preventDefault();
  }
}
