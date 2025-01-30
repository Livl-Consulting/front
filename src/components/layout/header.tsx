'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "../theme-toggle";

const NavLinks = () => {
    const pathname = usePathname();
    const links = [
      { href: '/products', label: 'Products' },
      { href: '/suppliers', label: 'Fournisseurs' },
      { href: '/clients', label: 'Clients' },
    ];
  
    return (
    //   <nav className="ml-10 hidden items-center gap-4 text-sm sm:flex xl:gap-6"> if you want to hide the navlinks on small screens
    <nav className="ml-10 items-center  text-sm flex gap-6">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={cn(
              'transition-colors hover:text-foreground/80',
              pathname === link.href ? 'text-foreground' : 'text-foreground/80',
              pathname === link.href ? 'font-semibold' : 'font-normal'
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    );
  };

export default function Header() {
  
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 shadow backdrop-blur dark:border-border">
        <div className="mx-auto flex h-16 max-w-screen-lg items-center justify-between px-4">
          <div className="flex items-center gap-2 lg:mr-6">
            <Link
              href="/"
              className="rounded-lg bg-transparent px-2 py-1 shadow-none hover:bg-slate-400/10"
            >
                <img src="https://user-images.githubusercontent.com/62793491/208452652-71416c5c-8261-4501-a002-afc9e2cf0a0b.png" alt="logo" className="h-8"/>
            </Link>
            <NavLinks />
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>
    );
  }