"use client";

import { useEffect } from "react";

import styles from "./background.module.css";

export default function Background({
    backgroundColors,
}: {
    backgroundColors: string[] | undefined;
}) {
    if (!backgroundColors) {
        backgroundColors = ["#FF2AB8", "#FF822A", "#FF3B2A", "#2a55ff"];
    }

    const selectedBackgroundColor =
        backgroundColors[Math.floor(Math.random() * backgroundColors.length)];

    useEffect(() => {
        document.body.style.backgroundColor = selectedBackgroundColor;
    }, [selectedBackgroundColor]);

    return <div className={styles.gradient}></div>;
}
