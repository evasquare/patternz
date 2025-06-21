export const SHAPE = {
    SQUARE: "SQUARE",
    CIRCLE: "CIRCLE",
    DIAMOND: "DIAMOND",
} as const;

export type Shape = keyof typeof SHAPE;

export interface ShapePattern {
    grid: boolean[][];
    shape: Shape;
}
