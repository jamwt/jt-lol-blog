import { query } from "./_generated/server";
import { v } from "convex/values";
import markdownit from "markdown-it";
import { BlogPost } from "../app/lib/types";
import hljs from "highlight.js";

export const listSummaries = query({
  args: {},
  handler: async (ctx) => {
    // Only return published posts
    const posts = await ctx.db
      .query("posts")
      .withIndex("by_published_at", (q) => q.eq("published", true))
      .order("desc")
      .collect();

    return posts.map((post) => ({
      _id: post._id,
      title: post.title,
      slug: post.slug,
      date: post.date,
      excerpt: post.excerpt,
    }));
  },
});

export const getBySlug = query({
  args: { slug: v.string(), draft: v.optional(v.boolean()) },
  handler: async (ctx, args): Promise<BlogPost | null> => {
    const post = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!post) return null;

    // Actual default values
    const md = markdownit({
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(str, { language: lang }).value;
          } catch (__) {}
        }

        return ""; // use external default escaping
      },
    });
    const html = md.render(args.draft ? (post.draft ?? post.content) : post.content);
    // Draft is true if the draft is different from the content and a draft is requested
    const isDraft = Boolean(args.draft && post.draft && post.draft !== post.content);

    return {
      title: post.title,
      slug: post.slug,
      date: post.date,
      excerpt: post.excerpt,
      html,
      draft: isDraft,
    };
  },
});
