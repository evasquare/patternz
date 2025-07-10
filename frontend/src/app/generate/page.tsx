"use client";

import { useEffect, useState } from "react";

import ErrorScreen from "../components/ErrorScreen";
import Loading from "../components/Loading";
import config from "../lib/config.json";
import { SHAPE, ShapePattern } from "../lib/patternType";
import { delay } from "../lib/utilFunctions";

export default function Generate() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isTaskFinished, setIsTaskFinished] = useState(false);
    const [isDelayOver, setIsDelayOver] = useState(false);
    const [url, setUrl] = useState("");

    useEffect(() => {
        (async () => {
            await delay(3000);
            setIsDelayOver(true);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (isTaskFinished && isDelayOver) {
                window.location.href = "/" + url;
            }
        })();
    }, [isTaskFinished, isDelayOver, url]);

    const randomlyGeneratePatterns = () => {
        const generatedPatterns: ShapePattern[] = [];

        for (let index = 0; index < 9; index++) {
            let shapeList = [
                SHAPE.SQUARE,
                SHAPE.CIRCLE,
                SHAPE.DIAMOND,
                SHAPE.HEART,
                SHAPE.SMALLER_RECTANGLE,
            ];

            const shapeOptions: ShapeOptions = JSON.parse(
                localStorage.getItem("shapeOptions") ?? "{}"
            );

            if (Object.keys(shapeOptions).length != 0) {
                let hasAtLeastOneShape = false;

                shapeList = [];
                if (shapeOptions.square) {
                    hasAtLeastOneShape = true;
                    shapeList.push(SHAPE.SQUARE);
                }
                if (shapeOptions.circle) {
                    hasAtLeastOneShape = true;
                    shapeList.push(SHAPE.CIRCLE);
                }
                if (shapeOptions.diamond) {
                    hasAtLeastOneShape = true;
                    shapeList.push(SHAPE.DIAMOND);
                }
                if (shapeOptions.heart) {
                    hasAtLeastOneShape = true;
                    shapeList.push(SHAPE.HEART);
                }
                if (shapeOptions.smallerRectangle) {
                    hasAtLeastOneShape = true;
                    shapeList.push(SHAPE.SMALLER_RECTANGLE);
                }

                if (!hasAtLeastOneShape) {
                    setErrorMessage("At least one shape has to be enabled.");
                    throw new Error("At least one shape has to be enabled.");
                }
            }

            const shape =
                shapeList[Math.floor(Math.random() * shapeList.length)];
            const grid: boolean[][] = [];

            for (let index = 0; index < 3; index++) {
                grid.push([]);
                for (let index = 0; index < 3; index++) {
                    const booleanArray = [true, true, true, false, false];
                    const selectedBoolean =
                        booleanArray[
                            Math.floor(Math.random() * booleanArray.length)
                        ];

                    grid[grid.length - 1].push(selectedBoolean);
                }
            }

            const newPattern = { grid, shape };
            generatedPatterns.push(newPattern);
        }
        return generatedPatterns;
    };

    useEffect(() => {
        (async () => {
            try {
                const response: string = await (
                    await fetch(`${config.publicApiUrl}/add`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            patterns: randomlyGeneratePatterns(),
                        }),
                    })
                ).text();

                setUrl(response);
                setIsTaskFinished(true);
            } catch (e) {
                if (e instanceof Error) {
                    setErrorMessage(String(e));
                }
            }
        })();
    }, []);

    return (
        <>
            {isDelayOver && errorMessage && (
                <ErrorScreen errorMessage={errorMessage} />
            )}
            <Loading />
        </>
    );
}
