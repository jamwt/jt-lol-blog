import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import ReactDiffViewer from "react-diff-viewer-continued";
import { api } from "~/convex/_generated/api";
import { Id } from "~/convex/_generated/dataModel";
import { useAdminSecret } from "../lib/adminUtils";

export default function DiffView({ slugId }: { slugId: string }) {
  const secret = useAdminSecret();
  const { data: versions } = useQuery(
    convexQuery(api.admin.getPostVersions, { slug: slugId, secret })
  );

  if (!versions) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <ReactDiffViewer
      oldValue={versions.published}
      newValue={versions.draft}
      splitView={true}
    />
  );
}
