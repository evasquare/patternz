import Link from "next/link";

import styles from "./page.module.css";

export default function Home() {
    return (
        <>
            <div className={styles.flexbox_1}>
                <div className={styles.flexbox_2}>
                    <div className={styles.translate_y_top}></div>
                </div>
                <div className={styles.flexbox_2}>
                    <div className={styles.square}></div>
                    <h2>Create a pattern in a really easy way.</h2>
                    <Link href={"/generate"}>
                        <button>Generate</button>
                    </Link>
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
    );
}
