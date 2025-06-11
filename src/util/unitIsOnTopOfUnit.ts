import { Unit } from "../classes/Unit";

/**
 * Checks if unitA is on top of unitB, with a small vertical tolerance.
 * @param unitA The unit to check if it is on top.
 * @param unitB The unit to check if it is below.
 * @param tolerance The allowed overlap in pixels (default: 5).
 */
export const unitIsOnTopOfUnit = (
  unitA: Unit,
  unitB: Unit,
  tolerance: number = 5
): boolean => {
  const a = unitA.hitbox;
  const b = unitB.hitbox;

  // Check horizontal overlap
  const horizontallyAligned =
    a.bottomRight.x > b.topLeft.x && a.topLeft.x < b.bottomRight.x;

  // Check if bottom of A is close to top of B (with tolerance)
  const verticallyOnTop =
    Math.abs(a.bottomRight.y - b.topLeft.y) <= tolerance &&
    a.bottomRight.y <= b.bottomRight.y;

  return horizontallyAligned && verticallyOnTop;
};
