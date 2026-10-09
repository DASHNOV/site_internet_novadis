type SplitTitleProps = {
  text: string;
  lead?: number;
};

// Signature des titres : les premiers mots en gris foncé, la suite en dégradé.
export function SplitTitle({ text, lead = 3 }: SplitTitleProps) {
  const words = text.split(" ");
  if (words.length <= lead) return <>{text}</>;
  return (
    <>
      {words.slice(0, lead).join(" ")} <span className="text-gradient">{words.slice(lead).join(" ")}</span>
    </>
  );
}
