import fs from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";
import { marked } from "marked";

interface BlogPostProps {
    params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: BlogPostProps) {
    const { slug } = await params;
    const contentDirectory = path.join(process.cwd(), "src/content");
    const filePath = path.join(contentDirectory, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
        return (
            <div className="min-h-[100dvh] flex flex-col items-center justify-center font-mono text-xs text-neutral-500">
                POST_NOT_FOUND // <Link href="/blog" className="underline ml-1 text-white">RETURN</Link>
            </div>
        );
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    const htmlContent = await marked.parse(content);

    return (
        <div className="reveal min-h-[100dvh] flex flex-col items-center justify-start px-[6vw] md:px-[8vw] pt-[10vh] md:pt-[14vh] pb-[8vh] overflow-y-auto bg-black text-white">
            <div className="max-w-[700px] w-full">
                <header className="mb-[6vh] flex items-center justify-between border-b border-neutral-900 pb-4">
                    <Link href="/blog" className="serif text-xs uppercase tracking-widest opacity-50 hover:opacity-100">
                        ← Back to hive
                    </Link>
                    <time className="serif italic text-xs opacity-40">{data.date}</time>
                </header>

                <main>
                    <h1 className="serif text-[clamp(24px,5vw,38px)] font-bold tracking-[-0.02em] leading-[1.2] text-white">
                        {data.title}
                    </h1>

                    <div className="w-12 h-[1px] bg-neutral-800 my-6" />

                    <div
                        className="serif text-[clamp(16px,2.5vw,19px)] leading-[1.6] font-light text-neutral-300 space-y-6 progress-markdown"
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
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