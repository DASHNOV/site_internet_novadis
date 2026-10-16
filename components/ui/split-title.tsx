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
