// Icônes lucide proposées dans le CMS. Les composants correspondants sont associés côté site.
export const iconNames = [
  "Award",
  "Blocks",
  "Building2",
  "Cpu",
  "Factory",
  "FingerprintPattern",
  "Gauge",
  "KeyRound",
  "Mail",
  "MapPin",
  "MonitorPlay",
  "Network",
  "Phone",
  "Radar",
  "RefreshCw",
  "ScanSearch",
  "ShieldAlert",
  "ShieldCheck",
  "Sparkles",
  "Truck",
  "Users",
  "Video",
  "Workflow",
] as const;

export type IconName = (typeof iconNames)[number];
