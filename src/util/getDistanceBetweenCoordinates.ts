import { Coordinates } from "../types/types";

/**
 * Calculates the Euclidean distance between two coordinates.
 *
 * @param c1 - The first coordinate.
 * @param c2 - The second coordinate.
 * @returns The distance between the two coordinates.
 */
export const getDistanceBetweenCoordinates = (
  c1: Coordinates,
  c2: Coordinates
) => {
  return Math.sqrt(Math.pow(c1.x - c2.x, 2) + Math.pow(c1.y - c2.y, 2));
};
