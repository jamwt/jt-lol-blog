import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Navigation from "./Navigation";
import { BlogPostSummary } from "../lib/types";
import { useLocation, useRouter } from "@tanstack/react-router";

interface LayoutProps {
  children: React.ReactNode;
  posts: BlogPostSummary[];
}

const Layout: React.FC<LayoutProps> = ({ children, posts }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const isEditing = pathname.includes("/edit/");

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div
        className={
          isEditing
            ? "max-w-7xl mx-auto py-6 px-4"
            : "max-w-4xl mx-auto py-6 px-4"
        }
      >
        <div className="flex flex-col md:flex-row gap-8">
          {!isEditing && (
            <aside className="md:min-w-1/4">
              <Navigation posts={posts} />
            </aside>
          )}
          <main className={isEditing ? "w-full" : "md:w-3/4"}>{children}</main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
