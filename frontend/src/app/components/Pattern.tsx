import { useEffect, useRef, useState } from "react";

import { SHAPE, ShapePattern } from "../lib/patternType";
import { THEME } from "../lib/themesType";
import styles from "./pattern.module.css";

const CANVAS_WIDTH = 800;
const ROW_NUMBER = 3;
const OUTER_GAP = 30;
const INNER_GAP = 20;
const ONE_PATTERN_WIDTH =
    (CANVAS_WIDTH - 2 * OUTER_GAP - INNER_GAP * (ROW_NUMBER - 1)) / ROW_NUMBER;

export default function Pattern({
    shapePatterns,
}: {
    shapePatterns: ShapePattern[];
}) {
    const [symbolColor, setSymbolColor] = useState<"WHITE" | "BLACK">("WHITE");

    const getThemedImage = (imageName: string, color: "WHITE" | "BLACK") => {
        switch (color) {
            case "WHITE":
                return `/assets/shapes/${imageName}-white.png`;
                break;
            case "BLACK":
                return `/assets/shapes/${imageName}-black.png`;
                break;
        }
    };
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleTheme = async (
        canvas: HTMLCanvasElement,
        context: CanvasRenderingContext2D
    ) => {
        const selectedTheme = localStorage.getItem("theme");

        const drawBackground = async (backgroundImage: string) => {
            const image = new Image();
            image.src = backgroundImage;

            const imageLoadPromise = new Promise((resolve, reject) => {
                image.addEventListener("load", () => resolve(image));
                image.addEventListener("error", (error) => reject(error));
            });
            await imageLoadPromise;

            context.drawImage(image, 0, 0, canvas.width, canvas.height);
        };

        switch (selectedTheme) {
            case null:
                context.fillStyle = "black";
                context.fillRect(0, 0, canvas.width, canvas.height);
                setSymbolColor("WHITE");
                break;
            case THEME.PRIDE:
                await drawBackground("/assets/themes/pride.svg");
                setSymbolColor("BLACK");
                break;
            case THEME.TRANSGENDER:
                await drawBackground("/assets/themes/transgender.svg");
                setSymbolColor("BLACK");
                break;
            case THEME.NONBINARY:
                await drawBackground("/assets/themes/nonbinary.svg");
                setSymbolColor("BLACK");
                break;

            default:
                return;
        }
    };
    useEffect(() => {
        // Setting up canvas.
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");

        if (!canvas || !context) return;

        (async () => {
            await handleTheme(canvas, context);
            context.fillStyle = "white";

            // ------------------------

            // Initialize variables to track row and column number.
            let currentRowPatternIndex = 0;
            let currentColumnPatternIndex = 0;

            // Drawing Coordination
            const drawingCord = { x: 0, y: 0 };

            for (const shapePattern of shapePatterns) {
                // Move to the next coordination.
                drawingCord.x =
                    OUTER_GAP +
                    ONE_PATTERN_WIDTH * currentRowPatternIndex +
                    INNER_GAP * currentRowPatternIndex;
                drawingCord.y =
                    OUTER_GAP +
                    ONE_PATTERN_WIDTH * currentColumnPatternIndex +
                    INNER_GAP * currentColumnPatternIndex;

                const renderImage = async (imagePath: string) => {
                    const image = new Image();
                    image.src = imagePath;

                    const imageLoadPromise = new Promise((resolve, reject) => {
                        image.addEventListener("load", () => resolve(image));
                        image.addEventListener("error", (error) =>
                            reject(error)
                        );
                    });
                    await imageLoadPromise;

                    // Save the initial coordination for later use.
                    const initialCord = {
                        x: drawingCord.x,
                        y: drawingCord.y,
                    };

                    // Iterate through each row.
                    for (let i = 0; i < shapePattern.grid.length; i++) {
                        for (let j = 0; j < shapePattern.grid[i].length; j++) {
                            if (shapePattern.grid[i][j]) {
                                context.drawImage(
                                    image,
                                    drawingCord.x,
                                    drawingCord.y,
                                    // Added 1 for an outline
                                    ONE_PATTERN_WIDTH / 3 + 1,
                                    ONE_PATTERN_WIDTH / 3 + 1
                                );
                            }
                            drawingCord.x += ONE_PATTERN_WIDTH / 3;
                        }

                        drawingCord.x = initialCord.x;
                        drawingCord.y =
                            initialCord.y + (ONE_PATTERN_WIDTH / 3) * (i + 1);
                    }
                };
                switch (shapePattern.shape) {
                    case SHAPE.SQUARE:
                        await renderImage(
                            getThemedImage("square", symbolColor)
                        );
                        break;
                    case SHAPE.CIRCLE:
                        await renderImage(
                            getThemedImage("circle", symbolColor)
                        );
                        break;
                    case SHAPE.DIAMOND:
                        await renderImage(
                            getThemedImage("diamond", symbolColor)
                        );
                        break;
                    case SHAPE.SMALLER_RECTANGLE:
                        await renderImage(
                            getThemedImage("smaller-rectangle", symbolColor)
                        );
                        break;
                    case SHAPE.HEART:
                        await renderImage(getThemedImage("heart", symbolColor));
                        break;

                    default:
                        return;
                        break;
                }

                // Move to the next pattern column.
                if (currentRowPatternIndex === ROW_NUMBER - 1) {
                    currentRowPatternIndex = 0;
                    currentColumnPatternIndex += 1;
                } else {
                    currentRowPatternIndex++;
                }
            }
        })();
    }, [canvasRef, shapePatterns, symbolColor]);

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
