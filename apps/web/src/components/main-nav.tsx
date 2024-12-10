"use client";

import * as React from "react";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import LogoImage from "../assets/logo.webp";
import { Badge } from "./ui/badge";

export function MainNav() {
  return (
    <div className="mr-4 flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        {/* <Image src={LogoImage} alt="jobcenter-leipzig-logo" width={60} /> */}
        <span className="font-bold">{siteConfig.name}</span>
        {typeof window !== "undefined" &&
          ["localhost", "buergergeld.dev"].includes(
            window.location.hostname
          ) && <Badge>Preview</Badge>}
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
