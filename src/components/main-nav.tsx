"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <div className="h-6 w-6">
          <svg
            viewBox="0 0 250 250"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.07422 125.006C7.07422 59.8938 59.9075 7.09375 125 7.09375C190.092 7.09375 242.926 59.8938 242.926 125.006C242.926 190.125 190.092 242.905 125 242.905C96.1514 242.905 69.768 232.558 49.2476 215.376C68.5021 183.536 124.733 88.9288 124.733 88.9288L152.582 135.559C152.582 135.559 137.925 135.633 124.667 135.559C111.342 135.486 107.544 138.351 101.748 147.192C96.9509 154.534 85.6247 173.715 85.3582 174.068C84.0257 176.181 84.8252 178.226 87.9565 178.226H178.233H224.071C226.802 178.226 228.401 176.314 226.669 173.935L127.065 11.0846C125.733 8.83933 123.601 9.03918 122.402 11.0846L20.9321 180.471C12.1377 163.942 7.07422 145.06 7.07422 125.006Z"
              fill="#EC1C23"
            />
          </svg>
        </div>
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
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
