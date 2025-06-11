import { Game } from "./classes/Game";

const game = new Game();

const renderLoop = async () => {
  game.render();
  requestAnimationFrame(renderLoop);
};

const updateLoop = async () => {
  game.update();
  // Update 240 times per second - adjust as needed
  setTimeout(updateLoop, 1000 / 240);
};

renderLoop();
updateLoop();

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    game.paused = true;
  } else {
    game.paused = false;
  }
});

// Expose game instance globally so it can be accessed by UI
window.game = game;
