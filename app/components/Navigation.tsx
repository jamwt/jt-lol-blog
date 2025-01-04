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
            className="text-gray-500 hover:text-gray-600 focus:outline-none flex"
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
        <div className="flex flex-row justify-between items-center py-4">
          <img
            src="/jamie.jpg"
            alt="Avatar"
            className="w-12 h-12 rounded-full"
          />
          <Socials />
        </div>
        <p className="text-xs text-gray-500 mb-4">
          Co-founder/CEO of{" "}
          <a
            href="https://convex.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Convex
          </a>
          . Likes making computers easier and more fun for humans. Lead bassist
          of a band you don't know.{" "}
        </p>
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

function Socials() {
  return (
    <div className="max-w-4xl mx-auto py-4 px-4 text-center text-gray-600">
      <div className="flex justify-center space-x-2">
        <a
          href="https://bsky.app/profile/jt.lol"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500"
        >
          <span className="sr-only">Bluesky</span>
          <img src="/bsky.png" className="h-6 w-6" alt="Bluesky logo" />
        </a>
        <a
          href="https://x.com/jamwt"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400"
        >
          <span className="sr-only">X (Twitter)</span>
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
        <a
          href="https://linkedin.com/in/jamwt"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600"
        >
          <span className="sr-only">LinkedIn</span>
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default Navigation;
