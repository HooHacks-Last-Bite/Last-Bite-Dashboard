"use client";

import { Leaf, Bell, Settings, Upload } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-border bg-card px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Link href="/">
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </Link>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Last Bite</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">

          <Link
            href="/upload"
            aria-label="Upload pictures"
            title="Upload pictures"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Upload className="h-5 w-5" />
          </Link>

          <div className="ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
            <span className="text-sm font-medium">RSJ</span>
          </div>
        </div>
      </div>
    </header>
  );
}
