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
                [true, true, false, true],
                [true, false, true, false],
                [true, true, true, true],
                [true, false, true, false],
            ],
            shape: SHAPE.SQUARE,
        },
        {
            grid: [
                [true, false, true, false],
                [true, true, true, true],
                [true, true, false, true],
                [true, false, true, false],
            ],
            shape: SHAPE.DIAMOND,
        },
        {
            grid: [
                [true, true, true, true],
                [true, true, false, true],
                [true, false, true, false],
                [true, false, true, false],
            ],
            shape: SHAPE.CIRCLE,
        },
        {
            grid: [
                [false, true, true, true],
                [true, true, false, true],
                [true, false, true, false],
                [true, false, true, false],
            ],
            shape: SHAPE.SQUARE,
        },
    ];

    return (
        <>
            {isLoading ? (
                <>
                    <Loading />
                </>
            ) : (
                <>
                    {" "}
                    <div className={styles.flexbox_1}>
                        <div className={styles.flexbox_2}></div>
                        <div className={styles.flexbox_2}>
                            <h2
                                className={`${styles.remove_heading_default_margin} ${styles.h2_margin_bottom}`}
                            >
                                Done! Here&apos;s your pattern!
                            </h2>
                            <span>{url}</span>

                            <div className={styles.gap} />

                            <div className={styles.output_box}>
                                <div className={styles.output}>
                                    <div className={styles.pattern_grid}>
                                        {myPatterns.map((myPattern, index) => {
                                            return (
                                                <Pattern
                                                    key={index}
                                                    shapePattern={myPattern}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            <div className={styles.gap} />

                            <div className={styles.row_flex}>
                                <Link href={"/change-theme"}>
                                    <button>Change theme</button>
                                </Link>
                                <Link href={"/change-theme"}>
                                    <button>Save as image</button>
                                </Link>
                            </div>
                        </div>
                        <div className={styles.flexbox_2}>
                            <div
                                className={`${styles.translate_y_bottom} ${styles.text_black_color}`}
                            >
                                Developed by{" "}
                                <a
                                    className={`${styles.text_black_color} ${styles.text_bold}`}
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
