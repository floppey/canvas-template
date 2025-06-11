export const imageNames = [
  "monsters/Skeleton",
  "monsters/FireSpirit",
  "monsters/OrcWarrior",
  "monsters/Plant",
] as const;

export type ImageName = (typeof imageNames)[number];
