import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import type { Components } from "react-markdown";

type Props = {
  content: string;
};

/**
 * Custom component overrides for Markdown elements
 */
const components: Components = {
  // Inline + block code styling
  code({ className, children }) {
    const isInline = !className;

    if (isInline) {
      return (
        <code
          className="
            rounded
            bg-indigo-500/10
            px-1.5 py-0.5
            text-indigo-400
            font-mono
            text-sm
          "
        >
          {children}
        </code>
      );
    }

    return (
      <pre
        className="
          not-prose
          my-6
          overflow-x-auto
          rounded-2xl
          border border-white/10
          bg-slate-900/80
          p-4
        "
      >
        <code className={className}>{children}</code>
      </pre>
    );
  },

  // Image styling
  img({ src, alt }) {
    return (
      <img
        src={src ?? ""}
        alt={alt ?? ""}
        className="
          mx-auto
          my-10
          rounded-2xl
          border border-white/10
          shadow-xl
        "
      />
    );
  },

  // Link styling
  a({ href, children }) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="
          font-medium
          text-indigo-400
          no-underline
          hover:underline
        "
      >
        {children}
      </a>
    );
  }
};

export default function MarkdownRenderer({ content }: Props) {
  return (
    <div
      className="
        prose
        prose-slate
        dark:prose-invert
        max-w-none

        /* =========================
           HEADINGS (H1–H6)
           ========================= */

        /* H1 – page title */
        prose-h1:text-4xl
        prose-h1:font-extrabold
        prose-h1:tracking-tight
        prose-h1:mb-6

        /* H2 – major sections */
        prose-h2:text-2xl
        prose-h2:font-bold
        prose-h2:mt-12
        prose-h2:mb-4
        prose-h2:border-b
        prose-h2:border-white/10
        prose-h2:pb-2

        /* H3 – subsections */
        prose-h3:text-xl
        prose-h3:font-semibold
        prose-h3:mt-8
        prose-h3:mb-3

        /* H4–H6 – minor headings */
        prose-h4:text-lg
        prose-h5:text-base
        prose-h6:text-sm
        prose-h4:font-medium
        prose-h5:font-medium
        prose-h6:font-medium

        /* =========================
           PARAGRAPHS & TEXT
           ========================= */

        prose-p:leading-relaxed
        prose-p:my-4

        prose-strong:text-slate-900
        dark:prose-strong:text-white

        /* =========================
           LISTS
           ========================= */

        prose-ul:my-4
        prose-ol:my-4
        prose-li:marker:text-indigo-500

        /* =========================
           BLOCKQUOTES
           ========================= */

        prose-blockquote:border-l-indigo-500
        prose-blockquote:bg-indigo-500/5
        prose-blockquote:px-6
        prose-blockquote:py-2
        prose-blockquote:rounded-r-xl

        /* =========================
           CODE & PRE
           ========================= */

        prose-code:font-mono
        prose-code:text-indigo-400
        prose-pre:bg-transparent

        /* Anchor offset for headings */
        prose-headings:scroll-mt-24
      "
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
