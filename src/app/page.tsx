"use client";

import { useEffect, useRef, useState } from "react";

const LINKS = [
    { label: "Blog", href: "https://blog.alcestide.com/" },
    { label: "Telegram", href: "https://t.me/alcestide" },
    { label: "Instagram", href: "https://instagram.com/alcestide/" },
    { label: "Letterboxd", href: "https://letterboxd.com/Alcestide/" },
    { label: "GitHub", href: "https://github.com/alcestide" },
    { label: "LinkedIn", href: "https://linkedin.com/in/alcestide" },
    { label: "Email", href: "mailto:angpanariti@gmail.com", isEmail: true },
];

const IMAGES = [
    { src: "https://i.pinimg.com/1200x/02/b6/11/02b6117e4847c1ab5425a19f66b7e6bb.jpg", alt: "Stimulus 1" },
    { src: "https://i.pinimg.com/736x/1f/3c/b1/1f3cb118c490b7de57aedfd1ee6e16b3.jpg", alt: "Stimulus 2" },
    { src: "https://i.pinimg.com/736x/4d/8b/03/4d8b03d0b967bd6fab9aed12df863344.jpg", alt: "Stimulus 3" },
    { src: "https://i.pinimg.com/736x/36/2b/28/362b281c534c40eaddd03116c64f9ae7.jpg", alt: "Stimulus 4" },
    { src: "https://i.pinimg.com/1200x/6c/07/a7/6c07a71d58285a3093e67c408cab86e8.jpg", alt: "Stimulus 5" },
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
        <div className="h-[100dvh] flex flex-col justify-start gap-[4vh] md:gap-[6vh] px-[6vw] md:px-[8vw] pt-[8vh] md:pt-[14vh] pb-[8vh] overflow-y-auto relative">

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
                style={{ "--bio-w": bioWidth ? `${bioWidth}px` : undefined } as React.CSSProperties}
            >
                <p className="serif text-[clamp(20px,4.5vw,34px)] leading-[1.4] tracking-[-0.01em] mb-4">
                    Tech junkie from Italy with a weakness for{" "}
                    <em className="font-semibold">system programming</em>,{" "}
                    <em className="font-semibold">operating systems</em> and{" "}
                    <em className="font-semibold">computer graphics</em>.
                </p>
                <p className="serif text-[clamp(20px,4.5vw,34px)] leading-[1.4] tracking-[-0.01em]">
                    Currently working as a{" "}
                    <b className="font-semibold">DevOps Engineer</b>{" "}
                    and building software in my free time.
                </p>

                <div className="flex flex-wrap items-center gap-5 mt-6 text-[clamp(16px,2.5vw,20px)]">
                    {LINKS.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="underline-link serif"
                            {...(!link.isEmail && { target: "_blank", rel: "noopener noreferrer" })}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>

            <div className="reveal reveal-d3 max-w-[1200px] w-full mt-4 md:mt-8 relative z-10">
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

        </div>
    );
}