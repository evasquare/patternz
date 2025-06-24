export const SHAPE = {
    SQUARE: "SQUARE",
    CIRCLE: "CIRCLE",
    DIAMOND: "DIAMOND",
    HEART: "HEART",
    SMALLER_RECTANGLE: "SMALLER_RECTANGLE",
} as const;

export type Shape = keyof typeof SHAPE;

export interface ShapePattern {
    grid: boolean[][];
    shape: Shape;
}
