export const XP_PER_DIFFICULTY: Record<string, number> = {
  easy: 5,
  medium: 10,
  hard: 20,
};

export const PERFECT_BONUS = 20;

export function xpForLevel(level: number): number {
  return 100 + (level - 1) * 50;
}

export function getLevelInfo(xp: number): {
  level: number;
  currentXp: number;
  xpForNext: number;
} {
  let level = 0;
  let remaining = xp;
  let xpNeeded = xpForLevel(level + 1);
  while (remaining >= xpNeeded) {
    remaining -= xpNeeded;
    level += 1;
    xpNeeded = xpForLevel(level + 1);
  }
  return { level, currentXp: remaining, xpForNext: xpNeeded };
}
