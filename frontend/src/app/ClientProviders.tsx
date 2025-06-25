"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import styles from "./clientproviders.module.css";
import Background from "./components/Background";

const ClientProviders = ({ children }: { children: React.ReactNode }) => {
    const [backgroundColors, setBackgroundColors] = useState<
        string[] | undefined
    >(undefined);
    const pathName = usePathname();

    useEffect(() => {
        if (pathName === "/themes") {
            setBackgroundColors(["#999999"]);
        } else {
            setBackgroundColors(undefined);
        }
    }, [pathName]);

    const [isDisplayAllowed, setIsDisplayAllowed] = useState(true);
    useEffect(() => {
        const updateSetIsDisplayAllowed = () => {
            document.body.classList.toggle("scroll-lock");
            if (window.innerHeight < 745) {
                setIsDisplayAllowed(false);
            } else {
                setIsDisplayAllowed(true);
            }
        };

        // Initially run the function
        updateSetIsDisplayAllowed();
        window.addEventListener("resize", updateSetIsDisplayAllowed);
    }, []);

    useEffect(() => {
        const elements = document.getElementsByClassName("no-js");

        for (const element of elements) {
            element.classList.toggle("no-js", false);
            document.body.classList.toggle("scroll-lock", false);
        }
    }, []);

    return (
        <>
            {isDisplayAllowed ? null : (
                <div className={styles.displayBlocked}>
                    <h2>Window size is too small!</h2>
                    <span>
                        Please resize your window. (Or rotate your phone.)
                    </span>
                </div>
            )}

            <Background backgroundColors={backgroundColors} />
            {children}
        </>
    );
};

export default ClientProviders;
