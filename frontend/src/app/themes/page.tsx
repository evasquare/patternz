"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { THEME, Theme } from "../lib/themesType";
import styles from "./page.module.css";

const Themes = () => {
    const goBack = () => {
        window.history.back();
    };

    const setTheme = (theme: Theme) => {
        localStorage.setItem("theme", theme);
        setSelectedTheme(theme);
    };

    const [selectedTheme, setSelectedTheme] = useState<Theme>(THEME.GRAYSCALE);

    useEffect(() => {
        const selectedTheme = localStorage.getItem("theme");

        switch (selectedTheme) {
            case null:
                setSelectedTheme(THEME.GRAYSCALE);
                break;
            case THEME.PRIDE:
                setSelectedTheme(THEME.PRIDE);
                break;
            case THEME.TRANSGENDER:
                setSelectedTheme(THEME.TRANSGENDER);
                break;
            case THEME.NONBINARY:
                setSelectedTheme(THEME.NONBINARY);
                break;

            default:
                return;
        }
    }, [setSelectedTheme]);

    return (
        <>
            <div className={styles.flexbox1}>
                <div className={styles.topBar}>
                    <div
                        className="hover mouse-pointer"
                        role="button"
                        onClick={goBack}
                    >
                        <Image
                            src="/assets/buttons/back-button.svg"
                            alt="back"
                            width={50}
                            height={50}
                        />
                    </div>
                </div>
                <div className={styles.items}>
                    <div
                        role="button"
                        onClick={() => {
                            setTheme(THEME.GRAYSCALE);
                        }}
                        className={`${styles.item} hover2 mouse-pointer`}
                    >
                        <div className={styles.icon}>
                            {selectedTheme === THEME.GRAYSCALE ? (
                                <div className={styles.checkMark}>
                                    <Image
                                        src="/assets/check-mark.svg"
                                        alt="check-mark"
                                        width={25}
                                        height={25}
                                    />
                                </div>
                            ) : null}
                        </div>
                        <h3>Grayscale</h3>
                    </div>
                    <div
                        role="button"
                        onClick={() => {
                            setTheme(THEME.PRIDE);
                        }}
                        className={`${styles.item} hover2 mouse-pointer`}
                    >
                        <div className={styles.icon}>
                            <Image
                                className={styles.image}
                                src="/assets/themes/pride.svg"
                                alt="pride"
                                fill
                            />
                            {selectedTheme === THEME.PRIDE ? (
                                <div className={styles.checkMark}>
                                    <Image
                                        src="/assets/check-mark.svg"
                                        alt="check-mark"
                                        width={25}
                                        height={25}
                                    />
                                </div>
                            ) : null}
                        </div>
                        <h3>Pride</h3>
                    </div>
                    <div
                        role="button"
                        onClick={() => {
                            setTheme(THEME.TRANSGENDER);
                        }}
                        className={`${styles.item} hover2 mouse-pointer`}
                    >
                        <div className={styles.icon}>
                            <Image
                                className={styles.image}
                                src="/assets/themes/transgender.svg"
                                alt="transgender"
                                fill
                            />
                            {selectedTheme === THEME.TRANSGENDER ? (
                                <div className={styles.checkMark}>
                                    <Image
                                        src="/assets/check-mark.svg"
                                        alt="check-mark"
                                        width={25}
                                        height={25}
                                    />
                                </div>
                            ) : null}
                        </div>
                        <h3>Transgender</h3>
                    </div>
                    <div
                        role="button"
                        onClick={() => {
                            setTheme(THEME.NONBINARY);
                        }}
                        className={`${styles.item} hover2 mouse-pointer`}
                    >
                        <div className={styles.icon}>
                            <Image
                                className={styles.image}
                                src="/assets/themes/nonbinary.svg"
                                alt="non-binary"
                                fill
                            />
                            {selectedTheme === THEME.NONBINARY ? (
                                <div className={styles.checkMark}>
                                    <Image
                                        src="/assets/check-mark.svg"
                                        alt="check-mark"
                                        width={25}
                                        height={25}
                                    />
                                </div>
                            ) : null}
                        </div>
                        <h3>Non-binary</h3>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Themes;
