import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    title: v.string(),
    slug: v.string(),
    date: v.string(),
    excerpt: v.string(),
    content: v.string(),
    draft: v.optional(v.string()),
    published: v.optional(v.boolean()),
  })
    .index("by_slug", ["slug"])
    .index("by_published_at", ["published"]),
  snideComments: defineTable({
    path: v.string(),
    content: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_path", ["path"])
    .index("by_created_at", ["createdAt"]),
});
