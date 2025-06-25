export const THEME = {
    GRAYSCALE: "GRAYSCALE",
    PRIDE: "PRIDE",
    TRANSGENDER: "TRANSGENDER",
    NONBINARY: "NONBINARY",
} as const;

export type Theme = keyof typeof THEME;
