import { Coordinates } from "../types/types";
import { Entity } from "./Entity";
import { Game } from "./Game";

interface UnitOptions {
  game: Game;
  coordinates: Coordinates;
  width: number;
  height: number;
}

export class Unit extends Entity {
  game: Game;
  #coordinates: Coordinates;
  #width: number;
  #height: number;
  hitbox: {
    topLeft: Coordinates;
    topRight: Coordinates;
    bottomLeft: Coordinates;
    bottomRight: Coordinates;
  };

  constructor({ game, coordinates, width = 32, height = 32 }: UnitOptions) {
    super();
    this.game = game;
    this.#width = width;
    this.#height = height;
    this.#coordinates = coordinates;
    const { x, y } = coordinates;
    this.hitbox = {
      topLeft: { x: x, y: y },
      topRight: { x: x + width, y: y },
      bottomLeft: { x: x, y: y + height },
      bottomRight: { x: x + width, y: y + height },
    };
  }

  updateHitbox() {
    const { x, y } = this.#coordinates;
    this.hitbox = {
      topLeft: { x: x, y: y },
      topRight: { x: x + this.#width, y: y },
      bottomLeft: { x: x, y: y + this.#height },
      bottomRight: { x: x + this.#width, y: y + this.#height },
    };
  }

  update() {
    this.updateHitbox();
  }

  render() {
    this.game.ctx.save();
    this.game.ctx.fillStyle = "#00ff00";
    this.game.ctx.fillRect(
      this.#coordinates.x,
      this.#coordinates.y,
      this.#width,
      this.#height
    );
    this.game.ctx.restore();
  }

  get coordinates(): Coordinates {
    return this.#coordinates;
  }
  set coordinates(value: Coordinates) {
    this.#coordinates = value;
    this.updateHitbox();
  }

  get width(): number {
    return this.#width;
  }
  set width(value: number) {
    this.#width = value;
    this.updateHitbox();
  }

  get height(): number {
    return this.#height;
  }
  set height(value: number) {
    this.#height = value;
    this.updateHitbox();
  }

  get center(): Coordinates {
    return {
      x: this.#coordinates.x + this.#width / 2,
      y: this.#coordinates.y + this.#height / 2,
    };
  }
}
