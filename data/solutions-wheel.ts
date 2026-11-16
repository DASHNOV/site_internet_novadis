import {
  BellRing,
  Car,
  Cctv,
  Cpu,
  Database,
  Eye,
  Fence,
  Fingerprint,
  GraduationCap,
  IdCard,
  KeyRound,
  Layers,
  MonitorDot,
  Network,
  PenTool,
  ScanEye,
  Settings,
  UserCheck,
  Wifi,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type WheelDiscipline = { label: string; icon: LucideIcon; slug: string };
export type WheelStage = { lines: string[]; icon: LucideIcon; angle: number };

export const wheelCore = ["Créateur", "de solutions", "globales de sûreté"];

export const wheelCta = "Voir la solution";

// Clockwise from the top, in the same order as the original Novadis diagram.
export const wheelDisciplines: WheelDiscipline[] = [
  { label: "Supervision", icon: MonitorDot, slug: "supervision" },
  { label: "Vidéosurveillance", icon: Cctv, slug: "video-surveillance" },
  { label: "Contrôle d'accès", icon: IdCard, slug: "access-control" },
  { label: "Alarme intrusion", icon: BellRing, slug: "intrusion-detection" },
  { label: "Informatique", icon: Cpu, slug: "it-infrastructure" },
  { label: "Stockage", icon: Database, slug: "it-infrastructure" },
  { label: "Réseau", icon: Network, slug: "it-infrastructure" },
  { label: "Virtualisation", icon: Layers, slug: "it-infrastructure" },
  { label: "Analyse d'images", icon: ScanEye, slug: "ai-video-analytics" },
  { label: "Gestion visiteurs", icon: UserCheck, slug: "access-control" },
  { label: "Armoire à clés", icon: KeyRound, slug: "smart-integrations" },
  { label: "Protection périmétrique", icon: Fence, slug: "intrusion-detection" },
  { label: "Lecture de plaques", icon: Car, slug: "ai-video-analytics" },
  { label: "Sans fil", icon: Wifi, slug: "it-infrastructure" },
  { label: "Biométrie", icon: Fingerprint, slug: "access-control" },
];

// Angles in degrees, clockwise from the top.
export const wheelStages: WheelStage[] = [
  { lines: ["Conception", "& intégration"], icon: PenTool, angle: 45 },
  { lines: ["Études", "& ingénierie"], icon: Settings, angle: 105 },
  { lines: ["Mise en service", "& gestion de projets"], icon: Eye, angle: 180 },
  { lines: ["Formation"], icon: GraduationCap, angle: 255 },
  { lines: ["Maintenance", "applicative & logicielle"], icon: Wrench, angle: 315 },
];
