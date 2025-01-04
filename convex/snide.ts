import { v } from "convex/values";
import {
  action,
  internalAction,
  internalMutation,
  internalQuery,
  MutationCtx,
  query,
} from "./_generated/server";
import { internal } from "./_generated/api";
import { Doc } from "./_generated/dataModel";
import { Anthropic } from "@anthropic-ai/sdk";

const REFRESH_INTERVAL = 1000 * 60 * 60 * 24 * 3; // 3 days

export const refreshSnideComments = internalAction({
  args: {},
  handler: async (ctx, args) => {
    if (process.env.GENERATE_COMMENTS !== "yes") {
      return;
    }
    const now = Date.now();
    for (let i = 0; i < 10; i++) {
      const randomComment = await ctx.runQuery(
        internal.snide.randomOutdatedComment,
        { now }
      );
      if (randomComment) {
        console.log(`adding snide comment to ${randomComment?.path}`);
        const comment = await generateSnideComment(randomComment.path);
        console.log(`Claude said: ${comment}`);
        await ctx.runMutation(internal.snide.updateSnideComment, {
          id: randomComment._id,
          content: comment,
        });
      } else {
        console.log("out of outdated comments");
        break;
      }
    }
    return null;
  },
});

export const randomOutdatedComment = internalQuery({
  args: { now: v.number() },
  handler: async (ctx, args): Promise<Doc<"snideComments"> | null> => {
    return await ctx.db
      .query("snideComments")
      .withIndex("by_created_at", (q) =>
        q.lt("createdAt", args.now - REFRESH_INTERVAL)
      )
      .first();
  },
});

export const updateSnideComment = internalMutation({
  args: {
    id: v.id("snideComments"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      content: args.content,
      createdAt: Date.now(),
    });
  },
});

export async function zeroOutPath(ctx: MutationCtx, path: string) {
  const comment = await ctx.db
    .query("snideComments")
    .withIndex("by_path", (q) => q.eq("path", path))
    .first();

  if (comment) {
    await ctx.db.patch(comment._id, {
      createdAt: 0,
      content: "",
    });
  } else {
    await ctx.db.insert("snideComments", {
      path,
      content: "",
      createdAt: 0,
    });
  }
}

async function generateSnideComment(path: string): Promise<string> {
  const body = await fetch(`https://jt.lol${path}`);
  const text = await body.text();

  const prompt = `
  You are a snide commentator who is making fun of a website and blog author. The site and blog are personal and the author is a human.
  Specifically, the human is a software engineer and a startup founder.
  You are given a piece of text which is HTML from a single page on the website.
  Please respond with a snide comment about this particular page.
  Your snide comment should be three sentences or less.

  HTML:
  ${text}
  `;

  const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_KEY,
  });

  const message = await client.messages.create({
    max_tokens: 8192,
    messages: [{ role: "user", content: prompt }],
    model: "claude-3-5-sonnet-latest",
  });

  return (message.content[0] as Anthropic.TextBlock).text;
}

export const getSnideComment = query({
  args: { path: v.string() },
  handler: async (ctx, args) => {
    console.log(`getting snide comment for ${args.path}`);
    const comment = await ctx.db
      .query("snideComments")
      .withIndex("by_path", (q) => q.eq("path", args.path))
      .first();
    if (!comment) {
      return null;
    }
    return comment.content;
  },
});