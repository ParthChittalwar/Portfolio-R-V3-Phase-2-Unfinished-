import { Link } from "react-router-dom";
import { ArrowLeft, Rss } from "lucide-react";
import { useDocumentHead } from "@/hooks/useDocumentHead";
import { blogPosts } from "@/data/blog";

/**
 * Blog index page at `/blog`.
 *
 * Shows a "coming soon" placeholder while `data/blog.ts` is empty.
 * Once you add posts to that file, they automatically appear here — no
 * component changes needed.
 */
export default function Blog() {
  useDocumentHead({
    title: "Blog",
    description: "Thoughts on engineering, learning, and building software.",
  });

  if (blogPosts.length === 0) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <Rss className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
        <h1 className="font-display text-3xl font-semibold">Blog</h1>
        <p className="max-w-sm text-muted-foreground">
          Writing on engineering, learning, and the craft of building software. Coming soon.
        </p>
        <Link
          to="/"
          className="mt-2 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-elevated"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to portfolio
        </Link>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-6 pb-24 pt-28 lg:px-10 lg:pt-36">
      <h1 className="font-display mb-12 text-4xl font-bold tracking-tight sm:text-5xl">Blog</h1>
      <ul className="space-y-8">
        {blogPosts.map((post) => (
          <li key={post.slug}>
            <Link to={`/blog/${post.slug}`} className="group block">
              <time className="font-mono text-xs text-muted-foreground">{post.date}</time>
              <h2 className="mt-1 font-display text-xl font-semibold transition-colors group-hover:text-muted-foreground">
                {post.title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{post.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
