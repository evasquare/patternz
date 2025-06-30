import { useEffect, useRef, useState } from "react";

import { Shape, SHAPE, ShapePattern } from "../lib/patternType";
import { Theme, THEME } from "../lib/themesType";
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
    const [altMessage, setAltMessage] = useState("");
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const getColoredImage = (imageName: string, color: "WHITE" | "BLACK") => {
        if (color === "WHITE") {
            return `/assets/shapes/${imageName}-white.png`;
        } else {
            return `/assets/shapes/${imageName}-black.png`;
        }
    };

    const handleTheme = async (
        canvas: HTMLCanvasElement,
        context: CanvasRenderingContext2D,
        symbolColorInformation: { symbolColor: "WHITE" | "BLACK" }
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
            case "GRAYSCALE":
                context.fillStyle = "black";
                context.fillRect(0, 0, canvas.width, canvas.height);
                symbolColorInformation.symbolColor = "WHITE";
                return THEME.GRAYSCALE;
                break;
            case THEME.PRIDE:
                await drawBackground("/assets/themes/pride.svg");
                symbolColorInformation.symbolColor = "BLACK";
                return THEME.PRIDE;
                break;
            case THEME.TRANSGENDER:
                await drawBackground("/assets/themes/transgender.svg");
                symbolColorInformation.symbolColor = "BLACK";
                return THEME.TRANSGENDER;
                break;
            case THEME.NONBINARY:
                await drawBackground("/assets/themes/nonbinary.svg");
                symbolColorInformation.symbolColor = "BLACK";
                return THEME.NONBINARY;
                break;
        }
    };

    const altMessageBuilder = (shapes: Shape[], theme: Theme) => {
        let color1 = "white";
        let color2 = "black";

        switch (theme) {
            case THEME.GRAYSCALE:
                color1 = "white";
                color2 = "back";
                break;
            case THEME.PRIDE:
                color1 = "black";
                color2 = "rainbow pride";
                break;
            case THEME.TRANSGENDER:
                color1 = "black";
                color2 = "transgender";
                break;
            case THEME.NONBINARY:
                color1 = "black";
                color2 = "nonbinary";
                break;
        }

        const part1 = `A pattern featuring ${color1} `;
        let part2 = "";
        const part3 = ` on a ${color2} background`;

        for (let i = 0; i < shapes.length; i++) {
            switch (shapes[i]) {
                case SHAPE.SQUARE:
                    part2 += "square";
                    break;
                case SHAPE.CIRCLE:
                    part2 += "circle";
                    break;
                case SHAPE.DIAMOND:
                    part2 += "diamond";
                    break;
                case SHAPE.SMALLER_RECTANGLE:
                    part2 += "smaller rectangle";
                    break;
                case SHAPE.HEART:
                    part2 += "heart";
                    break;
            }

            if (i != shapes.length - 1) {
                part2 += ", ";
            }

            setAltMessage(part1 + part2 + part3);
        }
    };

    useEffect(() => {
        const shapesHistory: Shape[] = [];
        const theme = THEME.GRAYSCALE;

        // Setting up canvas.
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");

        if (!canvas || !context) return;

        (async () => {
            const symbolColorInformation = {
                symbolColor: "WHITE" as "WHITE" | "BLACK",
            };
            const theme = await handleTheme(
                canvas,
                context,
                symbolColorInformation
            );

            context.fillStyle = "white";

            // Initialize variables to track row and column number.
            let currentRowPatternIndex = 0;
            let currentColumnPatternIndex = 0;

            // Drawing Coordination
            const drawingCord = { x: 0, y: 0 };

            for (const shapePattern of shapePatterns) {
                let coloredImage = null;

                switch (shapePattern.shape) {
                    case SHAPE.CIRCLE:
                        if (!shapesHistory.includes(SHAPE.CIRCLE)) {
                            shapesHistory.push(SHAPE.CIRCLE);
                        }

                        coloredImage = getColoredImage(
                            "circle",
                            symbolColorInformation.symbolColor
                        );
                        break;
                    case SHAPE.DIAMOND:
                        if (!shapesHistory.includes(SHAPE.DIAMOND)) {
                            shapesHistory.push(SHAPE.DIAMOND);
                        }
                        coloredImage = getColoredImage(
                            "diamond",
                            symbolColorInformation.symbolColor
                        );
                        break;
                    case SHAPE.HEART:
                        if (!shapesHistory.includes(SHAPE.HEART)) {
                            shapesHistory.push(SHAPE.HEART);
                        }
                        coloredImage = getColoredImage(
                            "heart",
                            symbolColorInformation.symbolColor
                        );
                        break;
                    case SHAPE.SMALLER_RECTANGLE:
                        if (!shapesHistory.includes(SHAPE.SMALLER_RECTANGLE)) {
                            shapesHistory.push(SHAPE.SMALLER_RECTANGLE);
                        }
                        coloredImage = getColoredImage(
                            "smaller-rectangle",
                            symbolColorInformation.symbolColor
                        );
                        break;
                    case SHAPE.SQUARE:
                        if (!shapesHistory.includes(SHAPE.SMALLER_RECTANGLE)) {
                            shapesHistory.push(SHAPE.SMALLER_RECTANGLE);
                        }
                        coloredImage = getColoredImage(
                            "square",
                            symbolColorInformation.symbolColor
                        );
                        break;
                    default:
                        break;
                }

                if (!coloredImage) {
                    return;
                }
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
                        await renderImage(coloredImage);
                        break;
                    case SHAPE.CIRCLE:
                        await renderImage(coloredImage);
                        break;
                    case SHAPE.DIAMOND:
                        await renderImage(coloredImage);
                        break;
                    case SHAPE.SMALLER_RECTANGLE:
                        await renderImage(coloredImage);
                        break;
                    case SHAPE.HEART:
                        await renderImage(coloredImage);
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
            altMessageBuilder(shapesHistory as Shape[], theme as Theme);
        })();
    }, [canvasRef, shapePatterns]);

    return (
        <canvas
            ref={canvasRef}
            className={styles.patternzCanvas}
            id="patternz-canvas"
            width={CANVAS_WIDTH}
            height={CANVAS_WIDTH}
        >
            {altMessage}
        </canvas>
    );
}
