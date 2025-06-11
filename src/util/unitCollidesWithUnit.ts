import { Unit } from "../classes/Unit";

/**
 * Checks if two units collide based on their hitboxes.
 * A collision occurs if any corner of one unit's hitbox is inside the other unit's hitbox.
 *
 * @param unit1 - The first unit to check for collision.
 * @param unit2 - The second unit to check for collision.
 * @returns {boolean} - Returns true if the units collide, false otherwise.
 */
export const unitCollidesWithUnit = (unit1: Unit, unit2: Unit): boolean => {
  const hitbox1 = unit1.hitbox;
  const hitbox2 = unit2.hitbox;

  // Check if any corner of hitbox1 is inside hitbox2
  const corners1 = [
    hitbox1.topLeft,
    { x: hitbox1.bottomRight.x, y: hitbox1.topLeft.y },
    hitbox1.bottomRight,
    { x: hitbox1.topLeft.x, y: hitbox1.bottomRight.y },
  ];
  // Check if any corner of hitbox2 is inside hitbox1
  const corners2 = [
    hitbox2.topLeft,
    { x: hitbox2.bottomRight.x, y: hitbox2.topLeft.y },
    hitbox2.bottomRight,
    { x: hitbox2.topLeft.x, y: hitbox2.bottomRight.y },
  ];
  const isCorner1Inside2 = corners1.some(
    (corner) =>
      corner.x >= hitbox2.topLeft.x &&
      corner.x <= hitbox2.bottomRight.x &&
      corner.y >= hitbox2.topLeft.y &&
      corner.y <= hitbox2.bottomRight.y
  );
  const isCorner2Inside1 = corners2.some(
    (corner) =>
      corner.x >= hitbox1.topLeft.x &&
      corner.x <= hitbox1.bottomRight.x &&
      corner.y >= hitbox1.topLeft.y &&
      corner.y <= hitbox1.bottomRight.y
  );
  return isCorner1Inside2 || isCorner2Inside1;
};
