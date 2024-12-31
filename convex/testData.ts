import { internalMutation } from "./_generated/server";

export const insertTestPosts = internalMutation({
  args: {},
  handler: async (ctx) => {
    const posts = [
      {
        title: "Getting Started with React and Convex",
        slug: "getting-started-with-react-and-convex",
        date: "2024-03-15",
        excerpt:
          "Learn how to build modern web applications using React and Convex for real-time data synchronization.",
        content:
          "This is a sample blog post about React and Convex integration...",
        published: true
      },
      {
        title: "Building a Blog with TanStack Router",
        slug: "building-blog-with-tanstack-router",
        date: "2024-03-14",
        excerpt:
          "Discover how to create a performant blog using TanStack Router and modern React patterns.",
        content: "Here's how you can build a blog using TanStack Router...",
        published: true
      },
      {
        title: "Styling with Tailwind CSS",
        slug: "styling-with-tailwind",
        date: "2024-03-13",
        excerpt:
          "A comprehensive guide to styling your React applications using Tailwind CSS.",
        content: "Tailwind CSS provides a utility-first approach to styling...",
        published: false
      },
    ];

    for (const post of posts) {
      await ctx.db.insert("posts", post);
    }
  },
});
