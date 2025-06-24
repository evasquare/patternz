"use client";

import styles from "./page.module.css";

const Themes = () => {
    return (
        <>
            {" "}
            <div className={styles.flexbox_1}>
                <div className={styles.flexbox_2}>
                    <h2
                        className={`${styles.remove_heading_default_margin} ${styles.h2_margin_bottom}`}
                    >
                        Themes
                    </h2>
                </div>
                <div className={styles.flexbox_2}>
                    <div>
                        <div></div>
                        <h3>White</h3>
                    </div>
                    <div>
                        <div></div>
                        <h3>Nonbinary</h3>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Themes;
