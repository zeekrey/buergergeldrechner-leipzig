"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

import { siteConfig } from "@/config/site";

import { Badge } from "./ui/badge";

const subscribe = () => () => {};
const getIsPreview = () => window.location.hostname === "localhost";
const getServerIsPreview = () => false;

export function MainNav() {
  const isPreview = useSyncExternalStore(
    subscribe,
    getIsPreview,
    getServerIsPreview,
  );

  return (
    <div className="flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <span className="font-bold">{siteConfig.name}</span>
        {isPreview && <Badge>Preview</Badge>}
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        {/* <Link
          href="/docs/components"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/docs/components")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Components
        </Link> */}
      </nav>
    </div>
  );
}
