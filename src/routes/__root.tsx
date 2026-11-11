import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import faviconUrl from "../assets/favicon.svg?url";
import { Preloader } from "../components/common/Preloader";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0F0F0F] px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-[#D9D9D9]">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-[#D9D9D9]">Page not found</h2>
        <p className="mt-2 text-sm text-[#AFAFAE]">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-[#D9D9D9] px-6 py-2.5 text-xs tracking-[0.2em] uppercase text-[#0F0F0F] font-medium transition-all hover:brightness-110"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0F0F0F] px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-[#D9D9D9]">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-[#AFAFAE]">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-[#D9D9D9] px-6 py-2.5 text-xs tracking-[0.2em] uppercase text-[#0F0F0F] font-medium transition-all hover:brightness-110"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-[#6B6A69]/25 bg-[#3F3F3D] px-6 py-2.5 text-xs tracking-[0.2em] uppercase text-[#D9D9D9] transition-all hover:border-[#6B6A69]"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Sunny Concepts — Leading the World Through Digital Services" },
      {
        name: "description",
        content:
          "Sunny Concepts is a premium digital agency for brand identity, media production, digital marketing, and printing & logistics.",
      },
      { name: "author", content: "Sunny Concepts" },
      { property: "og:title", content: "Sunny Concepts — Premium Digital Agency" },
      {
        property: "og:description",
        content: "Cinematic, editorial digital experiences with global standards.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@SunnyConcepts" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/svg+xml", href: faviconUrl },
      { rel: "shortcut icon", href: "/favicon.svg" },
      { rel: "apple-touch-icon", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-[#0F0F0F] text-[#AFAFAE] min-h-screen antialiased">
        {children}
        <Toaster position="top-right" theme="dark" />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Preloader />
      <Outlet />
    </QueryClientProvider>
  );
}
