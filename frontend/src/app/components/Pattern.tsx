import Image from "next/image";

import { Shape, SHAPE, ShapePattern } from "../lib/patternType";
import styles from "./pattern.module.css";

export default function Pattern({
    shapePattern,
}: {
    shapePattern: ShapePattern;
}) {
    const getShape = (shape: Shape, index: number) => {
        switch (shapePattern.shape) {
            case SHAPE.SQUARE:
                return (
                    <div key={index} className={styles.patternContainer}>
                        <Image alt="circle" fill src="/shapes/square.svg" />
                    </div>
                );
                break;
            case SHAPE.CIRCLE:
                return (
                    <div key={index} className={styles.patternContainer}>
                        <Image alt="circle" fill src="/shapes/circle.svg" />
                    </div>
                );
                break;
            case SHAPE.DIAMOND:
                return (
                    <div key={index} className={styles.patternContainer}>
                        <Image alt="circle" fill src="/shapes/diamond.svg" />
                    </div>
                );
                break;

            default:
                return;
                break;
        }
    };
    return (
        <div className={styles.grid}>
            {shapePattern.grid.map((item) =>
                item.map((item2, index) => {
                    return item2 ? (
                        getShape(shapePattern.shape, index)
                    ) : (
                        <div key={index}></div>
                    );
                })
            )}
        </div>
    );
}
