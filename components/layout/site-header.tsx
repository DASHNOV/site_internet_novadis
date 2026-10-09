"use client";

import Link from "next/link";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mediaLibrary, navItems } from "@/data/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-300",
        scrolled ? "border-hairline bg-white/85 shadow-soft" : "border-transparent bg-background/70",
      )}
    >
      <div className="shell-wide">
        <div className="flex h-16 items-center justify-between gap-6 lg:h-20">
          <Link className="group flex items-center gap-3" href="/">
            <img
              alt="Novadis"
              className="h-6 w-auto object-contain transition group-hover:opacity-80 lg:h-7"
              src={mediaLibrary.logo}
            />
            <div className="hidden border-l border-hairline-strong pl-3 xl:block">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-strong">
                Solutions globales de sûreté
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const active =
                pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`));
              const link = (
                <Link
                  className={cn(
                    "relative flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition",
                    active
                      ? "text-primary-strong"
                      : "text-foreground hover:bg-primary/5 hover:text-foreground-strong",
                  )}
                  href={item.href}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className="h-3 w-3 opacity-60 transition group-hover:rotate-180" />
                  )}
                  {active && <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-brand-gradient" />}
                </Link>
              );
              if (!item.children) return <span key={item.href}>{link}</span>;
              return (
                <div className="group relative" key={item.href}>
                  {link}
                  <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <div className="min-w-[260px] rounded-xl border border-hairline bg-surface p-2 shadow-lift">
                      {item.children.map((child, index) => {
                        const isIndex = child.href === item.href;
                        return (
                          <Link
                            className={cn(
                              "block rounded-lg px-4 py-2.5 text-sm text-foreground transition hover:bg-primary/5 hover:text-primary-strong",
                              isIndex && "mt-2 border-t border-hairline pt-3 font-semibold text-primary-strong",
                            )}
                            href={child.href}
                            key={`${child.href}-${index}`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link className="hidden sm:block" href="/contact">
              <Button size="default" variant="primary">
                Prendre contact
                <ArrowUpRight className="cta-arrow h-4 w-4" />
              </Button>
            </Link>
            <button
              aria-label="Menu"
              aria-expanded={open}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-surface text-foreground-strong shadow-soft lg:hidden"
              onClick={() => setOpen((value) => !value)}
              type="button"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-hairline py-4 lg:hidden">
            <div className="grid gap-1">
              {navItems.map((item) => {
                const active =
                  pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`));
                return (
                  <div key={item.href}>
                    <Link
                      className={cn(
                        "flex items-center justify-between rounded-xl border border-hairline bg-surface px-4 py-3 text-sm font-medium text-foreground-strong",
                        active && "border-primary/35 text-primary-strong",
                      )}
                      href={item.href}
                    >
                      {item.label}
                      <ArrowUpRight className="h-4 w-4 text-muted" />
                    </Link>
                    {item.children && (
                      <div className="mt-1 grid gap-0.5 pl-4">
                        {item.children
                          .filter((child) => child.href !== item.href)
                          .map((child, index) => (
                            <Link
                              className="rounded-lg px-4 py-2 text-sm text-muted-strong hover:text-primary-strong"
                              href={child.href}
                              key={`${child.href}-${index}`}
                              onClick={() => setOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <Link className="mt-2" href="/contact">
                <Button className="w-full" size="lg" variant="primary">
                  Prendre contact
                  <ArrowUpRight className="cta-arrow h-4 w-4" />
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
