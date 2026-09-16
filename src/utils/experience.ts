// Career start: July 2021. Months are 0-indexed, so 6 = July.
const CAREER_START = new Date(2021, 6, 1);

/** Whole years of experience since CAREER_START (floored). */
export function getYearsOfExperience(now: Date = new Date()): number {
  let years = now.getFullYear() - CAREER_START.getFullYear();
  if (now.getMonth() < CAREER_START.getMonth()) years -= 1;
  return Math.max(0, years);
}
