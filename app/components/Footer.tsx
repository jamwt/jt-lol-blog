import { convexQuery } from "@convex-dev/react-query";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useLocation, useRouter } from "@tanstack/react-router";
import { api } from "~/convex/_generated/api";

const Footer = () => {
  const location = useLocation();
  const path = location.pathname;
  const { data: comment } = useQuery(
    convexQuery(api.snide.getSnideComment, { path })
  );
  return (
    <footer className="bg-white border-t border-gray-200 mt-12 py-8 transition-opacity duration-500">
      {comment && (
        <div className="px-4 max-w-4xl mx-auto text-center italic text-sm text-gray-600">
          <span className="text-gray-400">✨ Snide </span>
          <a href="https://claude.ai" className="hover:text-blue-600 transition-colors">
            Claude
          </a>
          <span className="text-gray-400"> says:</span> "{comment}" ✨
        </div>
      )}
    </footer>
  );
};

export default Footer;
