import { Coordinates } from "../types/types";

export const getDistanceBetweenCoordinates = (
  c1: Coordinates,
  c2: Coordinates
) => {
  return Math.sqrt(Math.pow(c1.x - c2.x, 2) + Math.pow(c1.y - c2.y, 2));
};
