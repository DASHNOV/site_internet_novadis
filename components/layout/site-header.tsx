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
  const overDarkHero = true;

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
        "sticky top-0 z-50 border-b border-white/10 bg-[rgb(11_18_32)]/95 backdrop-blur-xl transition-all duration-300",
      )}
    >
      <div className="shell-wide">
        <div className="flex h-16 items-center justify-between gap-6 lg:h-20">
          <Link className="group flex items-center gap-3" href="/">
            <img
              alt="Novadis"
              className="h-8 w-auto object-contain brightness-0 invert transition group-hover:opacity-90 lg:h-9"
              src={mediaLibrary.logoDark}
            />
            <div
              className={cn(
                "hidden border-l pl-3 xl:block",
                overDarkHero ? "border-white/20" : "border-[rgba(var(--hairline-strong))]",
              )}
            >
              <p
                className={cn(
                  "font-mono text-[10px] uppercase tracking-[0.28em]",
                  overDarkHero ? "text-white/70" : "text-muted",
                )}
              >
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
                    "relative flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition",
                    active ? "text-white" : "text-white/75 hover:text-white",
                  )}
                  href={item.href}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className="h-3 w-3 opacity-60 transition group-hover:rotate-180" />
                  )}
                  {active && <span className="absolute inset-x-4 -bottom-0.5 h-px bg-white" />}
                </Link>
              );
              if (!item.children) return <span key={item.href}>{link}</span>;
              return (
                <div className="group relative" key={item.href}>
                  {link}
                  <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <div className="min-w-[260px] rounded-2xl border border-white/10 bg-[rgb(11_18_32)]/98 p-2 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)] backdrop-blur-xl">
                      {item.children.map((child, index) => {
                        const isIndex = child.href === item.href;
                        return (
                          <Link
                            className={cn(
                              "block rounded-xl px-4 py-2.5 text-sm text-white/75 transition hover:bg-white/5 hover:text-white",
                              isIndex &&
                                "mt-2 border-t border-white/10 pt-3 font-medium text-[rgb(var(--primary))] hover:text-[rgb(var(--accent))]",
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(var(--hairline-strong))] bg-[rgba(var(--card))] text-foreground lg:hidden"
              onClick={() => setOpen((value) => !value)}
              type="button"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-[rgba(var(--hairline))] py-4 lg:hidden">
            <div className="grid gap-1">
              {navItems.map((item) => {
                const active =
                  pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`));
                return (
                  <div key={item.href}>
                    <Link
                      className={cn(
                        "flex items-center justify-between rounded-2xl border border-[rgba(var(--hairline))] bg-[rgba(var(--card))] px-4 py-3 text-sm",
                        active && "border-primary/35 text-foreground",
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
                              className="rounded-xl px-4 py-2 text-sm text-white/70"
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
