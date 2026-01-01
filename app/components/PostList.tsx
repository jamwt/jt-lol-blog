import { BlogPostSummary } from "../lib/types";
import { Link } from "@tanstack/react-router";
import { Route as PostRoute } from "../routes/posts/$postId";

interface PostListProps {
  posts: BlogPostSummary[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div className="grid gap-8">
      {posts.map((post) => (
        <article
          key={post.slug}
          className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
        >
          <div className="group relative flex flex-col items-start">
            <time className="relative z-10 order-first mb-3 flex items-center text-xs font-semibold uppercase tracking-wider text-gray-400">
              {post.date}
            </time>
            <h3 className="text-2xl font-bold text-gray-900 tracking-tight mb-3 group-hover:text-blue-600 transition-colors">
              <Link 
                to={PostRoute.to} 
                preload="intent" 
                params={{ postId: post.slug }}
              >
                <span className="absolute -inset-y-8 -inset-x-8 z-20" />
                <span className="relative z-10">{post.title}</span>
              </Link>
            </h3>
            <p className="relative z-10 text-base leading-relaxed text-gray-600 line-clamp-3">
              {post.excerpt}
            </p>
            <div className="relative z-10 mt-6 flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-500 transition-colors">
              Read article
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="ml-1 h-4 w-4 stroke-current transition-transform group-hover:translate-x-1">
                <path d="M6.75 5.75 9.25 8l-2.5 2.25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default PostList;
