"use client";

import { Leaf, Bell, Settings, Upload } from "lucide-react";
import Link from "next/link";


export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Link href="/">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </Link>
            </div>
            <h1 className="text-[26px]  font-bold text-foreground">Last Bite</h1>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/upload"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background hover:bg-accent"
            >
              <Upload className="h-5 w-5" />
            </Link>

            <div className="ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
              <span className="text-sm font-medium">RSJ</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}