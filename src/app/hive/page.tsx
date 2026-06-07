import fs from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";

interface Post {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
}

export const metadata = {
    title: "Hive",
    description: "Cortisol and serotonin",
    openGraph: {
        title: "Hive",
        description: "Cortisol and serotonin",
        type: "website",
        images: [
            {
                url: "https://cdn.alcestide.com/general/saintjiub.jpeg",
                width: 1200,
                height: 630,
                alt: "Saint Jiub",
            },
        ],
    },
    twitter: {
        card: "summary",
        title: "Hive",
        description: "Cortisol and serotonin",
    },
}

export default function BlogIndex() {
    const contentDirectory = path.join(process.cwd(), "src/content");
    let posts: Post[] = [];

    if (fs.existsSync(contentDirectory)) {
        const files = fs.readdirSync(contentDirectory);
        posts = files
            .filter((file) => file.endsWith(".md"))
            .map((file) => {
                const filePath = path.join(contentDirectory, file);
                const fileContent = fs.readFileSync(filePath, "utf8");
                const { data } = matter(fileContent);
                return {
                    slug: file.replace(".md", ""),
                    title: data.title || "unknown",
                    date: data.date || "",
                    excerpt: data.excerpt || "",
                };
            })
            .sort((a, b) => {
                const dateA = a.date ? new Date(a.date).getTime() : 0;
                const dateB = b.date ? new Date(b.date).getTime() : 0;
                return dateB - dateA;
            });
    }

    const groupedPosts = posts.reduce<{ [key: string]: Post[] }>((groups, post) => {
        const year = post.date ? new Date(post.date).getFullYear().toString() : "Undated";
        if (!groups[year]) {
            groups[year] = [];
        }
        groups[year].push(post);
        return groups;
    }, {});

    const sortedYears = Object.keys(groupedPosts).sort((a, b) => b.localeCompare(a));

    return (
        <div className="min-h-[100dvh] w-full flex flex-col items-center justify-start px-[4vw] md:px-[6vw] pt-[10vh] md:pt-[14vh] pb-[10vh]">
            <div className="max-w-[1100px] w-full reveal">

                <div className="select-none pointer-events-none leading-[0.8] mb-[4vh] -ml-[0.3vw]">
                    <span
                        className="serif font-bold tracking-[-0.05em] inline-block text-balance text-[clamp(40px,7vw,100px)]"
                        style={{
                            color: "var(--color-text)",
                            opacity: 0.5,
                        }}
                    >
                        Hive
                    </span>
                </div>

                <header className="mb-[6vh] flex items-center justify-between border-b border-neutral-800 pb-4">
                    <Link href="/" className="serif text-xs uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity duration-200">
                        ← alcestide
                    </Link>
                    <span className="serif italic text-m opacity-30">thoughts and writings</span>
                </header>

                <div className="space-y-[8vh]">
                    {sortedYears.map((year) => (
                        <section key={year} className="space-y-6">
                            <div className="flex items-baseline gap-4 border-b border-neutral-800/40 pb-2">
                                <h2 className="serif font-bold tracking-tight text-xl text-neutral-500">
                                    {year}
                                </h2>
                                <span className="mono text-[10px] text-neutral-600">
                                    {groupedPosts[year].length} {groupedPosts[year].length === 1 ? 'entry' : 'entries'}
                                </span>
                            </div>

                            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {groupedPosts[year].map((post) => (
                                    <article
                                        key={post.slug}
                                        className="group relative border border-neutral-800 bg-neutral-900/50 p-6 md:p-8 rounded transition-all duration-300 hover:border-neutral-600 hover:bg-neutral-900 flex flex-col justify-between min-h-[180px] md:aspect-square"
                                    >
                                        <Link href={`/hive/${post.slug}`} className="absolute inset-0 z-10" />

                                        <div className="space-y-3 pointer-events-none">
                                            <time className="serif italic text-xs text-neutral-500">
                                                {post.date}
                                            </time>

                                            <div className="space-y-1.5">
                                                <h2 className="serif font-semibold tracking-[-0.02em] text-neutral-100 text-xl leading-[1.2]">
                                                    {post.title}
                                                </h2>
                                                <p className="serif text-sm leading-relaxed text-neutral-400 font-light line-clamp-2 md:line-clamp-4 group-hover:text-neutral-200 transition-colors duration-300">
                                                    {post.excerpt}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-neutral-800/60 pointer-events-none mt-4 md:mt-0">
                                            <span className="serif text-xs italic text-neutral-500 group-hover:text-neutral-200 group-hover:translate-x-1 inline-block transition-all duration-300">
                                                Open →
                                            </span>
                                        </div>
                                    </article>
                                ))}
                            </main>
                        </section>
                    ))}
                </div>

            </div>
        </div>
    );
}