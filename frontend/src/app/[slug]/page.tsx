"use client";

import Image from "next/image";
import Link from "next/link";
import { hostname } from "os";
import { useEffect, useState } from "react";

import Loading from "../components/Loading";
import Pattern from "../components/Pattern";
import { ShapePattern } from "../lib/patternType";
import styles from "./page.module.css";

export default function Generate({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const [isLoading, setIsLoading] = useState(true);
    const [isTaskFinished, setIsTaskFinished] = useState(false);

    const [url, setUrl] = useState("Getting URL..");

    useEffect(() => {
        (async () => {
            // await delay(3000);
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
        (async () => {
            const { slug } = await params;

            setUrl("http://" + hostname() + "/" + slug);
        })();
    }, [params]);

    const [patterns, setMyPatterns] = useState<ShapePattern[] | null>(null);
    useEffect(() => {
        (async () => {
            const { slug } = await params;

            interface Response {
                id: number;
                uuid: string;
                patterns: ShapePattern[];
            }

            const response: Response = await (
                await fetch(`http://localhost:8080/get/${slug}`)
            ).json();

            console.log(response);

            setMyPatterns(response.patterns);
        })();
    });

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
                    <div className={styles.flexbox1}>
                        <div
                            className={`${styles.flexbox2} ${styles.marginYTop}`}
                        >
                            <Link href="/" className="hover">
                                <Image
                                    src="/assets/buttons/home-button.svg"
                                    alt="home"
                                    width={50}
                                    height={50}
                                />
                            </Link>
                        </div>
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
                                    {patterns ? (
                                        <Pattern shapePatterns={patterns} />
                                    ) : null}
                                </div>
                            </div>

                            <div className={styles.gap} />

                            <div className={styles.rowFlex}>
                                <Link href={"/themes"}>
                                    <button className="hover">
                                        Change theme
                                    </button>
                                </Link>

                                <button className="hover" onClick={saveAsImage}>
                                    Save as image
                                </button>
                            </div>
                        </div>
                        <div className={styles.flexbox2}>
                            <div
                                className={`${styles.marginYBottom} ${styles.textBlackColor}`}
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
