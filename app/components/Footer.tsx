import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useLocation, useRouter } from "@tanstack/react-router";
import { api } from "~/convex/_generated/api";

const Footer = () => {
  const location = useLocation();
  const path = location.pathname;
  const { data: comment } = useSuspenseQuery(
    convexQuery(api.snide.getSnideComment, { path })
  );
  return (
    <footer className="text-xs italic bg-white shadow-sm mt-8">
      {comment && (
        <div className="p-4 max-w-2xl mx-auto">✨ says: "{comment}"</div>
      )}
    </footer>
  );
};

export default Footer;
