// app/routes/index.tsx
import { convexQuery } from "@convex-dev/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "~/convex/_generated/api";
import PostList from "../components/PostList";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { data: posts } = useSuspenseQuery(
    convexQuery(api.posts.listSummaries, {})
  );
  return (
    <div>
      <PostList posts={posts} />
    </div>
  );
}
