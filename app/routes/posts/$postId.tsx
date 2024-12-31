import { convexQuery } from "@convex-dev/react-query";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import PostView from "~/app/components/PostView";
import { api } from "~/convex/_generated/api";
import { Route as EditRoute } from "~/app/routes/edit/$postId";

export const Route = createFileRoute("/posts/$postId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { postId: slug } = Route.useParams();
  const { data: post } = useSuspenseQuery(
    convexQuery(api.posts.getBySlug, { slug })
  );

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <PostView post={post} />
      <MaybeEditButton slug={slug} />
    </div>
  );
}

function MaybeEditButton({ slug }: { slug: string }) {
  const [secret, setSecret] = useState(null as string | null);
  const { data: isAdmin } = useQuery(convexQuery(api.admin.isAdmin, { secret }));
  useEffect(() => {
    const storedSecret = localStorage.getItem("adminSecret");
    if (storedSecret) {
      setSecret(storedSecret);
    }
  }, [setSecret]);
  if (isAdmin) {
    return (
      <Link
        to={EditRoute.to}
        params={{ postId: slug }}
        className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200"
      >
        Hi Admin! Edit this post?
      </Link>
    );
  }
  return <></>;
}
