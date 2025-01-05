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
    <footer className="text-xs italic bg-white shadow-sm mt-8">
      {comment && (
        <div className="p-4 max-w-2xl mx-auto">
          ✨ Snide{" "}
          <a href="https://claude.ai" className="underline">
            Claude
          </a>{" "}
          says: "{comment}" ✨
        </div>
      )}
    </footer>
  );
};

export default Footer;
