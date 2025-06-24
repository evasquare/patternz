"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Loading from "../components/Loading";
import Pattern from "../components/Pattern";
import { SHAPE, ShapePattern } from "../lib/patternType";
import { delay } from "../lib/utilFunctions";
import styles from "./page.module.css";

export default function Generate() {
    const [isLoading, setIsLoading] = useState(true);
    const [isTaskFinished, setIsTaskFinished] = useState(false);

    const [url, setUrl] = useState("Getting URL..");

    useEffect(() => {
        (async () => {
            await delay(3000);
            setIsLoading(false);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (isTaskFinished) {
                setIsLoading(false);
            }
        })();
    }, [isTaskFinished]);

    useEffect(() => {
        // Send request to backend and get url.
        setUrl("Getting URL..");
    }, []);

    const myPatterns: ShapePattern[] = [
        {
            grid: [
                [true, true, true],
                [true, false, true],
                [true, true, false],
            ],
            shape: SHAPE.SQUARE,
        },
        {
            grid: [
                [true, true, true],
                [true, false, false],
                [false, true, true],
            ],
            shape: SHAPE.DIAMOND,
        },
        {
            grid: [
                [false, true, true],
                [true, false, true],
                [true, true, true],
            ],
            shape: SHAPE.HEART,
        },
        {
            grid: [
                [true, true, true],
                [true, false, false],
                [false, true, true],
            ],
            shape: SHAPE.SMALLER_RECTANGLE,
        },
    ];

    const saveAsImage = async () => {
        const screenshotTarget = document.getElementById(
            "patternz-canvas"
        ) as HTMLCanvasElement | null;
        if (!screenshotTarget) return;

        const base64image = screenshotTarget.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = base64image;
        link.download = "pattern.png";
        link.click();
    };

    return (
        <>
            {isLoading ? (
                <>
                    <Loading />
                </>
            ) : (
                <>
                    {" "}
                    <div className={styles.flexbox1}>
                        <div className={styles.flexbox2}></div>
                        <div className={styles.flexbox2}>
                            <h2
                                className={`${styles.h2TitleCenter} ${styles.removeHeadingDefaultMargin} ${styles.h2MarginBottom}`}
                            >
                                Done! Here&apos;s your pattern!
                            </h2>
                            <span>{url}</span>

                            <div className={styles.gap} />

                            <div className={styles.outputWrapper}>
                                <div className={styles.output}>
                                    <Pattern shapePatterns={myPatterns} />
                                </div>
                            </div>

                            <div className={styles.gap} />

                            <div className={styles.rowFlex}>
                                <Link href={"/themes"}>
                                    <button>Change theme</button>
                                </Link>

                                <button onClick={saveAsImage}>
                                    Save as image
                                </button>
                            </div>
                        </div>
                        <div className={styles.flexbox2}>
                            <div
                                className={`${styles.translateYBottom} ${styles.textBlackColor}`}
                            >
                                Developed by{" "}
                                <a
                                    className={`${styles.textBlackColor} ${styles.textBold}`}
                                    href="https://github.com/evasquare"
                                >
                                    Eva
                                </a>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
