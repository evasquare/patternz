"use client";

import { useEffect, useState } from "react";

import Loading from "../components/Loading";
import { SHAPE, ShapePattern } from "../lib/patternType";
import { delay } from "../lib/utilFunctions";

export default function Generate() {
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
            console.log(isDelayOver);
            if (isTaskFinished && isDelayOver) {
                window.location.href = "/" + url;
            }
        })();
    }, [isTaskFinished, isDelayOver, url]);

    const randomlyGeneratePatterns = () => {
        const returningPatterns: ShapePattern[] = [];

        for (let index = 0; index < 9; index++) {
            const shapeList = [
                SHAPE.SQUARE,
                SHAPE.CIRCLE,
                SHAPE.DIAMOND,
                SHAPE.HEART,
                SHAPE.SMALLER_RECTANGLE,
            ];

            const selectedShape =
                shapeList[Math.floor(Math.random() * shapeList.length)];

            const newGrid: boolean[][] = [];

            for (let index = 0; index < 3; index++) {
                newGrid.push([]);
                for (let index = 0; index < 3; index++) {
                    const booleanList = [true, true, true, false, false];
                    const selectedBoolean =
                        booleanList[
                            Math.floor(Math.random() * booleanList.length)
                        ];

                    newGrid[newGrid.length - 1].push(selectedBoolean);
                }
            }
            const newPattern = { grid: newGrid, shape: selectedShape };
            returningPatterns.push(newPattern);
        }
        return returningPatterns;
    };
    useEffect(() => {
        (async () => {
            console.log(randomlyGeneratePatterns());
            const response: string = await (
                await fetch(`http://localhost:8080/add`, {
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
        })();
    }, []);

    return (
        <>
            <Loading />
        </>
    );
}
