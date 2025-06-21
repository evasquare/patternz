import Image from "next/image";

import styles from "./loading.module.css";

export default function Loading() {
    return (
        <div className={styles.gradient}>
            <div className={styles.flexbox_1}>
                <div className={styles.flexbox_2} />
                <div className={styles.flexbox_2}>
                    <div className={styles.rotating}>
                        <Image
                            width={150}
                            height={150}
                            alt="loading"
                            src="/loading.svg"
                        ></Image>
                    </div>
                </div>
                <div className={styles.flexbox_2} />
            </div>
        </div>
    );
}
