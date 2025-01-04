import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "refresh-snide-comments",
  { minutes: 1 },
  internal.snide.refreshSnideComments
);

export default crons;
