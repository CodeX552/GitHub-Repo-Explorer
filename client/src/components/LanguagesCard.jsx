const LANGUAGE_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  PHP: "#4F5D95",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Shell: "#89e051",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Vue: "#41b883",
  SCSS: "#c6538c",
  Lua: "#000080",
  EJS: "#a91e50",
};

const getLanguageColor = (lang) => {
  return LANGUAGE_COLORS[lang] || "#8b8b8b";
};

const LanguagesCard = ({ repos }) => {
  const langCounts = {};
  repos.forEach((repo) => {
    if (repo.language) {
      langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
    }
  });

  const totalReposWithLang = Object.values(langCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  const sortedLangs = Object.entries(langCounts)
    .sort((a, b) => b[1] - a[1]);

  if (sortedLangs.length === 0) return null;

  return (
    <div className="bg-bg-primary rounded-2xl border border-border p-5" id="languages-card">
      <div className="text-[13px] font-semibold text-text-secondary uppercase tracking-wide mb-3.5">Languages</div>

      <div className="flex h-2.5 rounded-[5px] overflow-hidden mb-4 gap-0.5">
        {sortedLangs.map(([lang, count]) => (
          <div
            key={lang}
            className="rounded-[5px] min-w-1 transition-all duration-300"
            style={{
              flex: count / totalReposWithLang,
              backgroundColor: getLanguageColor(lang),
            }}
            title={`${lang}: ${count}`}
          />
        ))}
      </div>

      <ul className="list-none p-0 m-0">
        {sortedLangs.map(([lang, count]) => (
          <li key={lang} className="flex items-center gap-2 py-1.5 text-[13px] text-text-secondary">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: getLanguageColor(lang) }}
            />
            <span className="flex-1">{lang}</span>
            <span className="text-xs text-text-muted bg-bg-secondary px-2 py-px rounded-full">{count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { getLanguageColor };
export default LanguagesCard;
