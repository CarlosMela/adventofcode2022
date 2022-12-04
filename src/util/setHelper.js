export const intersection = (s1, s2) => new Set([...s1].filter((x) => s2.has(x)))
