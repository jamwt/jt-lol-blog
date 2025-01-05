import { BlogPostSummary } from "../lib/types";
import { Link } from "@tanstack/react-router";
import { Route as PostRoute } from "../routes/posts/$postId";

interface PostListProps {
  posts: BlogPostSummary[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Latest Posts</h2>
      {posts.map((post) => (
        <article
          key={post.slug}
          className="bg-white shadow rounded-lg overflow-hidden"
        >
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              <Link to={PostRoute.to} preload="intent" params={{ postId: post.slug }} className="hover:underline">
                {post.title}
              </Link>
            </h3>
            <time className="text-sm text-gray-500 mb-3 block">
              {post.date}
            </time>
            <p className="text-gray-700">{post.excerpt}</p>
          </div>
        </article>
      ))}
    </div>
  );
};

export default PostList;
