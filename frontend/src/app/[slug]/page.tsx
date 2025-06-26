"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import Pattern from "../components/Pattern";
import config from "../lib/config.json";
import { ShapePattern } from "../lib/patternType";
import styles from "./page.module.css";

export default function Generate({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const [url, setUrl] = useState("Getting URL..");

    useEffect(() => {
        (async () => {
            setUrl(window.location.href);
        })();
    }, [params]);

    const [displayingPatterns, setDisplayingPatterns] = useState<
        ShapePattern[] | null
    >(null);

    useEffect(() => {
        (async () => {
            const { slug } = await params;

            interface GetResponse {
                id: number;
                uuid: string;
                patterns: ShapePattern[];
            }

            const response: GetResponse = await (
                await fetch(`${config.publicApiUrl}/get/${slug}`)
            ).json();

            setDisplayingPatterns(response.patterns);
        })();
    }, [params]);

    const saveAsImage = async () => {
        const screenshotTarget = document.getElementById(
            "patternz-canvas"
        ) as HTMLCanvasElement | null;
        if (!screenshotTarget) return;
        const base64image = screenshotTarget.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = base64image;
        downloadLink.download = "pattern.png";
        downloadLink.click();
    };

    return (
        <>
            <>
                <div className={styles.flexbox1}>
                    <div className={`${styles.flexbox2} ${styles.marginYTop}`}>
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
                        <Link href={url} className={styles.urlLink}>
                            {url}
                        </Link>

                        <div className={styles.gap} />

                        <div className={styles.outputWrapper}>
                            <div className={styles.output}>
                                {displayingPatterns ? (
                                    <Pattern
                                        shapePatterns={displayingPatterns}
                                    />
                                ) : null}
                            </div>
                        </div>

                        <div className={styles.gap} />

                        <div className={styles.rowFlex}>
                            <Link href={"/themes"}>
                                <button className="hover">Change theme</button>
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
        </>
    );
}
