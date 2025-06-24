import Image from "next/image";

import styles from "./loading.module.css";

export default function Loading() {
    return (
        <div className={styles.gradient}>
            <div className={styles.flexbox1}>
                <div className={styles.flexbox2} />
                <div className={styles.flexbox2}>
                    <div className={styles.rotating}>
                        <Image
                            width={150}
                            height={150}
                            alt="loading"
                            src="/loading.svg"
                        ></Image>
                    </div>
                </div>
                <div className={styles.flexbox2} />
            </div>
        </div>
    );
}
