import type { Metadata, Viewport } from "next";
import { EB_Garamond } from "next/font/google";
import "./globals.css";

const ebGaramond = EB_Garamond({
    variable: "--font-eb-garamond",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    style: ["normal", "italic"],
});

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
    themeColor: [
        { media: "(prefers-color-scheme: dark)", color: "#000000" },
        { media: "(prefers-color-scheme: light)", color: "#f5f3ef" },
    ],
};

export const metadata: Metadata = {
    title: {
        default: "Alcestide",
        template: "%s - alcestide",
    },
    description: "It spoke to me of immense green valleys, purple skies, and flowers so breathtaking you could lose yourself forever in the swirl of their petals.",
    metadataBase: new URL("https://alcestide.com"),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "alcestide",
        description: "It spoke to me of immense green valleys, purple skies, and flowers so breathtaking you could lose yourself forever in the swirl of their petals.",
        images: [{ url: "/image.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "alcestide",
        description: "It spoke to me of immense green valleys, purple skies, and flowers so breathtaking you could lose yourself forever in the swirl of their petals.",
        images: ["/image.png"],
    },
    icons: {
        icon: [
            {
                url: "/favicon-light.ico",
                media: "(prefers-color-scheme: light)",
            },
            {
                url: "/favicon-dark.ico",
                media: "(prefers-color-scheme: dark)",
            },
        ],
        apple: [
            { url: "/favicon-light.ico" }
        ],
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="antialiased">
        <body className={`${ebGaramond.variable} min-h-[100dvh]`}>
        {children}
        </body>
        </html>
    );
}