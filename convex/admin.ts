import { v } from "convex/values";
import {
  query as baseQuery,
  mutation as baseMutation,
} from "./_generated/server";
import {
  customQuery,
  customMutation,
} from "convex-helpers/server/customFunctions";

// Admin query.
const query = customQuery(baseQuery, {
  args: { secret: v.string() },
  input: async (ctx, args) => {
    if (args.secret !== process.env.ADMIN_SECRET) {
      throw new Error("Invalid secret");
    }
    return { ctx, args };
  },
});

export const isAdmin = baseQuery({
  args: { secret: v.union(v.string(), v.null()) },
  handler: async (ctx, args) => {
    return args.secret !== null && args.secret === process.env.ADMIN_SECRET;
  },
});

// Admin mutation.
const mutation = customMutation(baseMutation, {
  args: { secret: v.string() },
  input: async (ctx, args) => {
    if (args.secret !== process.env.ADMIN_SECRET) {
      throw new Error("Invalid secret");
    }
    return { ctx, args };
  },
});

export const getRawPost = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

export const editPostDraft = mutation({
  args: {
    slug: v.string(),
    md: v.string(),
  },
  handler: async (ctx, args) => {
    const post = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!post) {
      throw new Error("Post not found");
    }

    await ctx.db.patch(post._id, {
      draft: args.md,
    });
  },
});

export const publishDraft = mutation({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const post = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!post) {
      throw new Error("Post not found");
    }

    if (!post.draft) {
      throw new Error("No draft to publish");
    }

    await ctx.db.patch(post._id, {
      content: post.draft,
      draft: undefined,
    });
  },
});

export const getPostVersions = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const post = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    if (!post) {
      throw new Error("Post not found");
    }

    return {
      published: post.content,
      draft: post.draft ?? post.content,
    };
  },
});
