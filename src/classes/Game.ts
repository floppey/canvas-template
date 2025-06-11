import { MouseHandler } from "../input/MouseHandler";
import { ImageName, imageNames } from "../constants/images";
import { Unit } from "./Unit";
import { DemoSkeleton } from "../units/DemoSkeleton";
import { KeyboardHandler } from "../input/KeyboardHandler";
import { Player } from "../units/Player";

export class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  mouseHandler: MouseHandler;
  keyboardHandler: KeyboardHandler;
  /* @ts-expect-error Images will be loaded in the constructor */
  images: Record<ImageName, HTMLImageElement> = {};
  lastUpdate = Date.now();
  paused = false;
  units: Unit[] = [];
  player: Player | null = null;

  constructor() {
    const c = document.querySelector("#canvas") as HTMLCanvasElement;
    if (!c) {
      throw new Error('No canvas element with id "canvas" found');
    }
    this.canvas = c;
    const ctx = this.canvas.getContext("2d");
    if (!ctx) {
      throw new Error("2d context not supported");
    }

    this.ctx = ctx;

    // Set canvas size
    this.canvas.width = 1024; // Default width, can be adjusted
    this.canvas.height = 1024; // Default height, can be adjusted

    this.mouseHandler = new MouseHandler(this);
    this.mouseHandler.init();
    this.keyboardHandler = new KeyboardHandler(this);
    this.keyboardHandler.init();
    this.loadImages();
    this.units.push(new DemoSkeleton(this));
    this.player = new Player(this);
  }

  loadImages() {
    imageNames.forEach((name) => {
      const img = new Image();
      img.src = `./assets/${name}.png`;
      this.images[name] = img;
    });
  }

  update() {
    if (this.paused) return;

    const now = Date.now();
    const deltaTime = now - this.lastUpdate;

    // Update game logic here, e.g., moving objects, checking collisions, etc.
    // This is where you would handle game state updates.

    this.units.forEach((unit) => {
      unit.update();
    });

    this.player?.update();

    this.lastUpdate = now;
  }

  render() {
    // Clear the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.save();
    this.ctx.fillStyle = "#c0c0c0";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = "#000";
    this.ctx.font = "20px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      `Game is ${this.paused ? "Paused" : "Running"}`,
      this.canvas.width / 2,
      this.canvas.height / 2 - 50
    );
    this.ctx.fillText(
      new Date(this.lastUpdate).toLocaleTimeString("nb-NO", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      this.canvas.width / 2,
      this.canvas.height / 2
    );

    // Draw game elements here
    this.units.forEach((unit) => {
      unit.render();
    });

    this.player?.render();

    this.ctx.restore();
  }
}
