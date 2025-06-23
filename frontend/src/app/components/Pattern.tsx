import { useEffect, useRef } from "react";

import { Shape, SHAPE, ShapePattern } from "../lib/patternType";
import styles from "./pattern.module.css";

const CANVAS_WIDTH = 800;
const ROW_NUMBER = 2;
const OUTER_GAP = 50;
const INNER_GAP = 50;
const ONE_PATTERN_WIDTH = (CANVAS_WIDTH - 2 * OUTER_GAP - INNER_GAP) / 2;

export default function Pattern({
    shapePatterns,
}: {
    shapePatterns: ShapePattern[];
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // Setting up canvas.
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");

        if (!canvas || !context) return;

        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "white";

        // ------------------------

        // Initialize variables to track row and column number.
        let currentRowIndex = 0;
        let currentColumnIndex = 0;

        // Drawing Coordination
        const drawingCord = { x: 0, y: 0 };

        shapePatterns.forEach((shapePattern) => {
            // Move to the next coordination.
            drawingCord.x =
                OUTER_GAP +
                ONE_PATTERN_WIDTH * currentRowIndex +
                INNER_GAP * currentRowIndex;
            drawingCord.y =
                OUTER_GAP +
                ONE_PATTERN_WIDTH * currentColumnIndex +
                INNER_GAP * currentColumnIndex;

            switch (shapePattern.shape) {
                case SHAPE.SQUARE:
                    {
                        const image = new Image();
                        image.src = "/shapes/square.png";

                        image.addEventListener("load", () => {
                            // Save the initial coordination for later use.
                            const initialCord = {
                                x: drawingCord.x,
                                y: drawingCord.y,
                            };

                            // Iterate through each row.
                            shapePattern.grid.forEach((row_grid, index) => {
                                row_grid.forEach((item) => {
                                    if (item) {
                                        context.drawImage(
                                            image,
                                            drawingCord.x,
                                            drawingCord.y,
                                            // Added 1 for an outline
                                            ONE_PATTERN_WIDTH / 3 + 1,
                                            ONE_PATTERN_WIDTH / 3 + 1
                                        );
                                        drawingCord.x += ONE_PATTERN_WIDTH / 3;
                                    }
                                });

                                drawingCord.x = initialCord.x;
                                drawingCord.y =
                                    initialCord.y +
                                    (ONE_PATTERN_WIDTH / 3) * (index + 1);
                            });
                        });
                    }
                    break;
                case SHAPE.CIRCLE:
                    {
                        {
                            const image = new Image();
                            image.src = "/shapes/circle.png";
                            image.addEventListener("load", () => {
                                const initialCord = {
                                    x: drawingCord.x,
                                    y: drawingCord.y,
                                };
                                shapePattern.grid.forEach((row_grid, index) => {
                                    row_grid.forEach((item) => {
                                        if (item) {
                                            context.drawImage(
                                                image,
                                                drawingCord.x,
                                                drawingCord.y,
                                                // Added 1 for an outline
                                                ONE_PATTERN_WIDTH / 3 + 1,
                                                ONE_PATTERN_WIDTH / 3 + 1
                                            );
                                            drawingCord.x +=
                                                ONE_PATTERN_WIDTH / 3;
                                        }
                                    });

                                    drawingCord.x = initialCord.x;
                                    drawingCord.y =
                                        initialCord.y +
                                        (ONE_PATTERN_WIDTH / 3) * (index + 1);
                                });
                            });
                        }
                    }
                    break;
                case SHAPE.DIAMOND:
                    {
                        {
                            const image = new Image();
                            image.src = "/shapes/diamond.png";
                            image.addEventListener("load", () => {
                                const initialCord = {
                                    x: drawingCord.x,
                                    y: drawingCord.y,
                                };
                                shapePattern.grid.forEach((row_grid, index) => {
                                    row_grid.forEach((item) => {
                                        if (item) {
                                            context.drawImage(
                                                image,
                                                drawingCord.x,
                                                drawingCord.y,
                                                // Added 1 for an outline
                                                ONE_PATTERN_WIDTH / 3 + 1,
                                                ONE_PATTERN_WIDTH / 3 + 1
                                            );
                                            drawingCord.x +=
                                                ONE_PATTERN_WIDTH / 3;
                                        }
                                    });

                                    drawingCord.x = initialCord.x;
                                    drawingCord.y =
                                        initialCord.y +
                                        (ONE_PATTERN_WIDTH / 3) * (index + 1);
                                });
                            });
                        }
                    }
                    break;

                default:
                    return;
                    break;
            }

            // Move to the next column.
            if (currentRowIndex == ROW_NUMBER - 1) {
                currentRowIndex = 0;
                currentColumnIndex += 1;
            } else {
                currentRowIndex++;
            }
        });
    }, [canvasRef, shapePatterns]);

    return (
        <canvas
            ref={canvasRef}
            className={styles.patternzCanvas}
            id="patternz-canvas"
            width={CANVAS_WIDTH}
            height={CANVAS_WIDTH}
        ></canvas>
    );
}
