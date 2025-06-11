import { Game } from "../classes/Game";
import { Unit } from "../classes/Unit";
import { renderSprite } from "../renderHelpers/renderSprite";

export class DemoSkeleton extends Unit {
  direction: "left" | "right" = "right";

  constructor(game: Game) {
    const size = 64;
    super({
      game,
      coordinates: {
        x: game.canvas.width / 2 - size / 2,
        y: game.canvas.height - size / 2,
      },
      width: size,
      height: size,
    });
    this.direction = Math.random() < 0.5 ? "left" : "right";
  }

  update() {
    super.update();
    if (this.direction === "right") {
      this.coordinates.x += this.speedX;
      if (this.coordinates.x > this.game.canvas.width - this.width) {
        this.direction = "left";
      }
    } else {
      this.coordinates.x -= this.speedX;
      if (this.coordinates.x < 0) {
        this.direction = "right";
      }
    }
  }

  render() {
    super.render();
    renderSprite({
      unit: this,
      ctx: this.game.ctx,
      sprite: this.game.images["monsters/Skeleton"],
      spriteUnitWidth: 128,
      spriteUnitHeight: 128,
      numberOfFrames: 4,
      row: 1,
      loopDuration: 100,
      mirrorX: this.direction === "left",
    });
    // Additional rendering logic for DemoSkeleton can be added here
  }
}
