const SCORE_CARD_THEMES = Object.freeze({
  blue: {
    border: "border-blue-300",
    bg: "bg-blue-200",
    title: "text-blue-800",
    desc: "text-blue-600",
  },
  red: {
    border: "border-red-300",
    bg: "bg-red-200",
    title: "text-red-800",
    desc: "text-red-600",
  },
  yellow: {
    border: "border-yellow-300",
    bg: "bg-yellow-200",
    title: "text-yellow-800",
    desc: "text-yellow-600",
  },
  green: {
    border: "border-green-300",
    bg: "bg-green-200",
    title: "text-green-800",
    desc: "text-green-600",
  },
});

export default function ScoreCard({
  title,
  desc,
  theme,
}: {
  title: string;
  desc: string;
  theme: keyof typeof SCORE_CARD_THEMES;
}) {
  const scTheme = SCORE_CARD_THEMES[theme] ?? SCORE_CARD_THEMES.blue;

  return (
    <div
      className={`border-1 py-4 text-center min-w-40 gap-2 flex flex-col ${scTheme.border} ${scTheme.bg}`}
    >
      <h3 className={`text-3xl font-semibold ${scTheme.title}`}>{title}</h3>
      <p className={`text-md ${scTheme.desc}`}>{desc}</p>
    </div>
  );
}
