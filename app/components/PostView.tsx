import { Link } from "@tanstack/react-router";
import { BlogPost } from "../lib/types";
import { Route as HomeRoute } from "../routes/index";
import { Route as PostRoute } from "../routes/posts/$postId";

interface PostViewProps {
  post: BlogPost;
  isEditing?: boolean;
}

function PostView({ post, isEditing = false }: PostViewProps) {
  return (
    <article className={`
      prose prose-lg mx-auto
      ${isEditing ? 'max-h-screen overflow-y-auto' : ''}
    `}>
      <div className="text-sm text-gray-500 mb-6 block">
        <Link to={HomeRoute.to}>Home</Link> »{" "}
        <Link to={PostRoute.to} params={{ postId: post.slug }}>
          {post.title}
        </Link>
      </div>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <time className="text-sm text-gray-500 mb-6 block">{post.date}</time>
          <div
            className="max-w-none blog-body"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
      </div>
    </article>
  );
}

export default PostView;
