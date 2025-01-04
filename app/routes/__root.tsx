import { QueryClient, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";
import { Outlet, ScrollRestoration } from "@tanstack/react-router";
import { Meta, Scripts } from "@tanstack/start";
import * as React from "react";
import appCss from "~/app/main.css?url";
import Layout from "../components/Layout";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "~/convex/_generated/api";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "jt.lol",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/tokyo-night-dark.min.css",
      },
    ],
    scripts: [
      {
        src: "https://plausible.io/js/script.js",
        defer: true,
        dataDomain: "jt.lol",
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const { data: posts } = useSuspenseQuery(convexQuery(api.posts.listSummaries, {}));

  const wrappedContent = <Layout posts={posts}>{children}</Layout>;
  return (
    <html>
      <head>
        <Meta />
      </head>
      <body>
        {wrappedContent}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
