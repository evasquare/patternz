import type { Metadata } from "next";
import "./globals.css";
import "normalize.css";

import localFont from "next/font/local";

import ClientProviders from "./ClientProviders";

const pretendard = localFont({
    src: "../fonts/PretendardVariable.ttf",
    display: "swap",
    weight: "45 920",
    variable: "--font-pretendard",
});

export const metadata: Metadata = {
    title: "Patternz",
    description: "Create a pattern in a really easy way.",
    twitter: {
        title: "Patternz",
        images: {
            url: "/thumbnail.png",
            width: 1280,
            height: 720,
            alt: "The image contains a large black-colored heart in the center on a white background.",
        },
        description: "Create a pattern in a really easy way.",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${pretendard.variable} font-pretendard scroll-lock`}
            >
                <div className="no-js">
                    JavaScript is required for this website.
                </div>
                <ClientProviders>{children}</ClientProviders>
            </body>
        </html>
    );
}
