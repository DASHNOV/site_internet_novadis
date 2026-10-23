import type { AccentText } from "@/data/pages";

type SplitTitleProps = {
  text: string;
  lead?: number;
};

// Titres en deux tons : les premiers mots en encre, la suite en gris.
export function SplitTitle({ text, lead = 3 }: SplitTitleProps) {
  const words = text.split(" ");
  if (words.length <= lead) return <>{text}</>;
  return (
    <>
      {words.slice(0, lead).join(" ")} <span className="text-second">{words.slice(lead).join(" ")}</span>
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
