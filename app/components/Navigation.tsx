import { Link } from "@tanstack/react-router";
import { Route as PostRoute } from "../routes/posts/$postId";
import { Route as HomeRoute } from "../routes/index";
import { BlogPostSummary } from "../lib/types";
import { useState } from "react";

interface NavigationProps {
  posts: BlogPostSummary[];
}

const Navigation: React.FC<NavigationProps> = ({ posts }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-white shadow-sm p-4 mb-8 rounded-lg">
      <div className="md:hidden">
        <div className="flex flex-row justify-between items-center">
          <button
            className="text-gray-500 hover:text-gray-600 focus:outline-none block flex"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <>
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </>
              )}
            </svg>
          </button>
          {!isOpen && (
            <div className="w-full text-md text-gray-500 mr-2 ml-2 pt-1 pl-2 text-left">
              All the goods.
            </div>
          )}
        </div>
      </div>
      <div className={`${isOpen ? "block" : "hidden"} md:block`}>
        <h2 className="text-xl font-semibold mb-4">All Posts</h2>
        <ul className="space-y-2">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                to={PostRoute.to}
                params={{ postId: post.slug }}
                className="text-blue-600 hover:underline"
              >
                <span className="text-sm text-gray-500 font-mono mr-2">
                  {post.date}
                </span>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
