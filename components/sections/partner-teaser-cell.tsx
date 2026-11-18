"use client";

import { useEffect, useState } from "react";

type PartnerTeaserCellProps = {
  revealAt: string;
  className?: string;
  pendingText: string;
  countdownPrefix: string;
  units: { days: string; hours: string; minutes: string };
  children: React.ReactNode;
};

const MINUTE = 60_000;

export function PartnerTeaserCell({
  revealAt,
  className,
  pendingText,
  countdownPrefix,
  units,
  children,
}: PartnerTeaserCellProps) {
  const target = Date.parse(revealAt);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    if (Number.isNaN(target)) return;
    const tick = () => setNow(Date.now());
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, MINUTE / 2);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, [target]);

  if (now !== null && now >= target) return null;

  let caption = pendingText;
  if (!Number.isNaN(target)) {
    const remaining = now === null ? null : Math.max(0, target - now);
    const days = remaining === null ? "--" : Math.floor(remaining / 86_400_000);
    const hours = remaining === null ? "--" : Math.floor((remaining % 86_400_000) / 3_600_000);
    const minutes = remaining === null ? "--" : Math.floor((remaining % 3_600_000) / MINUTE);
    caption = `${countdownPrefix} ${days} ${units.days} ${hours} ${units.hours} ${minutes} ${units.minutes}`;
  }

  return (
    <li className={className}>
      {children}
      <p
        aria-live="off"
        className="tabular mt-1 text-center text-xs leading-5 text-muted-strong"
        role={Number.isNaN(target) ? undefined : "timer"}
      >
        {caption}
      </p>
    </li>
  );
}
