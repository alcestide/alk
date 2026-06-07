import fs from "fs";
import path from "path";
import Link from "next/link";
import { Metadata } from "next";
import matter from "gray-matter";
import { marked } from "marked";


interface BlogPostProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
    const { slug } = await params;
    const contentDirectory = path.join(process.cwd(), "src/content");
    const filePath = path.join(contentDirectory, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
        return { title: "are you lost?" };
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    const title = data.title || "unknown";
    const description = data.excerpt || "empty.";

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "article",
            publishedTime: data.date,
        },
        twitter: {
            card: "summary",
            title,
            description,
        },
    };
}

export default async function BlogPost({ params }: BlogPostProps) {
    const { slug } = await params;
    const contentDirectory = path.join(process.cwd(), "src/content");
    const filePath = path.join(contentDirectory, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
        return (
            <div className="min-h-[100dvh] flex flex-col items-center justify-center font-mono text-xs text-[var(--color-secondary)]">
                ARE YOU LOST? // <Link href="/hive" className="underline ml-1 text-[var(--color-text)]">GO BACK</Link>
            </div>
        );
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    const htmlContent = await marked.parse(content);

    return (
        <div className="min-h-[100dvh] w-full flex flex-col items-center justify-start px-[6vw] md:px-[8vw] pt-[10vh] md:pt-[14vh] pb-[8vh]">
            <div className="max-w-[920px] w-full reveal">
                <header className="mb-[6vh] flex items-center justify-between border-b border-[var(--color-border)] pb-4">
                    <Link href="/hive" className="serif text-xs uppercase tracking-widest opacity-50 hover:opacity-100">
                        ← Back to index
                    </Link>
                    <time className="serif italic text-xs opacity-40">{data.date}</time>
                </header>

                <main>
                    <h1 className="serif text-[clamp(24px,5vw,38px)] font-bold tracking-[-0.02em] leading-[1.2] text-[var(--color-text)]">
                        {data.title}
                    </h1>

                    <div className="w-12 h-[1px] bg-[var(--color-border)] my-6"/>

                    <div
                        className="serif text-[clamp(16px,2.5vw,19px)] leading-[1.6] font-light prose max-w-none"
                        dangerouslySetInnerHTML={{__html: htmlContent}}
                    />
                </main>
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    const contentDirectory = path.join(process.cwd(), "src/content");
    if (!fs.existsSync(contentDirectory)) return [];

    const files = fs.readdirSync(contentDirectory);
    return files
        .filter((file) => file.endsWith(".md"))
        .map((file) => ({
            slug: file.replace(".md", ""),
        }));
}