import type { Metadata } from "next";
import "./globals.css";
import "normalize.css";

import localFont from "next/font/local";

import Background from "./components/Background";

const pretendard = localFont({
    src: "../fonts/PretendardVariable.ttf",
    display: "swap",
    weight: "45 920",
    variable: "--font-pretendard",
});

export const metadata: Metadata = {
    title: "Patternz",
    description: "Generate patterns at ease.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${pretendard.variable} font-pretendard`}>
                <Background />
                {children}
            </body>
        </html>
    );
}
