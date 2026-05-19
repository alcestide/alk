"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const LINKS = [
    { label: "Telegram", href: "https://t.me/alcestide" },
    { label: "Instagram", href: "https://instagram.com/alcestide/" },
    { label: "Letterboxd", href: "https://letterboxd.com/Alcestide/" },
    { label: "GitHub", href: "https://github.com/alcestide" },
    { label: "LinkedIn", href: "https://linkedin.com/in/alcestide" },
    { label: "Email", href: "mailto:angpanariti@gmail.com", isEmail: true },
];

const IMAGES = [
    { src: "https://i.pinimg.com/736x/1f/3c/b1/1f3cb118c490b7de57aedfd1ee6e16b3.jpg", alt: "Stimulus 1" },
    { src: "https://i.pinimg.com/736x/6a/28/af/6a28af37d5027566fc495f36e542fed5.jpg", alt: "Stimulus 2" },
    { src: "https://i.pinimg.com/736x/0e/b4/3c/0eb43c68dfadb08e1fe4fda35294fe99.jpg", alt: "Stimulus 3" },
    { src: "https://i.pinimg.com/736x/e8/7b/af/e87baffc7581e1477da287e11a429c95.jpg", alt: "Stimulus 4" },
    { src: "https://i.pinimg.com/736x/bd/d3/19/bdd319feedf8fd013280e88055896619.jpg", alt: "Stimulus 5" },
    { src: "https://i.pinimg.com/originals/2b/ca/36/2bca361b80ce7bc23077f53563858a88.png", alt: "Stimulus 6" },
];

export default function Home() {
    const bioRef = useRef<HTMLDivElement>(null);
    const [bioWidth, setBioWidth] = useState(0);

    useEffect(() => {
        document.documentElement.classList.add("no-scroll");
        return () => document.documentElement.classList.remove("no-scroll");
    }, []);

    useEffect(() => {
        if (!bioRef.current) return;
        const observer = new ResizeObserver(([entry]) => {
            setBioWidth(entry.contentRect.width);
        });
        observer.observe(bioRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            className="h-[100dvh] flex flex-col justify-start gap-[4vh] md:gap-[6vh] px-[6vw] md:px-[8vw] pt-[8vh] md:pt-[14vh] pb-[8vh] overflow-y-auto relative">

            <div className="reveal reveal-d2 select-none pointer-events-none leading-[0.8] relative z-10 -ml-[0.5vw]">
                <span
                    className="serif font-bold tracking-[-0.05em] inline-block text-balance"
                    style={{
                        fontSize: "clamp(80px, 14vw, 420px)",
                        color: "var(--color-text)",
                        opacity: 0.5,
                    }}
                >
                    alcestide
                </span>
            </div>

            <div
                ref={bioRef}
                className="max-w-[700px] reveal reveal-d1 relative z-10 w-full min-w-0 mt-2 md:mt-0"
                style={{"--bio-w": bioWidth ? `${bioWidth}px` : undefined} as React.CSSProperties}
            >
                <p className="serif text-[clamp(20px,4.5vw,34px)] leading-[1.4] tracking-[-0.01em] mb-4">
                    Tech junkie with a weakness for {" "}
                    <em className="font-semibold">low-level development</em>,{" "}
                    <em className="font-semibold">operating systems</em> and {" "}
                    <em className="font-semibold">computer graphics</em>.

                </p>
                <p className="serif text-[clamp(20px,4.5vw,34px)] leading-[1.4] tracking-[-0.01em]">
                    I also enjoy writing {" "}
                    <em className="font-semibold">articles</em> and{" "}
                    <em className="font-semibold">poetry</em>,
                    and I'm deeply fond of{" "}
                    <em className="font-semibold">books</em>,{" "}
                    <em className="font-semibold">videogames</em>,{" "}
                    and niche{" "}
                    <em className="font-semibold">perfumes</em>.{" "}

                    Feel free to {" "}
                    <em className="font-semibold">explore</em>.
                </p>

                <div className="mt-8">
                <Link
                        href="/blog"
                        prefetch={false}
                        className="group inline-flex flex-col items-start gap-1"
                    >
                        <div className="flex items-center gap-3">
                            <span
                                className="mono text-xs uppercase tracking-[0.2em] text-neutral-500 group-hover:text-[var(--color-text)] transition-colors duration-200">
                                Enter Shell
                            </span>
                            <span
                                className="serif text-xl font-light transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300 ease-out">
                                →
                            </span>
                        </div>
                        <span
                            className="serif text-[clamp(32px,5vw,44px)] font-bold tracking-tight leading-none text-[var(--color-text)] border-b-2 border-transparent group-hover:border-[var(--color-text)] pb-1 transition-all duration-200">
                            Hive
                        </span>
                    </Link>
                </div>

            </div>

            <div className="reveal reveal-d3 max-w-[1200px] w-full mt-2 relative z-10">
                <h2 className="serif text-[clamp(18px,3vw,24px)] font-semibold tracking-[-0.01em] mb-4 opacity-80">
                    Stimulus
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {IMAGES.map((img, idx) => (
                        <div
                            key={idx}
                            className="aspect-[4/3] w-full rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden"
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div
                className="flex flex-wrap items-center gap-5 mt-10 text-[clamp(16px,2.5vw,20px)] border-t border-[var(--color-border)] pt-6">
                {LINKS.map((link) => (
                    <Link
                        key={link.label}
                        href={link.href}
                        prefetch={false}
                        {...(!link.isEmail && !link.href.startsWith("/") && {
                            target: "_blank",
                            rel: "noopener noreferrer"
                        })}
                        className="underline-link serif"
                    >
                        {link.label}
                    </Link>
                ))}
            </div>

        </div>
    );
}