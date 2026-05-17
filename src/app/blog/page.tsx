import fs from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";

export default function BlogIndex() {
    const contentDirectory = path.join(process.cwd(), "src/content");
    let posts: any[] = [];

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
                    title: data.title || "Untitled Post",
                    date: data.date || "",
                    excerpt: data.excerpt || "",
                };
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    return (
        <div className="reveal min-h-[100dvh] flex flex-col items-center justify-start px-[6vw] md:px-[8vw] pt-[10vh] md:pt-[14vh] pb-[8vh] overflow-y-auto">
            <div className="max-w-[700px] w-full">

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

                <header className="mb-[6vh] flex items-center justify-between border-b border-[var(--color-border)] pb-4">
                    <Link href="/" className="serif text-xs uppercase tracking-widest opacity-50 hover:opacity-100">
                        ← alcestide
                    </Link>
                    <span className="serif italic text-m opacity-30">thoughts and writings</span>
                </header>

                <main className="space-y-12">
                    {posts.map((post) => (
                        <article key={post.slug} className="group block">
                            <Link href={`/blog/${post.slug}`} className="block space-y-2">
                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                                    <h2 className="serif text-[clamp(18px,3.5vw,24px)] font-semibold text-white group-hover:text-neutral-400">
                                        {post.title}
                                    </h2>
                                    <time className="serif italic text-m text-neutral-500 shrink-0">{post.date}</time>
                                </div>
                                <p className="serif text-[clamp(15px,2vw,17px)] leading-relaxed text-neutral-400 font-light">
                                    {post.excerpt}
                                </p>
                            </Link>
                        </article>
                    ))}
                </main>
            </div>
        </div>
    );
}