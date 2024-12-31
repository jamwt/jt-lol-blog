import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import MarkdownEditor from "~/app/components/MarkdownEditor";
import { api } from "~/convex/_generated/api";
import { useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import PostView from "~/app/components/PostView";
import "highlight.js/styles/tokyo-night-dark.min.css";
import DiffView from "~/app/components/DiffView";
import { AdminSecretProvider, useAdminSecret } from "~/app/lib/adminUtils";

export const Route = createFileRoute("/edit/$postId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { postId } = Route.useParams();
  const [secretString, setSecretString] = useState(null as string | null);

  useEffect(() => {
    const storedSecret = localStorage.getItem("adminSecret");
    if (storedSecret) {
      setSecretString(storedSecret);
    }
  }, [setSecretString]);

  if (!secretString) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <AdminSecretProvider value={secretString}>
      <EditView postId={postId} />
    </AdminSecretProvider>
  );
}

function EditView({ postId }: { postId: string }) {
  const secret = useAdminSecret();
  const { data: post } = useSuspenseQuery(
    convexQuery(api.admin.getRawPost, { slug: postId, secret })
  );
  const { data: renderedPost } = useSuspenseQuery(
    convexQuery(api.posts.getBySlug, { slug: postId, draft: true })
  );

  const { mutate: mutatePost } = useMutation({
    mutationFn: useConvexMutation(api.admin.editPostDraft),
  });

  const { mutate: publishDraft } = useMutation({
    mutationFn: useConvexMutation(api.admin.publishDraft),
  });

  const debouncedMutation = useCallback(
    debounce((newContent: string) => {
      if (!post) return;

      mutatePost({
        slug: post.slug,
        md: newContent,
        secret,
      });
    }, 1000),
    [mutatePost, post]
  );

  const [showDiff, setShowDiff] = useState(false);

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <MarkdownEditor
          initialValue={post?.draft ?? post?.content ?? ""}
          onChange={debouncedMutation}
          className="min-h-[calc(100vh-100px)] border rounded-md"
        />
        <div className="max-w-none p-4 border rounded-md overflow-y-auto">
          {renderedPost?.draft && (
            <div className="mb-4 inline-block px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">
              Unpublished draft.
              <div className="ml-2 inline-block">
                <button
                  className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full hover:bg-green-200 mr-2"
                  onClick={() => {
                    publishDraft({ slug: postId, secret });
                  }}
                >
                  Publish
                </button>
                <button
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200"
                  onClick={() => setShowDiff(true)}
                >
                  View Changes
                </button>
              </div>
            </div>
          )}
          {renderedPost && <PostView post={renderedPost} />}
        </div>
      </div>

      {showDiff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Changes</h2>
              <button
                onClick={() => {
                  publishDraft({ slug: postId, secret });
                  setShowDiff(false);
                }}
                className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full hover:bg-green-200"
              >
                Publish and close
              </button>
              <button
                onClick={() => setShowDiff(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <DiffView slugId={postId} />
          </div>
        </div>
      )}
    </>
  );
}
