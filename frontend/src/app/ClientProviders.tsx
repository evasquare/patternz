"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import Background from "./components/Background";

const ClientProviders = ({ children }: { children: React.ReactNode }) => {
    const [backgroundColors, setBackgroundColors] = useState<
        string[] | undefined
    >(undefined);
    const pathName = usePathname();

    useEffect(() => {
        if (pathName === "/themes") {
            setBackgroundColors(["#999999"]);
            return;
        }
        setBackgroundColors(undefined);
    }, [pathName]);

    useEffect(() => {
        const elements = document.getElementsByClassName("no-js");
        for (const element of elements) {
            element.classList.toggle("no-js", false);
            element.classList.toggle("hidden", true);
        }
        document.body.classList.toggle("scroll-lock", false);
    }, []);

    return (
        <div>
            <Background backgroundColors={backgroundColors} />
            {children}
        </div>
    );
};

export default ClientProviders;
