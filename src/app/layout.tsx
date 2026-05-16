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
        default: "alcestide",
        template: "%s - alcestide",
    },
    description: "Tech junkie from Italy with a weakness for system programming, operating systems and computer graphics.",
    metadataBase: new URL("https://alcestide.com"),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "alcestide",
        description: "Tech junkie from Italy with a weakness for system programming, operating systems and computer graphics.",
        images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "alcestide",
        description: "Tech junkie from Italy with a weakness for system programming, operating systems and computer graphics.",
        images: ["/og-image.png"],
    },
    icons: {
        icon: [{ url: "/logo-white.svg", type: "image/svg+xml" }],
        apple: [{ url: "/logo-white.svg" }],
    },
    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent",
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