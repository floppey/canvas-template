import { Game } from "../classes/Game";
import { Unit } from "../classes/Unit";
import { renderSprite } from "../renderHelpers/renderSprite";

export class Player extends Unit {
  speed: number = 2;
  direction: "left" | "right" | "none" = "none";
  constructor(game: Game) {
    const size = 64;
    super({
      game,
      coordinates: {
        x: game.canvas.width / 2 - size / 2,
        y: game.canvas.height - size,
      },
      width: size,
      height: size,
    });
  }

  update() {
    super.update();

    // D is pressed and A is not pressed
    if (
      this.game.keyboardHandler.pressedKeys["D"] &&
      !this.game.keyboardHandler.pressedKeys["A"]
    ) {
      this.direction = "right";
    }
    // A is pressed and D is not pressed
    else if (
      this.game.keyboardHandler.pressedKeys["A"] &&
      !this.game.keyboardHandler.pressedKeys["D"]
    ) {
      this.direction = "left";
    } else {
      this.direction = "none";
    }

    if (this.direction === "right") {
      this.coordinates.x = Math.min(
        this.coordinates.x + this.speed,
        this.game.canvas.width - this.width
      );
    }

    if (this.direction === "left") {
      this.coordinates.x = Math.max(this.coordinates.x - this.speed, 0);
    }
  }

  render() {
    super.render();
    let row = 5;
    let numberOfFrames = 4;
    let mirrorX = false;
    if (this.direction === "right") {
      row = 7;
      numberOfFrames = 5;
    } else if (this.direction === "left") {
      row = 7;
      numberOfFrames = 5;
      mirrorX = true;
    }

    renderSprite({
      unit: this,
      ctx: this.game.ctx,
      sprite: this.game.images["monsters/OrcWarrior"],
      spriteUnitWidth: 128,
      spriteUnitHeight: 128,
      numberOfFrames,
      row,
      loopDuration: 100,
      mirrorX,
    });
    // Additional rendering logic for Player can be added here
  }
}
