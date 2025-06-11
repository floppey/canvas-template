import { Unit } from "../classes/Unit";

export interface SpriteRenderProps {
  /** The unit that the sprite is associated with */
  unit: Unit;
  /** The canvas context for rendering */
  ctx: CanvasRenderingContext2D;
  /** The sprite image */
  sprite: HTMLImageElement;
  /** The row in the sprite sheet to render */
  row: number;
  /** The width of a single sprite unit */
  spriteUnitWidth: number;
  /** The height of a single sprite unit */
  spriteUnitHeight: number;
  /** The duration of a single loop in milliseconds */
  loopDuration: number;
  /** The number of frames in the sprite */
  numberOfFrames: number;
  /** Optional: Whether to mirror the sprite horizontally */
  mirrorX?: boolean;
}

export const renderSprite = ({
  unit,
  ctx,
  sprite,
  spriteUnitWidth,
  spriteUnitHeight,
  numberOfFrames,
  row,
  loopDuration = 1000, // Default to 1000ms if not provided
  mirrorX = false,
}: SpriteRenderProps) => {
  const col = Math.floor((Date.now() / loopDuration) % numberOfFrames);
  let x = unit.coordinates.x;
  let y = unit.coordinates.y;

  ctx.save();

  if (mirrorX) {
    // Move the origin to the right edge of the sprite, then flip
    ctx.translate(x + unit.width, unit.coordinates.y);
    ctx.scale(-1, 1);
    // After translate, draw at (0, 0)
    x = 0;
    y = 0;
  } else {
    ctx.translate(0, 0);
  }

  ctx.drawImage(
    sprite,
    col * spriteUnitWidth, // source x
    row * spriteUnitHeight, // source y
    spriteUnitWidth, // source width
    spriteUnitHeight, // source height
    x, // dest x
    y, // dest y
    unit.width, // dest width
    unit.height // dest height
  );

  ctx.restore();
};
