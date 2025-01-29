import Image from "next/image";
import Link from "next/link";

export const Footer = () => (
  <footer className="w-full border-t border-border/40 py-6 dark:border-border">
    <div className="mx-auto max-w-screen-lg px-4">
      <div className="flex flex-col space-y-4 text-center sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
          <Image
            src="/github-mark.svg"
            alt="logo"
            width="25"
            height="25"
            className="mx-auto sm:mx-0"
          />
          <Link href="https://github.com/Livl-Consulting">
            <p className="text-sm text-muted-foreground transition hover:opacity-100">
              Copyright © Livl Consulting  - 2025
            </p>
          </Link>
        </div>
        <div>
          <p className="text-sm">Je me ERP le Odoo</p>
        </div>
      </div>
    </div>
  </footer>
);
