# Canvas Game Template

A modern TypeScript template for building 2D games using the HTML5 Canvas API. This project provides a clean, extensible foundation for workshop participants to quickly start building their own games.

## Features

- **TypeScript-first:** Strongly-typed codebase for safer, more maintainable development.
- **Modular Structure:** Organized into logical folders (classes, input, rendering, units, utils) for easy navigation and extension.
- **Sprite Rendering:** Built-in helpers for animating and mirroring sprite sheets.
- **Input Handling:** Keyboard and mouse input handlers, easily extendable for custom controls.
- **Entity System:** Base classes for units and entities, ready for extension.
- **Asset Management:** Simple structure for adding and referencing images and other assets.
- **Live Reload:** Works seamlessly with modern dev servers for instant feedback.

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run the project**

   ```bash
   npm run dev
   ```

   (Or use your preferred dev server to serve `index.html`)

3. **Open in your browser**

   Navigate to `http://localhost:5173` (or the port shown in your terminal).

## Project Structure

- `src/`
  - `main.ts` — Entry point
  - `classes/` — Core game classes (Game, Unit, Entity)
  - `input/` — Keyboard and mouse input handlers
  - `renderHelpers/` — Sprite rendering utilities
  - `units/` — Example units (Player, DemoSkeleton)
  - `util/` — Utility functions
  - `constants/` — Asset/image references
  - `css/` — Styles
- `public/assets/monsters/` — Example sprite images
- `index.html` — Main HTML file

## How to Build Your Game

- **Add new units:**
  - Create a new file in `src/units/` and extend the `Unit` class.
- **Add sprites:**
  - Place your images in `public/assets/` and reference them in `src/constants/images.ts`.
- **Handle input:**
  - Extend or modify `KeyboardHandler.ts` and `MouseHandler.ts` for custom controls.
- **Game logic:**
  - Add your logic to `main.ts` or create new classes in `src/classes/`.

## Customization Tips

- Use the provided `renderSprite` helper for animated sprites and mirroring.
- Use the `Game` class as your main loop and state manager.
- Organize your code into modules for clarity and reusability.

## License

MIT — Use freely for workshops, learning, and your own projects.
