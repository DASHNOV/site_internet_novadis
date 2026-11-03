import type { AccentText } from "@/data/pages";
import { cleanText, hasTarget } from "@/lib/content/stega";

type SplitTitleProps = {
  text: string;
  lead?: number;
};

// Titres en deux tons : les premiers mots en encre, la suite en gris.
export function SplitTitle({ text, lead = 3 }: SplitTitleProps) {
  const clean = cleanText(text);
  const words = clean.split(" ");
  if (words.length <= lead) return <>{text}</>;
  if (!hasTarget(text)) {
    return (
      <>
        {words.slice(0, lead).join(" ")} <span className="text-second">{words.slice(lead).join(" ")}</span>
      </>
    );
  }
  // Mode édition : la signature reste en fin de titre, et le début est repéré pour que l'éditeur
  // reprenne le titre entier, pas seulement sa partie grise.
  return (
    <>
      <span data-cms-lead={lead}>{words.slice(0, lead).join(" ")}</span>{" "}
      <span className="text-second">{words.slice(lead).join(" ") + text.slice(clean.length)}</span>
    </>
  );
}

// Titres en deux tons dont la coupure est choisie dans les données.
export function AccentTitle({ title }: { title: AccentText }) {
  if (!title.accent) return <>{title.lead}</>;
  return (
    <>
      {title.lead} <span className="text-second">{title.accent}</span>
    </>
  );
}
