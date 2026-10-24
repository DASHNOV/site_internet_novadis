/* eslint-disable @next/next/no-img-element */

export function AdminLogo() {
  return (
    <div style={{ alignItems: "center", display: "flex", flexDirection: "column", gap: 12 }}>
      <img alt="Novadis" src="/novadis/logos/logo-light-wide.svg" style={{ height: 48, width: "auto" }} />
      <span style={{ color: "var(--theme-elevation-600)", fontSize: 15, letterSpacing: "0.04em" }}>Novadis — Contenus</span>
    </div>
  );
}

export function AdminIcon() {
  return <img alt="Novadis" src="/icon.svg" style={{ height: 24, width: 24 }} />;
}
