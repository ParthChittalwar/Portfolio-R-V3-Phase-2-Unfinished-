import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getBlogPostBySlug } from "@/data/blog";
import { useDocumentHead } from "@/hooks/useDocumentHead";

/**
 * Individual blog post page (/blog/:slug).
 *
 * Intentionally minimal — a scaffold for future Markdown/MDX content.
 * The post body will be rendered here once a content pipeline is added.
 */
export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(slug ?? "");

  useDocumentHead(
    post ? { title: post.title, description: post.excerpt } : { title: "Post not found" },
  );

  if (!post) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">404</p>
        <h1 className="font-display text-3xl font-semibold">Post not found</h1>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-elevated"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to blog
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-2xl px-6 pb-24 pt-28 lg:px-10 lg:pt-36">
      <Link
        to="/blog"
        className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        All posts
      </Link>

      <time className="font-mono text-xs text-muted-foreground">{post.date}</time>
      <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
        {post.title}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>

      <div className="mt-12 border-t border-border pt-8 text-muted-foreground">
        <p className="text-sm">Content coming soon. This post is a placeholder.</p>
      </div>
    </article>
  );
}
