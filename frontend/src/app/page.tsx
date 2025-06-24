"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";

import styles from "./page.module.css";

export default function Home() {
    const [selectedLogo, setSelectedLogo] = useState<ReactNode | null>(null);
    useEffect(() => {
        const logos = [
            <motion.img
                key={0}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.4,
                    scale: {
                        type: "spring",
                        visualDuration: 0.4,
                        bounce: 0.5,
                    },
                }}
                className={styles.img}
                src="/shapes/circle.png"
            ></motion.img>,
            <motion.img
                key={0}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.4,
                    scale: {
                        type: "spring",
                        visualDuration: 0.4,
                        bounce: 0.5,
                    },
                }}
                className={styles.img}
                src="/shapes/diamond.png"
            ></motion.img>,
            <motion.img
                key={0}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.4,
                    scale: {
                        type: "spring",
                        visualDuration: 0.4,
                        bounce: 0.5,
                    },
                }}
                className={styles.img}
                src="/shapes/heart.png"
            ></motion.img>,
            <motion.img
                key={0}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.4,
                    scale: {
                        type: "spring",
                        visualDuration: 0.4,
                        bounce: 0.5,
                    },
                }}
                className={styles.img}
                src="/shapes/smaller-rectangle.png"
            ></motion.img>,
            <motion.img
                key={0}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.4,
                    scale: {
                        type: "spring",
                        visualDuration: 0.4,
                        bounce: 0.5,
                    },
                }}
                className={styles.img}
                src="/shapes/square.png"
            ></motion.img>,
        ];
        setSelectedLogo(logos[Math.floor(Math.random() * logos.length)]);
    }, []);

    return (
        <>
            <div className={styles.flexbox1}>
                <div className={styles.flexbox2}>
                    <div className={styles.translateYTop}></div>
                </div>
                <div className={styles.flexbox2}>
                    {selectedLogo ? (
                        <div className={styles.imgContainer}>
                            {selectedLogo}
                        </div>
                    ) : null}

                    <h2>Create a pattern in a really easy way.</h2>
                    <Link href={"/generate"}>
                        <button>Generate</button>
                    </Link>
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
    );
}
