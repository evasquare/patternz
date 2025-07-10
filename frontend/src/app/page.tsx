"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";

import { Shape, SHAPE } from "./lib/patternType";
import styles from "./page.module.css";

export default function Home() {
    const [shapeOptions, setShapeOptions] = useState<ShapeOptions>({
        square: true,
        circle: true,
        diamond: true,
        heart: true,
        smallerRectangle: true,
    });

    const [isReadingOptionsDone, setIsReadingOptionsDone] = useState(false);

    const readExistingShapeOptions = () => {
        const stringifiedShapeOptions = localStorage.getItem("shapeOptions");
        if (stringifiedShapeOptions) {
            setShapeOptions(JSON.parse(stringifiedShapeOptions));
        } else {
            return null;
        }
    };

    useEffect(() => {
        readExistingShapeOptions();
        setIsReadingOptionsDone(true);
    }, []);

    useEffect(() => {
        if (isReadingOptionsDone) {
            localStorage.setItem("shapeOptions", JSON.stringify(shapeOptions));
        }
    }, [shapeOptions, isReadingOptionsDone]);

    const updateCheckBox = (shape: Shape) => {
        if (!isReadingOptionsDone) {
            return;
        }

        const newShapeOptions = JSON.parse(JSON.stringify(shapeOptions));

        switch (shape) {
            case SHAPE.SQUARE:
                newShapeOptions.square = !newShapeOptions.square;
                break;
            case SHAPE.CIRCLE:
                newShapeOptions.circle = !newShapeOptions.circle;
                break;
            case SHAPE.DIAMOND:
                newShapeOptions.diamond = !newShapeOptions.diamond;
                break;
            case SHAPE.HEART:
                newShapeOptions.heart = !newShapeOptions.heart;
                break;
            case SHAPE.SMALLER_RECTANGLE:
                newShapeOptions.smallerRectangle =
                    !newShapeOptions.smallerRectangle;
                break;
        }
        setShapeOptions(newShapeOptions);
    };

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
                src="/assets/shapes/circle-white.png"
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
                src="/assets/shapes/diamond-white.png"
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
                src="/assets/shapes/heart-white.png"
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
                src="/assets/shapes/smaller-rectangle-white.png"
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
                src="/assets/shapes/square-white.png"
            ></motion.img>,
        ];
        setSelectedLogo(logos[Math.floor(Math.random() * logos.length)]);
    }, []);

    return (
        <div className={styles.flexbox1}>
            <div className={styles.flexbox2}>
                {selectedLogo && (
                    <div className={styles.imgContainer}>{selectedLogo}</div>
                )}
                <h2>Create a pattern in a really easy way.</h2>

                <div className={styles.shapeOptionsSection}>
                    <h4>Shape Options</h4>
                    <div className={styles.shapeOptionList}>
                        <div className={styles.shapeOption}>
                            <input
                                type="checkbox"
                                id="square"
                                checked={shapeOptions.square}
                                onChange={() => {
                                    updateCheckBox(SHAPE.SQUARE);
                                }}
                            />
                            <label htmlFor="square">Square</label>
                        </div>
                        <div className={styles.shapeOption}>
                            <input
                                type="checkbox"
                                id="circle"
                                checked={shapeOptions.circle}
                                onChange={() => {
                                    updateCheckBox(SHAPE.CIRCLE);
                                }}
                            />
                            <label htmlFor="circle">Circle</label>
                        </div>
                        <div className={styles.shapeOption}>
                            <input
                                type="checkbox"
                                id="diamond"
                                checked={shapeOptions.diamond}
                                onChange={() => {
                                    updateCheckBox(SHAPE.DIAMOND);
                                }}
                            />
                            <label htmlFor="diamond">Diamond</label>
                        </div>
                        <div className={styles.shapeOption}>
                            <input
                                type="checkbox"
                                id="heart"
                                checked={shapeOptions.heart}
                                onChange={() => {
                                    updateCheckBox(SHAPE.HEART);
                                }}
                            />
                            <label htmlFor="heart">Heart</label>
                        </div>
                        <div className={styles.shapeOption}>
                            <input
                                type="checkbox"
                                id="smallerRectangle"
                                checked={shapeOptions.smallerRectangle}
                                onChange={() => {
                                    updateCheckBox(SHAPE.SMALLER_RECTANGLE);
                                }}
                            />
                            <label htmlFor="smallerRectangle">
                                Smaller Rectangle
                            </label>
                        </div>
                    </div>
                </div>

                <Link href="/generate">
                    <button className="hover">Generate</button>
                </Link>
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
    );
}
