export const PercentageStats = (value: number): string => {
  const clampedValue = Math.min(Math.max(value, 0), 100);
  return `${clampedValue}%`;
};
